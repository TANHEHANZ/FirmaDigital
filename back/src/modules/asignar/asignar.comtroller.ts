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
export const unsubcribe = async (req: Request, res: Response) => {
  const id = req.body.id;

  try {
    const unsubscribe = await prisma.asignacionToken.update({
      where: {
        id: id,
      },
      data: {
        estado: "DESHABILITADO",
      },
    });
    ManageResponse.success(res, "Datos correctamente eliminados", unsubscribe);
  } catch (error) {
    ManageResponse.serverError(res, "Error del server", error);
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const update = await prisma.asignacionToken.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
        estado: "EDITADO",
      },
    });
    ManageResponse.success(res, "Datos correctamente actualizados", update);
  } catch (error) {
    ManageResponse.serverError(res, "Error del server", error);
  }
};
export const deletedAssignment = async (req: Request, res: Response) => {
  try {
    const deleted = await prisma.asignacionToken.update({
      where: {
        id: req.params.id,
      },
      data: {
        estado: "ELIMINADO",
      },
    });
    ManageResponse.success(res, "Datos correctamente eliminados", deleted);
  } catch (error) {
    ManageResponse.serverError(res, "Error del server", error);
  }
};
