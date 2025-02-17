import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", { username, password }).then((res) => {
      if (res?.ok) {
        router.push("/map");
      } else {
        alert('Invalid login credentials');
      }
    });
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <button onClick={() => signIn("google", { callbackUrl: "/map" })}>
        Sign in with Google
      </button>

      <button onClick={() => signIn("github", { callbackUrl: "/map" })}>
        Sign in with GitHub
      </button>
    </div>
  );
};

export default HomePage;