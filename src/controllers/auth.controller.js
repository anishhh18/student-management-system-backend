const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const isExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isExists) {
      return res.status(409).json({
        message: "User alreadt exists",
        user: {
          username,
          email,
          role,
        },
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfull",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server internal error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successfull",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({message:"Server internal error"})
  }
};


module.exports = { registerUser, loginUser};
