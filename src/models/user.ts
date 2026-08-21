import { Document, Schema, model } from "mongoose";

export type UserRole = "admin" | "staff";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  
  createdAt: Date;
  updateAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
      required: true,
    },
  },
  { timestamps: true },
);

const User = model<IUser>("User", UserSchema);

export default User;