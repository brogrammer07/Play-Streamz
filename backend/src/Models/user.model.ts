import mongoose, { Document, Schema, Model, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import { AppError } from "../Utils/app.error.handle";

// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileUrl: string;
  isGoogle: boolean;
  channelId: { type: mongoose.Types.ObjectId };
}
interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>;
}
// Define the userSchema
const userSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    _id: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileUrl: { type: String, required: false },
    isGoogle: { type: Boolean, required: true, default: false },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the User's password before saving
userSchema.pre<IUser>("save", async function (next) {
  console.log("name", this.name);
  if (this.isGoogle) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(new AppError(error.message, 500, "ERR_UKN"));
  }
});

// Method to compare the User's password with the provided password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new AppError(error.message, 500, "ERR_UKN");
  }
};

// Create and export the userModel
const userModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);

export default userModel;
