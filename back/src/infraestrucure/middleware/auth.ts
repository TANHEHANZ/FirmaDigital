import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ManageResponse from "../response/api";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  exp?: number;
}
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ACCESS_SECRET = process.env.ACCESS_SECRET || "access_key";
  const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_key";
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.headers["x-refresh-token"] as string;

    if (!token) {
      ManageResponse.unauthorized(res, "Token no proporcionado");
      return;
    }

    try {
      const decoded = jwt.verify(token, ACCESS_SECRET) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError && refreshToken) {
        try {
          const decoded = jwt.verify(
            refreshToken,
            REFRESH_SECRET
          ) as JwtPayload;

          const user = await prisma.user.findUnique({
            where: { id: decoded.userId, refresh_token: refreshToken },
          });
          if (!user) {
            ManageResponse.unauthorized(res, "Refresh token inválido");
            return;
          }

          const newAccessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, {
            expiresIn: "1h",
          });

          res.setHeader("x-new-access-token", newAccessToken);

          req.user = { userId: user.id };
          next();
        } catch (refreshError) {
          ManageResponse.unauthorized(
            res,
            "Sesión expirada, debe iniciar sesión nuevamente"
          );
          return;
        }
      } else {
        ManageResponse.unauthorized(res, "Token inválido");
        return;
      }
    }
  } catch (error) {
    console.log(error);
    ManageResponse.unauthorized(res, "Error en la autenticación");
    return;
  }
};
