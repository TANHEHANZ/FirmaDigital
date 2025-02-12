import { PrismaClient } from "@prisma/client";
import ManageResponse from "../../infraestrucure/response/api";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const userAll = async (req: Request, res: Response) => {
  try {
    const userAll = await prisma.user.findMany();
    if (!userAll) {
      return ManageResponse.notFound(res, "Error al obtener usuarios");
    }
    return ManageResponse.success(
      res,
      "Usuarios obtenidos exitosamente ",
      userAll
    );
  } catch (e) {
    return ManageResponse.badRequest(res, "Error de servidor ", e);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const create = await prisma.user.create({ data: req.body });
    if (!create) {
      return ManageResponse.notFound(res, "Error al guardar al usuario");
    }
    return ManageResponse.success(
      res,
      "Usuarios obtenidos exitosamente ",
      create
    );
  } catch (e) {
    return ManageResponse.badRequest(res, "Error de servidor ", e);
  }
};
