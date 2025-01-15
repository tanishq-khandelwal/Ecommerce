import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hasuraClient } from "../config/hasuraClient.js";
import { CREATE_USER, LOGIN } from "../queries/user.queries.js";

const cookieOptions = {
  secure: true,
  sameSite: 'None',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: false,
};

const generateJWTToken = (userId, email) => {
  const payload = { userId, email };
  const secret = process.env.JWT_SECRET; 
  const options = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};

const comparePassword = (plainText, password) => {
  const result = bcrypt.compareSync(plainText, password);

  return result;
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      message: "All Fields are Required",
    });
  }

  try {
    // Fetch user from the database
    const response = await hasuraClient.request(LOGIN, { email });

    if (!response.users || response.users.length === 0) {
      console.log('No user found with this email');
      return res.status(404).json({
        message: "User not found",
        
      });
    }

    const Orgpassword = response.users[0].password;

    if (!Orgpassword) {
      console.log('Password not found');
      return res.status(404).json({
        message: "Password not found",
      });
    }

    console.log('Fetched password:', Orgpassword);

    if (comparePassword(password, Orgpassword)) {
      console.log('Passwords Matched');

      const token = generateJWTToken(response.users[0].user_id, email);
      res.cookie("auth_token", token, cookieOptions);


      const userwithoutpassword={...response.users[0]};
      delete userwithoutpassword.password;

      return res.status(200).json({
        message: "Login successful",
        data:userwithoutpassword
      });
    } else {
      console.log('Wrong Password');
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    console.error("Error occurred during login:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
