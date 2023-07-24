import { Request } from "express-serve-static-core";

export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
}
