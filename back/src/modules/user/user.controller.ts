import { PrismaClient } from "@prisma/client";
import ManageResponse from "../../infraestrucure/response/api";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const userAll = async (req: Request, res: Response) => {
  try {
    const userAll = await prisma.user.findMany({
      where: {
        is_deleted: "FALSE",
      },
    });
    if (!userAll) {
      ManageResponse.notFound(res, "Error al obtener usuarios");
    }
    ManageResponse.success(res, "Usuarios obtenidos exitosamente", userAll);
  } catch (e) {
    ManageResponse.badRequest(res, "Error de servidor", e);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const create = await prisma.user.create({ data: req.body });
    if (create) {
      ManageResponse.success(res, "Usuario creado exitosamente", create);
    } else {
      ManageResponse.notFound(res, "Usuario No creado");
    }
  } catch (e: any) {
    if (e.code === "P2002") {
      ManageResponse.customError(
        res,
        404,
        "Error de validacion",
        `El campo ${e.meta?.target} ya existe.`
      );

      return;
    } else {
      ManageResponse.serverError(res, "Error en el servidor", e);
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const update = await prisma.user.update({
      data: req.body,
      where: { id: id },
    });
    if (update) {
      ManageResponse.success(res, "Usuario modificado exitosamente", update);
    } else {
      ManageResponse.notFound(res, "Usuario no modificado");
    }
  } catch (e) {
    ManageResponse.serverError(res, "Error en el servidor", e);
  }
};

export const deletedUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await prisma.user.update({
      where: { id: id },
      data: {
        is_deleted: "TRUE",
      },
    });
    if (deleted) {
      ManageResponse.success(res, "Usuario eliminado exitosamente");
    } else {
      ManageResponse.notFound(res, "error en eliminacion");
    }
  } catch (e) {
    ManageResponse.serverError(res, "Error en el servidor", e);
  }
};
