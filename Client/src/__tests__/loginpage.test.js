import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { setCredentials, useLoginMutation } from "../redux/slices/authSlice";
import LoginPage from "../pages/LoginPage";
import toast from "react-hot-toast";

jest.mock("../redux/slices/authSlice", () => ({
  useLoginMutation: jest.fn(),
  setCredentials:jest.fn()
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
}));

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock reducer for testing
const mockReducer = (state = {}, action) => state;

// Create a mock store with the mock reducer
const store = configureStore({
  reducer: mockReducer,
});

describe("Login Component", () => {
  let mockLogin;

  beforeEach(() => {
    mockLogin = jest.fn();
    mockLogin.unwrap = jest
      .fn()
      .mockRejectedValue({ data: { message: "Invalid credentials" } }); // Mock unwrap method
    useLoginMutation.mockReturnValue([
      mockLogin,
      { isLoading: false, isError: false, error: null },
    ]);
  });

  test("renders the Login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("Should Update email when email in input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    expect(emailInput.value).toBe("test@gmail.com");
  });

  test("Should update Password when password is Input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  test("toggles password visibility when the eye icon is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByTestId("toggle-password-visibility");

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  test("Displays Loading text when the login request is being processed", async () => {
    useLoginMutation.mockReturnValue([
      mockLogin,
      { isLoading: true, isError: false, error: null },
    ]);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Loading....");
    });
  });

  test("Should Show Error", async () => {
    // Mock the login function to reject with an error
    const mockError = { data: { message: "Login failed. Please try again" } };
    const mockLogin = jest.fn().mockRejectedValue(mockError);

    useLoginMutation.mockReturnValue([
      mockLogin,
      { isLoading: false, isError: true, error: mockError },
    ]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    // Wait for the error toast to be called
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Login failed. Please try again"
      );
    });
  });

  test.skip("Should redirect to Dashboard on Successful Login", async () => {
    const mockResponse = { user: "testUser" };
    useLoginMutation.mockReturnValue([
      mockLogin,
      { isLoading: false, isError: false, error: false },
    ]);
    mockLogin.mockResolvedValue(mockResponse);

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
