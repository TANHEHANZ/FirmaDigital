import { Response } from "express";

const ManageResponse = {
  success: (res: Response, message: string, data: any = null): Response => {
    return res.status(200).json({
      status: 200,
      message,
      data,
    });
  },

  paginatedSuccess: (
    res: Response,
    message: string,
    data: any = null
  ): Response => {
    return res.status(200).json({
      status: 200,
      message,
      ...data,
    });
  },
  badRequest: (
    res: Response,
    message: string,
    errors: any = null
  ): Response => {
    return res.status(400).json({
      status: 400,
      message,
      errors,
    });
  },

  notFound: (res: Response, message: string): Response => {
    return res.status(404).json({
      status: 404,
      message,
      data: null,
    });
  },

  unauthorized: (res: Response, message: string): Response => {
    return res.status(401).json({
      status: 401,
      message,
      data: null,
    });
  },

  forbidden: (res: Response, message: string): Response => {
    return res.status(403).json({
      status: 403,
      message,
      data: null,
    });
  },

  serverError: (
    res: Response,
    message: string,
    errors: any = null
  ): Response => {
    return res.status(500).json({
      status: 500,
      message,
      errors,
    });
  },

  customError: (
    res: Response,
    status: number,
    message: string,
    errors: any = null
  ): Response => {
    return res.status(status).json({
      status,
      message,
      errors,
    });
  },
};

export default ManageResponse;
