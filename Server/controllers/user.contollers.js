import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hasuraClient } from "../config/hasuraClient.js";
import { CREATE_USER } from "../queries/user.queries.js";

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
};

const generateJWTToken = (userId, email) => {
  const payload = { userId, email };
  const secret = process.env.JWT_SECRET; // Store your secret securely in environment variables.
  const options = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};

export const RegisterUser = async (req, res) => {
  const { first_name, last_name, address, phone, email, password } = req.body;

  if (!first_name || !last_name || !address || !phone || !email || !password) {
    return res.status(400).json({
      message: "All Fields are Required",
    });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      first_name,
      last_name,
      address,
      phone,
      email,
      password: hashedPassword,
    };

    // Create user in Hasura
    const response = await hasuraClient.request(CREATE_USER, { user });

    // Extract user_id from the Hasura response
    const userId = response.insert_users_one.user_id;


    // Generate a JWT token
    const token = generateJWTToken(userId, email);

    // Set the token as a cookie
    res.cookie("auth_token", token, cookieOptions);

    // Send success response
    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("An Error Occurred:", err);

    if (
      err.response?.errors?.[0]?.extensions?.code === "constraint-violation" &&
      err.response.errors[0]?.message.includes("unique constraint")
    ) {
      return res.status(500).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    res.status(500).json({
      message: "Error while registering the user",
    });
  }
};
