import z from "zod";

export const schemaUnidad = z.object({
  unidad: z
    .string()
    .min(3, "La unidad debe tener un mino de 3 caracteres ")
    .max(100, "el campo unida requiere un maximo de 100 caracteres"),
  is_active: z.string().optional().default("FALSE"),
  id_deleted: z.string().optional().default("FALSE"),
  isUpdate: z.string().optional().default("FALSE"),
});
