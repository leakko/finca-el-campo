import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Form, Button, Row, Col } from "react-bootstrap"
import "./Login.scss"

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
    <Row className="justify-content-center">
      <Col sm={8} lg={6} xxl={4}>
        <div className="Login">
          {error && <p>There was an error: {error}</p>}
          <Form  onSubmit={doLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              name="email"
              value={credentials.email}
              onChange={onChange} 
              type="email" 
              placeholder="Enter email" />
              <Form.Text className="text-muted">
                No compartiremos tu correo con nadie.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Contraseña"
              name="password"
              value={credentials.password}
              onChange={onChange} 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
          </Form>
          <br />
          <Link to="/signup">¿Todavía no tienes cuenta? <br/> ¡Regístrate!</Link>
      </div>
    </Col>
  </Row>
  );
}

{/* <div className="Login">
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
    </div> */}