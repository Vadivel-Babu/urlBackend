import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashpassword });
      await newUser.save();
      return res.status(201).json({
        message: "user created",
        user: { newUser, token: getToken(newUser._id) },
      });
    }
    return res.json({
      message: "user already exsist",
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exisist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    return res.json({
      message: "signin successsfully",
      user: { user, token: getToken(user._id) },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
}

async function logout(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
}

function getToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
}
export default { signUp, login, logout };
