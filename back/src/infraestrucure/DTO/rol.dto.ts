import { z } from "zod";

export const rolSchema = z.object({
  tipo: z
    .string()
    .min(3, "El tipo de rol debe tener almenos 3 caracteres")
    .max(100, "El tipo no puede exeder los 100 caracteres"),
  is_active: z.string().optional().default("FALSE"),
  id_deleted: z.string().optional().default("FALSE"),
  isUpdate: z.string().optional().default("FALSE"),
});

export type RolDTO = z.infer<typeof rolSchema>;
