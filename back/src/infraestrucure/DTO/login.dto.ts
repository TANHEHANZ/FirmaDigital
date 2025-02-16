import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "El correo electrónico no es válido" })
    .min(5, { message: "El campo email debe tener como mínimo 5 caracteres" })
    .max(150, {
      message: "El campo email debe tener como máximo 150 caracteres",
    }),

  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(100, { message: "La contraseña no debe superar los 100 caracteres" })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[\W_]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    }),
});
export type LoginDTO = z.infer<typeof loginSchema>;
