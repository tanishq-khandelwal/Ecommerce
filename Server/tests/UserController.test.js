import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hasuraClient } from "../config/hasuraClient.js";
import { RegisterUser } from "../controllers/user.contollers.js";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../config/hasuraClient.js");

describe("RegisterUser API", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        address: "123 Main St",
        phone: "1234567890",
        email: "john.doe@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn(),
    };
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = { ...req.body, first_name: "" };

    await RegisterUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All Fields are Required",
    });
  });

  it("should successfully register a user", async () => {
    const hashedPassword = "hashedPassword";
    const userId = "123";
    const token = "jwtToken";
    bcrypt.hash.mockResolvedValue(hashedPassword);
    hasuraClient.request.mockResolvedValue({
      insert_users_one: { user_id: userId },
    });
    jwt.sign.mockReturnValue(token);

    await RegisterUser(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(hasuraClient.request).toHaveBeenCalledWith(expect.anything(), {
      user: expect.objectContaining({ email: "john.doe@example.com" }),
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId, email: "john.doe@example.com" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    expect(res.cookie).toHaveBeenCalledWith(
      "auth_token",
      token,
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

  it("should return 500 if email already exists", async () => {
    const error = {
      response: {
        errors: [
          {
            extensions: {
              code: "constraint-violation",
            },
            message: "unique constraint",
          },
        ],
      },
    };
    bcrypt.hash.mockResolvedValue("hashedPassword");
    hasuraClient.request.mockRejectedValue(error);

    await RegisterUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email already exists. Please use a different email.",
    });
  });

  it("should return 500 if an error occurs during registration", async () => {
    const error = new Error("Some error");
    bcrypt.hash.mockResolvedValue("hashedPassword");
    hasuraClient.request.mockRejectedValue(error);

    await RegisterUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error while registering the user",
    });
  });
});
