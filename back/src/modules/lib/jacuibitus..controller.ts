import { Request, Response } from "express";
import fetch from "node-fetch";
import ManageResponse from "../../infraestrucure/response/api";
import { PATH_LIB } from "./path.enum";
import { dataPdf, datosList, resJacubitus } from "./response";
import https from "https";
const jacubitus = process.env.URL_JACUBITUS || "consumer_key";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const listToken = async (req: Request, res: Response) => {
  try {
    const response = await fetch(jacubitus + PATH_LIB.LIST_TOKEN, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    if (response.status === 400) {
      console.log("Response headers:", response.headers);
      const errorData = await response.json();
      console.log("Error response:", errorData);
      ManageResponse.badRequest(
        res,
        "Error en la petición al servidor Jacubitus"
      );
      return;
    }
    const data = (await response.json()) as resJacubitus<datosList>;

    if (!data.finalizado || !data.datos?.connected) {
      ManageResponse.notFound(res, "No hay token conectados");
      return;
    }
    ManageResponse.success(res, data.mensaje, data.datos);
  } catch (error) {
    console.error("Full error:", error);
    ManageResponse.serverError(res, "Error al obtener lista de tokens", error);
  }
};

export const firmar = async (req: Request, res: Response) => {
  const { slot, alias, pin, nombre, tipo_documento, pdf } = req.body;
  const idUser = req.user?.userId;
  const id_historial = req.params.id_historial || null;
  try {
    const validateTokenAsignado = await prisma.asignacionToken.findFirst({
      where: {
        id_user_asignado: idUser,
        NOT: {
          estado: "DESHABILITADO",
        },
        AND: {
          token: {
            NOT: {
              estado_token: "DESHABILITADO",
            },
          },
        },
      },
    });
    if (!validateTokenAsignado) {
      ManageResponse.notFound(res, "No tienes un token asignado para firmar");
      return;
    }
    try {
      const response = await fetch(jacubitus + PATH_LIB.UPLOAD_FILE_PDF, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          slot,
          alias,
          pin,
          pdf,
        }),
        agent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

      const data = (await response.json()) as resJacubitus<dataPdf>;
      if (!data.finalizado) {
        ManageResponse.notFound(res, "No hay token conectados");
        return;
      }
      const document = await prisma.documento.create({
        data: {
          nombre,
          tipo_documento,
          documento_blob: data.datos.pdf_firmado,
          estado: "ACTIVO",
          id_historial: id_historial ? id_historial : null,
        },
      });
      if (!document) {
        ManageResponse.notFound(res, "No se pudo guardar el documento");
        return;
      }
      const userId = req.user?.userId;
      const firmar = await prisma.firmar.create({
        data: {
          idDocumento: document.id,
          idUser: userId!,
        },
        omit: {
          idDocumento: true,
          idUser: true,
        },
        include: {
          Documento: true,
          User: {
            omit: {
              idRol: true,
              password: true,
              refresh_token: true,
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

      ManageResponse.success(res, data.mensaje, firmar);
    } catch (error) {
      console.error(error);
      ManageResponse.serverError(
        res,
        "Error al obtener lista de tokens",
        error
      );
    }
  } catch (error) {
    ManageResponse.serverError(
      res,
      "Error en el servidor contactate con hancito , Te ayudara !!! ",
      error
    );
  }
};
