import React, { useState } from "react";
import styles from "../styles/LoginForm.module.scss";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h1>Lorem Ipsum</h1>
      <p>Welcome, please log in to continue</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={!username || !password}
          className={styles.button}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
