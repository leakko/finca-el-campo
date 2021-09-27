import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../services/UserService";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap"

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const { replace } = useHistory();

  const onChange = (event) => {
    setUser((old) => {
      return { ...old, [event.target.name]: event.target.value };
    });
  };

  const doRegister = (e) => {
    e.preventDefault();

    createUser(user)
      .then((response) => {
          if(response.errorMessage) {
              setError(response.errorMessage)
          } else {
            replace("/login");
          }
      })
  };

  return (
    <Container style={{marginTop: "25px"}}>
        <Row className="justify-content-center">
            <Col sm={8} lg={6} xxl={4}>
                <div className="Register">
                <h1>Regístrate</h1>
                <Form onSubmit={doRegister}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    name="email"
                    value={user.email}
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
                    value={user.password}
                    onChange={onChange} 
                    />
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button variant="primary" type="submit">
                    Registrate
                    </Button>
                </Form>
            </div>
            </Col>
        </Row>
    </Container>
  );
}