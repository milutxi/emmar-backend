// registerUser → create a new staff/admin user
// loginUser    → check email/password and create login cookie
// logoutUser   → remove login cookie
// getMe        → check if user is already logged in

// Request / Response → Express types
// bcrypt             → hash password and compare password
// jwt                → create and verify login token
// User               → MongoDB User model

// bcrypt does password security
// jwt does login identity
// cookie does browser session

// Register → creates user with hashed password
// Login    → checks password and creates HttpOnly cookie
// Me       → reads cookie and returns current user
// Logout   → removes cookie

import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import User from "../models/user";

const cookieName = "emmarToken";

const getJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("Missing JWT_SECRET");
  }

  return jwtSecret;
};

const createToken = (userId: string, role: string) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    getJwtSecret(),
    {
      expiresIn: "7d",
    },
  );
};

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};

const getTokenFromRequest = (req: Request) => {
  const cookieToken = req.cookies?.[cookieName];

  if (cookieToken) {
    return cookieToken;
  }

  const authHeader = req.headers.authorization;

  if(authHeader?.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "");
  }

  return null;
};

export const registerUser = async (req: Request, res: Response) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_PUBLIC_REGISTER !== "true"
  ) {
    return res.status(403).json({
      message: "Registration is disabled in production",
    });
  }

  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Usser already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passwordHash,
      role: role || "staff",
    });

    const savedUser = await user.save();

    return res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordIsCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = createToken(String(user._id), user.role);

    res.cookie(cookieName, token, getCookieOptions());

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie(cookieName, getCookieOptions());

    return res.status(200).json({
      message: "Logged out",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const decoded = jwt.verify(token, getJwtSecret()) as {
      userId: string;
      role: string;
    };

    const user = await User.findById(decoded.userId).select("-passwordHash");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
