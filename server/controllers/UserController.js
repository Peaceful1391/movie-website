import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "godbless", 
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't register",
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "User isn't found",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPassword) {
      return res.status(404).json({
        message: "Uncorrect login or password",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "godbless",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {}
};
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User isn't found",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No access",
    });
  }
};