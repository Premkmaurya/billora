import { AuthUI } from "./auth-ui";

export const LoginPage = () => {
  return <AuthUI mode="signin" />;
};

export const SignupPage = () => {
  return <AuthUI mode="signup" />;
};
