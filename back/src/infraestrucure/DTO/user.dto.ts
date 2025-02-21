import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(150, { message: "El nombre no puede superar los 150 caracteres" }),
  ci: z
    .string()
    .min(7, { message: "El CI debe tener al menos 7 caracteres" })
    .max(10, { message: "El CI no puede superar los 10 caracteres" })
    .regex(/^\d+$/, { message: "El CI solo puede contener números" }),

  password: z
    .string()
    .min(7, { message: "La contraseña debe tener al menos 7 caracteres" }),
  tipo_user: z.enum(["Juridica", "Natural"], {
    errorMap: () => ({
      message: "El tipo de usuario debe ser 'Juridica' o 'natural'",
    }),
  }),

  unidad: z.string().min(1, { message: "La unidad es obligatoria" }),
  institucion: z
    .string()
    .min(1, { message: "el institucion campo son obligatorios" }),
  cargo: z.string().min(1, { message: "el cargo campo son obligatorios" }),
  refresh_token: z.string().optional(),

  idRol: z.string().min(1, { message: "El rol es obligatorio" }),
  estado_user: z.enum(["ACTIVO", "ELIMINADO", "EDITADO"]),
});

export type UserDTO = z.infer<typeof userSchema>;
