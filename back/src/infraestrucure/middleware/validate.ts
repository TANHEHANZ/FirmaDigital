import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError, ZodSchema } from "zod";
import { fromError } from "zod-validation-error";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error).message;
        const details = fromError(error).details;
        res.status(400).json({
          error: "Error de validación",
          validationError,
          details,
        });
        return;
      }
      res.status(500).json({
        error: "Error interno del servidor",
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado",
      });
      return;
    }
  };

export const handlePrismaError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(400).json({
        error: "Error de validación",
        message: `El campo ${err.meta?.target} ya existe.`,
      });
      return;
    }
  }
  next(err);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err instanceof Error ? err.message : "Ocurrió un error inesperado",
  });
};
