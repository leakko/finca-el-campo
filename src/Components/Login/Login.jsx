import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const { login } = useAuth();
  const { replace } = useHistory();

  const onChange = (e) => {
    setCredentials((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const doLogin = (e) => {
    e.preventDefault();
    login(credentials.email, credentials.password)
      .then(() => {
        replace("/");
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div className="Login">
      {error && <p>There was an error: {error}</p>}
      <form onSubmit={doLogin}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          value={credentials.email}
          onChange={onChange}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          name="password"
          id="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button type="submit">Log in</button>
      </form>
      <br />
      <Link to="/signup">Don't have an account yet? Sign up here</Link>
    </div>
  );
}