import { PrismaClient } from "@prisma/client";
import ManageResponse from "../../infraestrucure/response/api";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const unidadAll = async (req: Request, res: Response) => {
  try {
    const unidadAll = await prisma.unidad.findMany({
      where: {
        is_deleted: "FALSE",
      },
    });
    if (!unidadAll) {
      ManageResponse.notFound(res, "Error al obtener los datos ");
    }
    ManageResponse.success(res, "Datos obtenidos correctamente ", unidadAll);
  } catch (e) {
    ManageResponse.serverError(res, "Error del servidor ", e);
  }
};
export const createUnidad = async (req: Request, res: Response) => {
  try {
    const create = await prisma.unidad.create({
      data: req.body,
    });
    if (!create) {
      ManageResponse.notFound(res, "Error en la creacion de datos");
    }
    ManageResponse.success(res, "Datos creados exitosamente ", create);
  } catch (e) {
    ManageResponse.serverError(res, "Error del servidor ", e);
  }
};

export const updateUnidad = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const update = await prisma.unidad.update({
      where: { id: id },
      data: req.body,
    });
    if (!update) {
      ManageResponse.notFound(res, "Error en la edicion de datos ");
    }
    ManageResponse.success(res, "Datos correctameente editados ", update);
  } catch (e) {
    ManageResponse.serverError(res, "Error del servidor ");
  }
};
export const deletedUnidad = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await prisma.unidad.update({
      where: { id },
      data: {
        is_deleted: "TRUE",
      },
    });
    if (deleted) {
      ManageResponse.notFound(res, "Error en la eliminacion de la unidad");
    }
    ManageResponse.success(res, "Unidad eliminada ");
  } catch (e) {
    ManageResponse.serverError(res, "Error del servidor");
  }
};
