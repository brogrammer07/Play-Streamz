import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { AppError } from "./app.error.handle";

const joiValidator = (schema: Schema, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property as keyof typeof req]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      return next(new AppError(message, 422, "JOI_VALIDATION"));
    }
  };
};

const joiValidatorFunction = (schema: Schema, obj: any) => {
  const { error } = schema.validate(obj);
  const valid = error == null;
  if (valid) {
    return true;
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    throw new AppError(message, 422, "JOI_VALIDATION");
  }
};

export default joiValidator;
export { joiValidatorFunction };
