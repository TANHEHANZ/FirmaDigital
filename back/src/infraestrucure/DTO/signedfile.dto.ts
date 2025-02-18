import z from "zod";

export const schemaSignedFile = z.object({
  idUser: z.string(), // por ahora necesitamos el idUser
  nombre: z
    .string()
    .min(5, "debes ingresar almenos 5 caracteres")
    .max(255, "no puedes ingresar mas de 255 carcteres"),
  tipo_documento: z.string(),
  documento_blob: z.string(),
  tipo: z
    .string()
    .min(5, "debes ingresar almenos 5 caracteres")
    .max(100, "no puedes ingresar mas de 100 carcteres"),
  id_token_provedor: z.string(),
  ci_titual: z.string(),
  email_titular: z.string(),
  descripcion_titular: z.string(),
  tipo_certificado: z.string(),
  desde: z.string().transform((str) => new Date(str)),
  hasta: z.string().transform((str) => new Date(str)),
  emisor: z.string(),
});
export type SignedDTO = z.infer<typeof schemaSignedFile>;
