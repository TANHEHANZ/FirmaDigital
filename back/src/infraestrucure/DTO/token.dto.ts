import z from "zod";

export const schemaToken = z.object({
  modelo: z
    .string()
    .min(5, "debes ingresar como minimo 5 caracteres")
    .max(100, "debes ingresar como maximo 100 caracteres"),
  serial: z.string().min(5, "debes ingresar como minimo 5 caracteres"),
  usuario_id: z.string(),
});
