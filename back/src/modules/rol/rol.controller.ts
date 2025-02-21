import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ManageResponse from "../../infraestrucure/response/api";
import { state } from "../../infraestrucure/interface/state";
const prisma = new PrismaClient();

export const rolAll = async (req: Request, res: Response) => {
  const state = req.params.state as state;

  try {
    const rol = await prisma.rol.findMany({
      where: {
        estado_rol: state,
        NOT: {
          estado_rol: "ELIMINADO",
        },
      },
    });
    if (!rol) {
      ManageResponse.notFound(res, "Error al obtener roles");
    }
    ManageResponse.success(res, "Rol obtenidos correctamente", rol);
  } catch (e) {
    ManageResponse.badRequest(res, "Error de servidor", e);
  }
};

export const createRol = async (req: Request, res: Response) => {
  try {
    const create = await prisma.rol.create({
      data: req.body,
    });
    if (!create) {
      ManageResponse.notFound(res, "Error al crear un role");
    }
    ManageResponse.success(res, "Rol creado satisfactoriamente", create);
  } catch (e) {
    ManageResponse.badRequest(res, "Error de servidor", e);
  }
};

export const updateRol = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const update = await prisma.rol.update({
      where: { id: id },
      data: req.body,
    });
    if (!update) {
      ManageResponse.notFound(res, "Error al actualizar un rol");
    }
    ManageResponse.success(res, "Rol creado satisfactoriamente", update);
  } catch (e) {
    ManageResponse.badRequest(res, "Error de servidor", e);
  }
};
export const deletedRol = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await prisma.rol.update({
      where: { id: id },
      data: {
        estado_rol: "ELIMINADO",
      },
    });
    if (!deleted) {
      ManageResponse.notFound(res, "Error al eliminar el rol");
    }
    ManageResponse.success(res, "Rol eliminado satisfactoriamente");
  } catch (e) {
    ManageResponse.badRequest(res, "Error de servidor", e);
  }
};
