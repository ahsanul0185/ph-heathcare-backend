import { NextFunction, Request, Response } from "express";
import { env } from "../../config/env";
import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../../errorHelpers/handleZodError";
import AppError from "../interfaces/AppError";



export const globalErrorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
  
    if (env.NODE_ENV === "development") {
        console.log("Error from Global Error Handler", err)
    }

    let errorSources : TErrorSources[] = []
    let statusCode : number = status.INTERNAL_SERVER_ERROR;
    let message : string = "Internal server error";
    let stack : string | undefined = undefined;

    if (err instanceof z.ZodError) {
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError.statusCode as number;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
      stack = err.stack;
    } else if (err instanceof AppError) {
      
      statusCode = err.statusCode;
      message = err.message;
      stack = err.stack;
      errorSources = [
        {
          path : "",
          message
        }
      ]

    } else if (err instanceof Error) {
      statusCode = status.INTERNAL_SERVER_ERROR;
      message = err.message;
      stack = err.stack;
      errorSources = [
        {
          path : "",
          message
        }
      ]
    }

    const errorResponse : TErrorResponse = {
      success : false,
      message,
      errorSources,
      error : env.NODE_ENV === "development" ? err : undefined,
      stack : env.NODE_ENV === "development" ? stack : undefined,
    }

  res.status(statusCode).json(errorResponse);
}