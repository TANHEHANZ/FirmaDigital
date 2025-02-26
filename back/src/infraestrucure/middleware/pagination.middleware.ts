import { Request, Response, NextFunction } from "express";

interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        limit: number;
        skip: number;
        sort: string;
        order: "asc" | "desc";
      };
    }
  }
}

export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "desc",
  } = req.query as PaginationQuery;

  const validPage = Math.max(1, Number(page));
  const validLimit = Math.min(100, Math.max(1, Number(limit)));
  const validOrder = order === "asc" ? "asc" : "desc";

  req.pagination = {
    page: validPage,
    limit: validLimit,
    skip: (validPage - 1) * validLimit,
    sort,
    order: validOrder,
  };

  next();
};
