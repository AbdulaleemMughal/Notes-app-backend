import User from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.js";
import { validateUser } from "../utils/validateUser.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    validateUser(username, email, password);

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User Already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        message: "New User created successfully",
        data: newUser,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: "LogIn successfull",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("noteToken", "", {
      maxAge: 0,
    });

    res.status(200).json({ message: "Logout successfull" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


export const checkAuth = async (req, res) => {
    try {

        const user = req.user;

        res.status(200).json ({
            data: user
        })

    } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}