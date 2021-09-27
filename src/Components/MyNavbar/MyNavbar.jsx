import React from 'react';
import { Nav, Navbar, Container } from "react-bootstrap"
import { Link,  NavLink } from "react-router-dom"
import "./MyNavbar.scss";
import mainLogo from "../../Assets/logo192.png"


const MyNavbar = () => {
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;