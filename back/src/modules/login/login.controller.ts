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
    const existingUser = await prisma.user.findUnique({
      where: {
        ci,
      },
    });

    if (!existingUser) {
      ManageResponse.unauthorized(res, "Credenciales incorrectas");
      return;
    }

    if (existingUser.estado_user === "DESHABILITADO") {
      ManageResponse.unauthorized(
        res,
        "Usuario deshabilitado. Contacte al administrador"
      );
      return;
    }

    if (existingUser.password !== password) {
      ManageResponse.unauthorized(res, "Credenciales incorrectas");
      return;
    }
    const accessToken = jwt.sign(
      { userId: existingUser.id, ci: existingUser.ci },
      ACCESS_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign({ userId: existingUser.id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { refresh_token: refreshToken },
    });
    ManageResponse.success(res, "Inicio de sesión correcto", {
      accessToken,
      refreshToken,
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
