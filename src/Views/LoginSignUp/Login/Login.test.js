import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login'; 

const signInUserMock = jest.fn();
const registerUserMock = jest.fn();
const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Login signInUser={signInUserMock} registerUser={registerUserMock} />
      </Router>
    );
  });

  test('renders the login and signup form', () => {
    expect(screen.getByLabelText(/123@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/123/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows switching between Sign In and Sign Up', () => {
    // Initial state is "Sign In"
    expect(screen.getByText(/don't have an account\? sign up/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/don't have an account\? sign up/i));

  
    expect(screen.getByText(/already have an account\? sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  });

  test('handles input changes', () => {

    userEvent.type(screen.getByLabelText(/456@gmail.com/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/456/i), 'password');

    expect(screen.getByLabelText(/789@gmail.com/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/789/i)).toHaveValue('password');
  });

  test('submits the form for sign in', async () => {
   
    userEvent.type(screen.getByLabelText(/123@gmail.com/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/123/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(signInUserMock).toHaveBeenCalledWith('test@example.com', 'password', navigateMock));
  });

  test('submits the form for sign up', async () => {
    
    userEvent.click(screen.getByText(/don't have an account\? sign up/i));
    
 
    userEvent.type(screen.getByLabelText(/456/i), 'testuser');
    userEvent.type(screen.getByLabelText(/456@gmail.com/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/456/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(registerUserMock).toHaveBeenCalledWith('testuser', 'test@example.com', 'password', navigateMock));
  });
});
