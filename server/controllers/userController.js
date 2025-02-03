import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User registered succesfully" });
  } catch (error) {
    console.log("Failed to register", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User does not exist");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Failed to login", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const profileDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error at Profile ", error);
    res.status(500).json({ messaeg: "Internal Server Error" });
  }
};

const updateProfileDetails = async (req, res) => {
  try {
    const { profilePicture, bio, socialLinks } = req.body;
    const updatedUser = await User.findById(req.user.id).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    updatedUser.profilePicture = profilePicture || updatedUser.profilePicture;
    updatedUser.bio = bio || updatedUser.bio;
    updatedUser.socialLinks = socialLinks || updatedUser.socialLinks;

    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    console.error("Error when updating Profile ", error);
    res.status(500).json({ messaeg: "Internal Server Error" });
  }
};

export { registerUser, loginUser, profileDetails, updateProfileDetails };
