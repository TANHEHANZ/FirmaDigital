import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ManageResponse from "../../infraestrucure/response/api";
import { TokenDTO } from "../../infraestrucure/DTO/token.dto";
const prisma = new PrismaClient();

export const TokenAll = async (req: Request, res: Response) => {
  try {
    const tokens = await prisma.token.findMany({
      where: {
        is_deleted: "FALSE",
        is_active: "TRUE",
      },
    });
    if (!tokens) {
      ManageResponse.notFound(res, "Lista de tokens no obtenidas");
      return;
    }
    ManageResponse.success(
      res,
      "Lista de tokens obtenidas exitosamente",
      tokens
    );
  } catch (error) {
    ManageResponse.serverError(res, "Error en el servidor ", error);
  }
};

export const Token = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = await prisma.token.findUnique({
      where: { id: id },
    });
    if (!token) {
      ManageResponse.notFound(res, " token no obtenido");
      return;
    }
    ManageResponse.success(res, "token obtenido exitosamente", token);
  } catch (error) {
    ManageResponse.serverError(res, "Error en el servidor ", error);
  }
};

export const createToken = async (req: Request, res: Response) => {
  try {
    const {
      // idUser,
      tipo,
      id_token_provedor,
      ci_titual,
      email_titular,
      descripcion_titular,
      tipo_certificado,
      desde,
      hasta,
      emisor,
    } = req.body as TokenDTO;
    const certificado = await prisma.certificado.create({
      data: {
        tipo_certificado,
        desde,
        hasta,
        emisor,
      },
    });
    if (!certificado) {
      ManageResponse.notFound(
        res,
        "Error no se pudo guardar el certificado del token"
      );
      return;
    }
    const token = await prisma.token.create({
      data: {
        tipo,
        id_token_provedor,
        ci_titual,
        email_titular,
        descripcion_titular,
        id_certificado: certificado.id,
      },
      include: {
        Certificado: true,
      },
    });
    if (!token) {
      ManageResponse.notFound(res, "Error no se pudo gardar el token");
    }

    const register = await prisma.token.create({
      data: req.body,
    });
    if (!register) {
      ManageResponse.notFound(res, "No se pudo registrar de forma correcta ");
      return;
    }
    ManageResponse.success(
      res,
      "Token registrado de forma exitosamente",
      register
    );
  } catch (error) {
    ManageResponse.serverError(res, "Error en el servidor ", error);
  }
};

export const updateToken = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateToken = prisma.token.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
        isUpdate: "TRUE",
      },
    });
    if (!updateToken) {
      ManageResponse.notFound(res, "No se actualizo el token");
      return;
    }
    ManageResponse.success(res, "Datos correctamente editados", updateToken);
  } catch (error) {
    ManageResponse.serverError(res, "Error en el servidor ", error);
  }
};

export const deletedToken = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isDeleted = prisma.token.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: "TRUE",
      },
    });

    if (!isDeleted) {
      ManageResponse.notFound(
        res,
        "No se pudo realizar la eliminacion del token"
      );
      return;
    }
    ManageResponse.success(res, "Datos correctamente eliminados", isDeleted);
  } catch (error) {
    ManageResponse.serverError(res, "Datos correctamente eliminados", error);
  }
};
