import { Schema, model, Document, Model, HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// structure of a user document in the database
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
}

// methods that can be applied to user documents
export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  toJSON(): IUser;
}

//  extends the Mongoose Model interface and specifies additional methods available on the User model
interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

// schema for the User model
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
});

//  middleware function used to hash the user's password before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Instance method handles token generation for authentication
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: (user._id as number).toString() },
    process.env.JWT_KEY as string
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Instance method customizes the user object returned by toJSON() to exclude sensitive information like passwords and tokens
userSchema.methods.toJSON = function () {
  const user = this as IUser;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// static method allows finding a user by their email and password combination, facilitating user authentication
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};
// model creation
const User = model<IUser, UserModel>("User", userSchema);

export default User;
