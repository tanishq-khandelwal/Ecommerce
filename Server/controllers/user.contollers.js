import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { apolloClient } from "../config/hasuraClient.js"; // Import the Apollo Client
import { CREATE_USER, LOGIN } from "../queries/user.queries.js"; // Keep your existing queries

const cookieOptions = {
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: false,
};

const generateJWTToken = (userId, email) => {
  const payload = { userId, email };
  const secret = process.env.JWT_SECRET;

  const options = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};

const comparePassword = async (plainText, password) => {
  return await bcrypt.compare(plainText, password);
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

    // Use Apollo Client to create the user in Hasura
    const response = await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: { user },
    });

    // Extract user_id from the response
    const userId = response.data.insert_users_one.user_id;

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
      err.graphQLErrors?.[0]?.extensions?.code === "constraint-violation" &&
      err.graphQLErrors[0]?.message.includes("unique constraint")
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

  if (!email || !password) {
    return res.status(400).json({
      message: "All Fields are Required",
    });
  }

  try {
    // Fetch user from the database using Apollo Client
    const response = await apolloClient.query({
      query: LOGIN,
      variables: { email },
    });

    if (!response.data.users || response.data.users.length === 0) {
      console.log("No user found with this email");
      return res.status(404).json({
        message: "User not found",
      });
    }

    const Orgpassword = response.data.users[0].password;

    if (!Orgpassword) {
      console.log("Password not found");
      return res.status(404).json({
        message: "Password not found",
      });
    }

    if (await comparePassword(password, Orgpassword)) {
      const token = generateJWTToken(response.data.users[0].user_id, email);
      res.cookie("auth_token", token, cookieOptions);

      const userWithoutPassword = { ...response.data.users[0] };
      delete userWithoutPassword.password;

      console.log(userWithoutPassword);
      return res.status(200).json({
        message: "Login successful",
        data: userWithoutPassword,
      });

      
    } else {
      console.log("Wrong Password");
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

export const logoutUser = async (_req, res, _next) => {
  res.cookie("auth_token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
