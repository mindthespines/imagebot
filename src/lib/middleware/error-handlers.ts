/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { ExpressError } from "../../types";

export function handleNotFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const err: ExpressError = new Error("Not Found");
  err.status = 404;
  next(err);
}

export function handleError(
  err: ExpressError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500).send(err.message);
}
