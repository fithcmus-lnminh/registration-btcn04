import { ObjectId } from "mongoose";

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
};
