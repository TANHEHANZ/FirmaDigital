import { PrismaClient } from "@prisma/client";
import ManageResponse from "../../infraestrucure/response/api";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { state } from "../../infraestrucure/interface/state";
const prisma = new PrismaClient();

export const userAll = async (req: Request, res: Response) => {
  const state = req.params.state as state;
  try {
    const userAll = await prisma.user.findMany({
      where: {
        estado_user: state,
        NOT: {
          estado_user: "ELIMINADO",
        },
      },
      omit: {
        password: true,
        refresh_token: true,
      },
      include: {
        rol: {
          select: {
            tipo: true,
          },
        },
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
    if (!create) {
      ManageResponse.notFound(res, "Usuario No creado");
    }
    console.log(req.body);

    ManageResponse.success(res, "Usuario creado exitosamente", create);
  } catch (e: any) {
    console.log(req.body);
    console.log(e);
    if (e.code === "P2002") {
      ManageResponse.customError(
        res,
        404,
        "Error de validacion",
        `El usuario con  ${e.meta?.target} ya existe.`
      );
      // debemos manejar los errores de bd de forma diferente
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
      data: { ...req.body, estado_user: "EDITADO" },
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
        estado_user: "ELIMINADO",
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

export const infoUser = async (req: Request, res: Response) => {
  const CI = req.params.ci;

  const consulta = await fetch(
    "https://appgamc.cochabamba.bo/transparencia/servicio/busqueda_empleados.php",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `dato=${CI}&tipo=D`,
    }
  );
  const data = (await consulta.json()) as any;
  if (data && data.status) {
    res.json({
      status: 200,
      message: data.message || "datos traidos correctamente",
      data: data.data ? data.data : [],
    });
  } else {
    res.status(500).json({
      status: false,
      message: "Debe proporcionar un CI valido",
      data: [],
    });
  }
};
