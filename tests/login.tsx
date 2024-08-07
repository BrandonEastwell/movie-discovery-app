/** import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage'; // Replace with your path

jest.mock('next/navigation', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('LoginPage component', () => {
  it('should render login form elements', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('should update username state on input change', () => {
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/username/i);
    userEvent.type(usernameInput, 'testuser');

    expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
  });

  it('should update password state on input change', () => {
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, 'password123');

    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
  });

  it('should call handleLogin on submit with valid credentials (mocked)', async () => {
    const mockPush = jest.fn();
    jest.spyOn(LoginPage.prototype, 'handleLogin').mockImplementationOnce(async () => {
      return { message: 'Login Successful!' };
    });

    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/username/i);
    userEvent.type(usernameInput, 'testuser');

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    userEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operation

    expect(LoginPage.prototype.handleLogin).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/account/userid'); // Replace userid with expected value
    expect(screen.getByText(/Login Successful!/i)).toBeInTheDocument();
  });

  // Add more test cases to simulate error scenarios, form validation, etc.
});
 **/
