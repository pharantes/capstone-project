import { signIn } from "next-auth/react";

const AuthPage = () => {
  return (
    <div>
      <h1>login/signup</h1>

      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Sign in with Google
      </button>

      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Sign in with GitHub
      </button>
    </div>
  );
};
export default AuthPage;