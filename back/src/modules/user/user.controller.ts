import { PrismaClient } from "@prisma/client";
import ManageResponse from "../../infraestrucure/response/api";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { userSchema } from "../../infraestrucure/DTO/user.dto";

const prisma = new PrismaClient();

export const userAll = async (req: Request, res: Response) => {
  try {
    const userAll = await prisma.user.findMany();
    if (!userAll) {
      return ManageResponse.notFound(res, "Error al obtener usuarios");
    }
    return ManageResponse.success(
      res,
      "Usuarios obtenidos exitosamente",
      userAll
    );
  } catch (e) {
    return ManageResponse.badRequest(res, "Error de servidor", e);
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
      res.status(400).json({
        error: "Error de validación",
        message: `El campo ${e.meta?.target} ya existe.`,
      });
      return;
    } else {
      ManageResponse.serverError(res, "Error en el servidor", e);
    }
  }
};
