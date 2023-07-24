class AppError extends Error {
  constructor(message: string, statusCode: number, status: string) {
    super(message);
    (this as any).statusCode = statusCode;
    (this as any).status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
