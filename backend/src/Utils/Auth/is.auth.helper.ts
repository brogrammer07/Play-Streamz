import { NextFunction, Request, Response } from "express-serve-static-core";
import globals from "../../Config/globals.config";
import { AppError } from "../app.error.handle";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../../Types";
import firebaseAuth from "../../Config/firebase.auth.config";
interface DecodedToken {
  userId: string;
  email: string;
  exp: number;
}
const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(
      new AppError(
        "Protected Route, please login",
        401,
        "ERR_AUTH_TOKEN_MISSING"
      )
    );
  }

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token);

    req.userId = decodedToken.uid;
    req.email = decodedToken.email;

    return next();
  } catch (error: any) {
    return next(
      new AppError("Protected Route, Please login first", 401, "ERR_AUTH_FUNC")
    );
  }
};

export { isAuthenticated };
