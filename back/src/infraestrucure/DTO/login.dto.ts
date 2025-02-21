import z from "zod";

export const loginSchema = z.object({
  ci: z
    .string()
    .min(7, { message: "El campo ci debe tener como mínimo 5 caracteres" })
    .max(150, {
      message: "El campo ci debe tener como máximo 150 caracteres",
    }),

  password: z
    .string()
    .min(7, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(100, { message: "La contraseña no debe superar los 100 caracteres" }),
});
export type LoginDTO = z.infer<typeof loginSchema>;
