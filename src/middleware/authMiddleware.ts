import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../models/user";

const cookieName = "emmarToken";

type AuthUser = {
  userId: string;
  role: UserRole;
};

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

const getJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if(!jwtSecret) {
    throw new Error("Missing JWT_SECRET");
  }

  return jwtSecret;
};

// const getTokenFromRequest = (req: Request) => {
//   const cookieToken = req.cookies?.[cookieName];

//   if (cookieToken) {
//     return cookieToken;
//   }

//   const authHeader = req.headers.authorization;

//   if(authHeader?.startsWith("Bearer ")) {
//     return authHeader.replace("Bearer", "");
//   }

//   return null;
// };

const getTokenFromRequest = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "").trim();
  }

  const cookieToken = req.cookies?.[cookieName];

  if (cookieToken) {
    return cookieToken;
  }

  return null;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      res.status(401).json({
        message: "Not authorized. Please log in.",
      });
      return;
    }

    const decoded = jwt.verify(token, getJwtSecret()) as {
      userId: string;
      role: UserRole;
    };
    
    const user = await User.findById(decoded.userId).select("_id role");

    if (!user) {
      res.status(401).json({
        message: "User not found.",
      });
      return;
    }

    (req as AuthenticatedRequest).user = {
      userId: String(user._id),
      role: user.role,
    };

    next();

  } catch (error:any) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};