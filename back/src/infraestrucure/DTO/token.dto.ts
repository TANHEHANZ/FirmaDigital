import z from "zod";

export const schemaToken = z.object({
  // modelo: z
  //   .string()
  //   .min(5, "debes ingresar como minimo 5 caracteres")
  //   .max(100, "debes ingresar como maximo 100 caracteres"),
  // serial: z.string().min(5, "debes ingresar como minimo 5 caracteres"),
  // usuario_id: z.string(),
  tipo: z.string(),
  id_token_provedor: z.string(),
  ci_titual: z.string(),
  email_titular: z.string(),
  descripcion_titular: z.string(),

  tipo_certificado: z.string(),
  desde: z.string(),
  hasta: z.string(),
  emisor: z.string(),
});
export type TokenDTO = z.infer<typeof schemaToken>;
