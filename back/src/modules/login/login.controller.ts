import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import ManageResponse from "../../infraestrucure/response/api";

const prisma = new PrismaClient();

const ACCESS_SECRET = process.env.ACCESS_SECRET || "access_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_key";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { ci, password } = req.body;
  try {
    const userForValidation = await prisma.user.findUnique({
      where: { ci },
      select: {
        id: true,
        ci: true,
        password: true,
        estado_user: true,
      },
    });

    if (!userForValidation) {
      ManageResponse.unauthorized(res, "Credenciales incorrectas");
      return;
    }

    if (userForValidation.estado_user === "DESHABILITADO") {
      ManageResponse.unauthorized(
        res,
        "Usuario deshabilitado. Contacte al administrador"
      );
      return;
    }

    if (userForValidation.password !== password) {
      ManageResponse.unauthorized(res, "Credenciales incorrectas");
      return;
    }

    const accessToken = jwt.sign(
      { userId: userForValidation.id, ci: userForValidation.ci },
      ACCESS_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { userId: userForValidation.id },
      REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await prisma.user.update({
      where: { id: userForValidation.id },
      data: { refresh_token: refreshToken },
    });

    const userForResponse = await prisma.user.findUnique({
      where: { id: userForValidation.id },
      select: {
        name: true,
        rol: true,
      },
    });

    ManageResponse.success(res, "Inicio de sesión correcto", {
      accessToken,
      refreshToken,
      user: userForResponse,
    });
    return;
  } catch (error) {
    ManageResponse.serverError(res, "Error en el servidor", error);
    return;
  }
};
export const dataToken = (req: Request, res: Response) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1] as string;
    if (!token) {
      ManageResponse.unauthorized(res, "Error , token no proporcionado ");
    }

    const decodedToken = jwt.verify(token, ACCESS_SECRET);
    ManageResponse.success(res, "Token", decodedToken);
  } catch (error) {
    ManageResponse.serverError(res, "Error de servidor");
  }
};
