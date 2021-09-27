import React from 'react';
import { Nav, Navbar, Container } from "react-bootstrap"
import "./MyNavbar.scss";
import mainLogo from "../../Assets/logo192.png"


const MyNavbar = () => {
    return (
        <Navbar className="Navbar" bg="dark" variant="dark" sticky="top" expand="sm">
            <Container>
                <Navbar.Brand href="#">
                    <img src={mainLogo} alt="Logo de finca el campo" width="50px" style={{borderRadius: "50%"}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Inicia Sesión</Nav.Link>
                        <Nav.Link href="/register">Regístrate</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;