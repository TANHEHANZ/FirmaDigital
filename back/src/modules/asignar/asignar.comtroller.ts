import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ManageResponse from "../../infraestrucure/response/api";
const prisma = new PrismaClient();

export const asignarToken = async (req: Request, res: Response) => {
  try {
    const asignar = await prisma.asignacionToken.create({
      data: {
        id_token: req.body.id_token,
        id_user_asignado: req.body.id_usuario,
        estado: req.body.estado,
      },
    });
    ManageResponse.success(res, "Datos correctamente eliminados", asignar);
  } catch (error) {
    ManageResponse.serverError(res, "Error del server", error);
  }
};
