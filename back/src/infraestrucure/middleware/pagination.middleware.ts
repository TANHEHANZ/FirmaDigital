import { Request, Response, NextFunction } from "express";

interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

declare global {
  namespace Express {
    interface Request {
      pagination: PaginationParams;
    }
  }
}

export const paginate = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);

  req.pagination = {
    page: isNaN(page) || page < 1 ? 1 : page,
    limit: isNaN(limit) || limit < 1 ? 10 : limit,
    skip:
      ((isNaN(page) || page < 1 ? 1 : page) - 1) *
      (isNaN(limit) || limit < 1 ? 10 : limit),
  };

  next();
};
