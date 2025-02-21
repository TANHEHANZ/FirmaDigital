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
            name: true,
            ci: true,
            tipo_user: true,
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
      },
    });
    if (!document) {
      ManageResponse.notFound(res, "Error no se pudo registrar el documento");
      return;
    }
    const certificado = await prisma.certificado.create({
      data: {
        ...req.body,
      },
    });
    if (!certificado) {
      ManageResponse.notFound(
        res,
        "Error no se pudo guardar el certificado del token"
      );
      return;
    }
    // const token = await prisma.token.create({
    //   data: {
    //     tipo,
    //     id_token_provedor,
    //     ci_titual,
    //     email_titular,
    //     descripcion_titular,
    //     id_certificado: certificado.id,
    //   },
    //   include: {
    //     Certificado: true,
    //   },
    // });
    // if (!token) {
    //   ManageResponse.notFound(res, "Error no se pudo gardar el token");
    // }
    const firmar = await prisma.firmar.create({
      data: {
        idUser: idUser,
        idDocumento: document.id,
        // idToken: token.id,
      },
      include: {
        Documento: true,
        User: {
          select: {
            name: true,
            ci: true,
            tipo_user: true,
          },
        },
      },
    });
    if (!firmar) {
      ManageResponse.notFound(
        res,
        "Error no se pudo gardar todos los datos de la firma"
      );
    }
    ManageResponse.success(
      res,
      "Documento y token almacenado de forma correcta",
      firmar
    );
  } catch (error) {
    ManageResponse.serverError(res, "Error del servidor", error);
  }
};

export const UpdateDocument = async (req: Request, res: Response) => {
  const id_fileUpdate = req.params.id;
  const {
    idUser,
    tipo,
    id_token_provedor,
    ci_titual,
    email_titular,
    descripcion_titular,
    tipo_certificado,
    desde,
    hasta,
    emisor,
    estado,
    nombre,
    tipo_documento,
    documento_blob,
    id_historial,
  } = req.body;
  try {
    if (estado === "Modificado") {
      const updateFile = await prisma.documento.update({
        where: { id: id_fileUpdate },
        data: {
          ...req.body,
        },
      });
      ManageResponse.success(res, "El documento a sido modificado", updateFile);
      return;
    }
    if (estado === "Remplazado") {
      try {
        const document = await prisma.documento.create({
          data: {
            nombre,
            tipo_documento,
            documento_blob,
            id_historial: id_fileUpdate,
          },
        });
        if (!document) {
          ManageResponse.notFound(
            res,
            "Error no se pudo registrar el documento"
          );
          return;
        }
        const certificado = await prisma.certificado.create({
          data: {
            ...req.body,
          },
        });
        if (!certificado) {
          ManageResponse.notFound(
            res,
            "Error no se pudo guardar el certificado del token"
          );
          return;
        }

        const firmar = await prisma.firmar.create({
          data: {
            idUser: idUser,
            idDocumento: document.id,
          },
          include: {
            Documento: true,
            User: {
              select: {
                name: true,
                ci: true,
                tipo_user: true,
              },
            },
          },
        });
        ManageResponse.success(
          res,
          "Documento y token almacenado de forma correcta",
          firmar
        );
        return;
      } catch (error) {
        ManageResponse.serverError(
          res,
          "Error del servidor al editar el documento",
          error
        );
      }
      return;
    }
  } catch (error) {
    ManageResponse.serverError(res, "Error del servidor", error);
  }
};

export const historyDocument = async (req: Request, res: Response) => {
  const document_id = req.params.id;

  try {
    const principal = await prisma.firmar.findMany({
      where: {
        Documento: {
          id: document_id,
        },
      },
      include: {
        Documento: true,
        User: {
          select: {
            name: true,
            ci: true,
            tipo_user: true,
          },
        },
      },
    });
    if (!principal) {
      ManageResponse.notFound(res, "Error no se pudo obtener el historial");
      return;
    }

    const history = await prisma.firmar.findMany({
      where: {
        Documento: {
          id_historial: document_id,
        },
      },
      include: {
        Documento: true,
        User: {
          select: {
            name: true,
            ci: true,
            tipo_user: true,
          },
        },
      },
    });
    if (!history) {
      ManageResponse.notFound(res, "Error no se pudo obtener el historial");
    }
    ManageResponse.success(
      res,
      "Historial del documento obtenida exitosamente",
      { history, principal }
    );
  } catch (error) {
    ManageResponse.serverError(res, "Error del servidor", error);
  }
};

export const uploadFile = async (req: Request, res: Response) => {
  const { nombre, tipo_documento, documento_blob, estado } = req.body;
  const document = await prisma.documento.create({
    data: {
      nombre,
      tipo_documento,
      documento_blob,
      // estado: "Activo",
    },
  });
  ManageResponse.success(
    res,
    "Documentoalmacenado de forma correcta",
    document
  );
};
