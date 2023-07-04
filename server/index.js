import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { register, getMe, login } from "./controllers/UserController.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/PostController.js";
import {
  createCategory,
  getCategories,
} from "./controllers/CategoryController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose.connect("mongodb://172.17.0.2:27017/blog").then(() => {
  console.log("DB is up");
});

const app = express();
app.use(express.json());
app.use(cors());

app.post(
  "/posts",
  checkAuth,
  handleValidationErrors,
  postCreateValidation,
  create
);
app.get("/posts/", getAll);
app.get("/posts/:id/", getOne);
app.delete("/posts/:id/", checkAuth, remove);
app.patch("/posts/:id/", handleValidationErrors, checkAuth, update);

app.post("/category/", createCategory);
app.get("/category/", getCategories);

app.get("/auth/me/", checkAuth, getMe);

app.post("/auth/login/", handleValidationErrors, loginValidation, login);

app.post(
  "/auth/register/",
  handleValidationErrors,
  registerValidation,
  register
);

app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is UP");
  }
});
