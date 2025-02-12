import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(150, "El nombre no puede superar los 150 caracteres"),

  email: z.string().email("Debe ser un email válido"),
  ci: z
    .string()
    .min(7, "El CI debe tener al menos 7 caracteres")
    .max(10, "El CI no puede superar los 10 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  tipo_user: z.enum(["Juridica", "natural"], {
    errorMap: () => ({
      message: "El tipo de usuario debe ser 'Juridica' o 'natural'",
    }),
  }),
  idRol: z.string().min(1, "El rol es obligatorio"),
  idUnidad: z.string().min(1, "La unidad es obligatoria"),
  is_active: z.string().optional().default("FALSE"),
  is_deleted: z.string().optional().default("FALSE"),
  isUpdate: z.string().optional().default("FALSE"),
});

export type UserDTO = z.infer<typeof userSchema>;
