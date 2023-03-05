import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import usersYellowClass from "../models/auth.js";

export const signup = async (req, res) => {
  const {
    name,
    email,
    hashedPassword,
  } = req.body;
  try {
    const existinguser = await usersYellowClass.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const newUser = await usersYellowClass.create({
      name,
      email,
      hashedPassword,
      contacts: []
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRECT,
      {
        expiresIn: "1h",
      }
    );

    const newUserDetail = [];
        newUserDetail.push({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            contacts: newUser.contacts
        });
    res.status(200).json({ result: newUserDetail, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await usersYellowClass.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't exist" });
    }

    const isPasswordCrt = await bcrypt.compare(password, existinguser.hashedPassword);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRECT,
      {
        expiresIn: "1h",
      }
    );

    const existingUserDetail = []
    existingUserDetail.push({
        _id: existinguser._id,
        name: existinguser.name,
        email: existinguser.email,
        contacts: existinguser.contacts
    });

    res.status(200).json({ result: existingUserDetail, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
