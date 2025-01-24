import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Signup from '../pages/SignUp';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
// import '@testing-library/jest-dom';
import toast from 'react-hot-toast';
import { useSignupMutation } from '../redux/slices/authSlice';

jest.mock("../redux/slices/authSlice",()=>({
  useSignupMutation:jest.fn()
}))

// jest.mock('../redux/slices/authSlice', () => ({
//   useSignupMutation: jest.fn(),
// }));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

const mockReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: mockReducer,
});

jest.mock("react-hot-toast",()=>({
    success:jest.fn(),
    error:jest.fn(),
    loading:jest.fn(),
}))






describe('Signup Component', () => {

  it('should render the Signup form correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    const addressInputs = screen.getAllByLabelText(/Address/i);
expect(addressInputs).toHaveLength(2); // Ensure there is only one Address input
expect(addressInputs[0]).toBeInTheDocument(); // Verify it's in the document

    expect(screen.getByTestId("signup-button")).toBeInTheDocument();
  });

  it('should display error message for invalid email', () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'invalidEmail' },
    });

    fireEvent.blur(screen.getByLabelText(/Email Address/i));

    expect(screen.getByText(/Please enter a valid email address./i)).toBeInTheDocument();
  });

  it('should show and hide password when the button is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const togglePasswordButton = screen.getByTestId("toggle-password-visibility");

    // Check that the password is initially hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(togglePasswordButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click again to hide password
    fireEvent.click(togglePasswordButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should call handleSubmit on form submit', async () => {
    jest.mock('../redux/slices/authSlice', () => ({
      useSignupMutation: jest.fn(),
    }));
  
    const mockSignupFn = jest.fn().mockResolvedValue({
      data: { message: "User Registered Successfully!" },
    });
  
    useSignupMutation.mockReturnValue([
      mockSignupFn,
      { isLoading: false, isError: false, error: null },
    ]);
  
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );
  
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByTestId("address"), {
      target: { value: '123 Main St' },
    });
  
    fireEvent.click(screen.getByTestId("signup-button"));
  
    await waitFor(() => {
      expect(mockSignupFn).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("User Registered Successfully !");
    });
  });
  

//   it('should disable submit button while loading', () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <Signup />
//         </Router>
//       </Provider>
//     );

//     fireEvent.change(screen.getByLabelText(/First Name/i), {
//       target: { value: 'John' },
//     });
//     fireEvent.change(screen.getByLabelText(/Last Name/i), {
//       target: { value: 'Doe' },
//     });
//     fireEvent.change(screen.getByLabelText(/Email Address/i), {
//       target: { value: 'john.doe@example.com' },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: 'password123' },
//     });
//     fireEvent.change(screen.getByLabelText(/Phone Number/i), {
//       target: { value: '1234567890' },
//     });
//     fireEvent.change(screen.getByLabelText(/Address/i), {
//       target: { value: '123 Main St' },
//     });

//     const submitButton = screen.getByRole('button');
//     fireEvent.submit(screen.getByRole('form'));

//     // Submit button should be disabled while loading
//     expect(submitButton).toBeDisabled();
//   });

//   it('should show error message when signup fails', async () => {
//     // Simulate error response from signupUser mutation
//     render(
//       <Provider store={store}>
//         <Router>
//           <Signup />
//         </Router>
//       </Provider>
//     );

//     fireEvent.change(screen.getByLabelText(/First Name/i), {
//       target: { value: 'John' },
//     });
//     fireEvent.change(screen.getByLabelText(/Last Name/i), {
//       target: { value: 'Doe' },
//     });
//     fireEvent.change(screen.getByLabelText(/Email Address/i), {
//       target: { value: 'john.doe@example.com' },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: 'password123' },
//     });
//     fireEvent.change(screen.getByLabelText(/Phone Number/i), {
//       target: { value: '1234567890' },
//     });
//     fireEvent.change(screen.getByLabelText(/Address/i), {
//       target: { value: '123 Main St' },
//     });

//     fireEvent.submit(screen.getByRole('form'));

//     await waitFor(() => {
//       // Check if toast error message is shown
//       expect(screen.getByText(/Error during signup/i)).toBeInTheDocument();
//     });
//   });
});
