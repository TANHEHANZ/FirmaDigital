import z from "zod";

export const schemaToken = z.object({
  cantidad_certificados: z.number(),
  cantidad_priv_key: z.number(),
  alias: z.string(),
  tipo_token: z.string(),
  token_id: z.string(),
  validate_certificado: z.boolean(),
  estado_token: z.enum(["ACTIVO", "ELIMINADO", "EDITADO", "DESHABILITADO"]),

  tipo_certificado: z.string(),
  id_certificado_token: z.string(),
  desde: z.string(),
  hasta: z.string(),

  entidad: z.string(),

  ci: z.string(),
  descripcion: z.string(),
  email: z.string(),
  nombre: z.string(),
});
export type TokenDTO = z.infer<typeof schemaToken>;
