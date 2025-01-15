import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hasuraClient } from "../config/hasuraClient.js";
import { RegisterUser, loginUser } from "../controllers/user.contollers.js";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../config/hasuraClient.js");


//  Testing for Register User API

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


// Testing for Login User API

describe("loginUser API", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "testpassword",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn(),
    };
  });

  it("should return 400 if email or password is missing", async () => {
    req.body = {}; // Empty request body

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All Fields are Required" });
  });

  it("should return 404 if no user is found for the provided email", async () => {
    hasuraClient.request.mockResolvedValueOnce({ users: [] });

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 404 if password is not found for the user", async () => {
    hasuraClient.request.mockResolvedValueOnce({ users: [{ password: null }] });

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Password not found" });
  });

  it("should return 400 if password is incorrect", async () => {
    hasuraClient.request.mockResolvedValueOnce({ users: [{ password: "hashedpassword" }] });
    bcrypt.compareSync.mockReturnValueOnce(false); // Simulate incorrect password

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Incorrect password" });
  });

  it("should return 200 and set cookie if login is successful", async () => {
    hasuraClient.request.mockResolvedValueOnce({
      users: [
        {
          user_id: 1,
          password: "hashedpassword",
          first_name: "Tanishq",
          last_name: "Khandelwal",
          phone: "9011616611",
          role: "CUSTOMER",
          carts: [{ cart_id: 1, quantity: 2 }],
        },
      ],
    });
    bcrypt.compareSync.mockReturnValueOnce(true); // Simulate correct password
    jwt.sign.mockReturnValueOnce("mocked_jwt_token"); // Mock JWT token

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      data: {
        user_id: 1,
        first_name: "Tanishq",
        last_name: "Khandelwal",
        phone: "9011616611",
        role: "CUSTOMER",
        carts: [{ cart_id: 1, quantity: 2 }],
      },
    });
    expect(res.cookie).toHaveBeenCalledWith("auth_token", "mocked_jwt_token", expect.any(Object));
  });

  it("should handle unexpected errors gracefully", async () => {
    const error = new Error("Database error");
    hasuraClient.request.mockRejectedValueOnce(error);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
