import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Form, Button, Row, Col, Container, Alert} from "react-bootstrap"
import "./Login.scss"

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login, error, setAccessToken, setToken, setError } = useAuth();

  const { replace } = useHistory();

  const onChange = (e) => {
    setCredentials((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const doLogin = (e) => {
    e.preventDefault();
    login(credentials.email, credentials.password)
      .then((response) => {
          if(response.errorMessage) {
            setError(response.errorMessage)
          } else {
            setError(null)
            setAccessToken(response.access_token);
            setToken(response.access_token);
            replace("/");
          }
      })
  };

  const location = useLocation()

  useEffect(() => {
    setError(null)
  }, [location, setError])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={8} lg={6} xxl={4}>
          <div className="Login">
            <h1>Inicia sesión</h1>
            <Form  onSubmit={doLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                name="email"
                value={credentials.email}
                onChange={onChange} 
                type="email" 
                placeholder="Enter email" />
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
              {error && <Alert variant="danger">{error}</Alert>}
              <Button variant="primary" type="submit">
                Iniciar Sesión
              </Button>
            </Form>
            <br />
            <Link to="/register">¿Todavía no tienes cuenta? <br/> ¡Regístrate!</Link>
        </div>
      </Col>
    </Row>
  </Container>
  );
}
