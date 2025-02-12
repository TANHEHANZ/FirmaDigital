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
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser || existingUser.password !== password) {
      ManageResponse.unauthorized(res, "Credenciales incorrectas");
      return;
    }

    const accessToken = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
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
