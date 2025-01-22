import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { useLoginMutation } from "../redux/slices/authSlice";
import LoginPage from "../pages/LoginPage";
import toast from "react-hot-toast";

jest.mock("../redux/slices/authSlice", () => ({
  useLoginMutation: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
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
    useLoginMutation.mockReturnValue([mockLogin, { isLoading: false, isError: false, error: null }]);
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
});
