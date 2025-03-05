import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import ManageResponse from "../../infraestrucure/response/api";
import { SignedDTO } from "../../infraestrucure/DTO/signedfile.dto";
import { getPaginatedResults } from "../../infraestrucure/helpers/prisma.pagination";
const prisma = new PrismaClient();
export const signedDocuments = async (req: Request, res: Response) => {
  try {
    const idUser = req.user?.userId;
    const { limit, skip } = req.pagination;
    const { nombreFirmador, Cifirmador, FechaCreacion, estadoDocumento } =
      req.query;

    const whereClause: any = {
      idUser: idUser,
    };

    if (nombreFirmador || Cifirmador || FechaCreacion || estadoDocumento) {
      whereClause.AND = [] as any[];

      if (nombreFirmador || Cifirmador) {
        whereClause.AND.push({
          User: {
            OR: [
              nombreFirmador && {
                name: {
                  contains: nombreFirmador as string,
                  mode: "insensitive",
                },
              },
              Cifirmador && {
                ci: { contains: Cifirmador as string, mode: "insensitive" },
              },
            ].filter(Boolean),
          },
        });
      }

      if (FechaCreacion) {
        const startDate = new Date(FechaCreacion as string);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(FechaCreacion as string);
        endDate.setHours(23, 59, 59, 999);

        whereClause.AND.push({
          fecha: {
            gte: startDate,
            lte: endDate,
          },
        });
      }

      if (estadoDocumento) {
        whereClause.AND.push({
          Documento: {
            estado: estadoDocumento as string,
          },
        });
      }
    }

    const result = await getPaginatedResults(
      prisma,
      "firmar",
      { skip, limit },
      whereClause,
      {
        Documento: {
          select: {
            nombre: true,
            tipo_documento: true,
            estado: true,
            fecha_creacion: true,
            id_historial: true,
          },
        },
        User: {
          select: {
            name: true,
            ci: true,
            tipo_user: true,
          },
        },
      },
      { fecha: "desc" }
    );

    ManageResponse.paginatedSuccess(
      res,
      "Documentos firmados obtenidos correctamente",
      result
    );
  } catch (error) {
    ManageResponse.serverError(res, "Error en el servidor", error);
  }
};

export const FileSignedById = async (req: Request, res: Response) => {
  const id = req.params.idFile;
  try {
    const document = await prisma.documento.findFirst({
      where: {
        id: id,
      },
      select: {
        documento_blob: true,
      },
    });
    if (!document) {
      ManageResponse.notFound(res, "No se encontro el documento");
      return;
    }
    ManageResponse.success(res, "Documento obtenido correctamente", document);
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

  const includeQuery = {
    Documento: {
      omit: {
        documento_blob: true,
      },
    },
    User: {
      select: {
        name: true,
        ci: true,
        tipo_user: true,
        AsignacionToken: {
          include: {
            token: {
              include: {
                Certificado: {
                  include: {
                    titular: {
                      select: {
                        ci: true,
                        nombre: true,
                        email: true,
                      },
                    },
                    Emisor: {
                      select: {
                        entidad: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  try {
    const [principal, history] = await Promise.all([
      prisma.firmar.findFirst({
        where: { Documento: { id: document_id } },
        include: includeQuery,
      }),
      prisma.firmar.findMany({
        where: { Documento: { id_historial: document_id } },
        include: includeQuery,
      }),
    ]);
    if (!principal && !history.length) {
      ManageResponse.notFound(
        res,
        "No se encontraron registros del documento" + document_id
      );
      return;
    }
    ManageResponse.success(
      res,
      "Historial del documento obtenido exitosamente",
      { principal, history }
    );
    return;
  } catch (error) {
    console.error(error);
    ManageResponse.serverError(res, "Error del servidor", error);
  }
  return;
};

// export const historyDocument = async (req: Request, res: Response) => {
//   const document_id = req.params.id;

//   try {
//     const [principal, history] = await Promise.all([
//       prisma.documentHistory.findMany({
//         where: { documento_id: document_id },
//       }),
//       prisma.documentHistory.findMany({
//         where: { id_historial: document_id },
//       }),
//     ]);

//     if (!principal.length && !history.length) {
//       ManageResponse.notFound(res, "No se encontraron registros del documento");
//       return;
//     }

//     ManageResponse.success(
//       res,
//       "Historial del documento obtenido exitosamente",
//       { principal, history }
//     );
//     return;
//   } catch (error) {
//     console.error(error);
//     ManageResponse.serverError(res, "Error del servidor", error);
//     return;
//   }
// };

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
