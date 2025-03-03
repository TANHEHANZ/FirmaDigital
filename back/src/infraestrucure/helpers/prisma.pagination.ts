import { PrismaClient, Prisma } from "@prisma/client";

export const getPaginatedResults = async <T, M extends keyof PrismaClient>(
  prisma: PrismaClient,
  model: M,
  pagination: { skip: number; limit: number },
  where: Prisma.Args<PrismaClient[M], "findMany">["where"] = {},
  include: Prisma.Args<PrismaClient[M], "findMany">["include"] = {},
  orderBy: Prisma.Args<PrismaClient[M], "findMany">["orderBy"] = {}
) => {
  // Obtener total de registros y datos paginados
  const [total, items] = await Promise.all([
    (prisma[model] as any).count({ where }),
    (prisma[model] as any).findMany({
      skip: pagination.skip,
      take: pagination.limit,
      where,
      include,
      orderBy,
    }),
  ]);

  return {
    data: items, // Ahora `items` está dentro de `data`
    pagination: {
      total,
      page: Math.floor(pagination.skip / pagination.limit) + 1,
      lastPage: Math.ceil(total / pagination.limit),
      limit: pagination.limit,
    },
  };
};
