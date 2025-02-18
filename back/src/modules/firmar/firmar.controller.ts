import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ManageResponse from "../../infraestrucure/response/api";
import { SignedDTO } from "../../infraestrucure/DTO/signedfile.dto";
const prisma = new PrismaClient();
export const signedDocuments = async (req: Request, res: Response) => {
  try {
    const signed = await prisma.firmar.findMany({
      include: {
        Documento: true,
        User: {
          select: {
            email: true,
            name: true,
            ci: true,
            tipo_user: true,
          },
        },
        Token: {
          include: {
            Certificado: true,
          },
        },
      },
    });
    if (!signed) {
      ManageResponse.notFound(res, "Error el obtener los documentos firmados");
      return;
    }
    ManageResponse.success(
      res,
      "Documentos firmados obtenidos correctamente",
      signed
    ),
      signed;
  } catch (error) {
    ManageResponse.serverError(res, "Error en el servidor", error);
  }
};

export const uploadAndSignDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    idUser,
    nombre,
    documento_blob,
    tipo_documento,
    tipo,
    id_token_provedor,
    ci_titual,
    email_titular,
    descripcion_titular,
    tipo_certificado,
    desde,
    hasta,
    emisor,
  } = req.body as SignedDTO;

  try {
    const document = await prisma.documento.create({
      data: {
        nombre,
        tipo_documento,
        documento_blob,
        estado: "Activo",
      },
    });
    if (!document) {
      ManageResponse.notFound(res, "Error no se pudo registrar el documento");
      return;
    }
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
    const firmar = await prisma.firmar.create({
      data: {
        idUser: idUser,
        idDocumento: document.id,
        idToken: token.id,
      },
      include: {
        Documento: true,
        User: {
          select: {
            email: true,
            name: true,
            ci: true,
            tipo_user: true,
          },
        },
        Token: {
          include: {
            Certificado: true,
          },
        },
      },
    });
    ManageResponse.success(
      res,
      "Documento y token almacenado de forma correcta",

      firmar
    );
  } catch (error) {
    ManageResponse.serverError(res, "Error del servidor", error);
  }
};
