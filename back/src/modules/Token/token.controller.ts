import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ManageResponse from "../../infraestrucure/response/api";
import { TokenDTO } from "../../infraestrucure/DTO/token.dto";
import { Status } from "../../infraestrucure/interface/state";
const prisma = new PrismaClient();
export const TokenAll = async (req: Request, res: Response) => {
  const state = req.params.state as Status;
  try {
    const tokens = await prisma.token.findMany({
      where: {
        estado_token: state,
        NOT: { estado_token: "ELIMINADO" },
      },
      omit: { id_certificado: true },
      include: {
        Certificado: {
          include: {
            Emisor: { select: { entidad: true } },
            titular: {
              omit: {
                id: true,
              },
            },
          },
        },
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
      where: { id: id, NOT: { estado_token: "ELIMINADO" } },
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
      alias,
      cantidad_certificados,
      cantidad_priv_key,

      tipo_token,
      token_id,
      validate_certificado,
      ci,
      descripcion,
      desde,
      email,
      entidad,
      estado_token,
      hasta,
      id_certificado_token,
      nombre,
      tipo_certificado,
    } = req.body as TokenDTO;
    if (!validate_certificado) {
      ManageResponse.notFound(res, "Error token sin certificado");
      return;
    }
    const emisorSertificado = await prisma.emisorCertificado.create({
      data: {
        entidad,
      },
    });
    if (!emisorSertificado) {
      ManageResponse.notFound(
        res,
        "Error no se pudo guardar el emisor del  certificado del token"
      );
      return;
    }
    const titular = await prisma.titularCertificado.create({
      data: {
        ci,
        descripcion,
        email,
        nombre,
      },
    });
    if (!titular) {
      ManageResponse.notFound(
        res,
        "Error no se pudo guardar el titular del  certificado del token"
      );
      return;
    }

    const certificado = await prisma.certificado.create({
      data: {
        tipo_certificado,
        id_certificado_token,
        desde,
        hasta,
        id_emisor: emisorSertificado.id,
        id_titular: titular.id,
      },
      include: {
        Emisor: true,
        titular: true,
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
        cantidad_certificados,
        cantidad_priv_key,
        alias,
        tipo_token,
        token_id,
        validate_certificado,
        estado_token,
        id_certificado: certificado.id,
      },
      include: {
        Certificado: {
          include: {
            Emisor: true,
            titular: true,
          },
        },
      },
    });
    console.log(token);
    if (!token) {
      ManageResponse.notFound(res, "Error no se pudo gardar el token");
      return;
    }
    ManageResponse.success(res, "Token alamencenado de forma correcta", token);
  } catch (error) {
    console.log(error);

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
        estado_token: "ELIMINADO",
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
