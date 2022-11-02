import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import User from "./model/user.js";
import bcrypt from "bcryptjs";
import path from "path";

app.use(express.json());

dotenv.config();
connectDb();

app.post("/api/register", async (req, res) => {
  const { email, name, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(200).json({
      errorCode: 0,
      message: "Email has been already registered",
      data: null,
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      errorCode: 1,
      message: "Register successfully",
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } else {
    res.status(500).json({
      errorCode: 0,
      message: "Internal error",
      data: null,
    });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find().limit(10);

  if (!users) {
    return res.status(500).json({
      errorCode: 0,
      message: "Internal error",
      data: null,
    });
  }

  return res.status(200).json({
    errorCode: 1,
    message: "Success",
    data: users,
  });
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`The app is listening on port ${port}!`));
