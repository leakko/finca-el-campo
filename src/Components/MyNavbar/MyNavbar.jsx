import React from 'react';
import { Nav, Navbar, Container, Button } from "react-bootstrap"
import { Link,  NavLink, useHistory } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import "./MyNavbar.scss";
import mainLogo from "../../Assets/logo192.png"


const MyNavbar = () => {
    const { user, logout } = useAuth();
    const history = useHistory()

    const logoutFn = () => {
        logout()
        history.push("/")
    }

    return (
        <Navbar className="Navbar" bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <img src={mainLogo} alt="Logo de finca el campo" width="50px" style={{borderRadius: "50%"}}/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {user ?
                        <Nav className="me-auto">
                            <NavLink className="nav-link" exact to="/">
                                Home
                            </NavLink>
                            <NavLink className="nav-link" to="/myprofile">
                                Mi perfil
                            </NavLink>
                            <Button onClick={() => logoutFn()} variant="danger">Cierra sesión</Button>
                        </Nav>
                        :
                        <Nav className="me-auto">
                            <NavLink className="nav-link" exact to="/">
                                Home
                            </NavLink>
                            <NavLink className="nav-link" to="/login">
                                Inicia Sesión
                            </NavLink>
                            <NavLink className="nav-link" to="/register">
                                Regístrate
                            </NavLink>
                        </Nav>
                    } 
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;