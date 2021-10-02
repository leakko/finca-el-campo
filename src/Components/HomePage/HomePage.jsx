import React from 'react';
import { Link } from "react-router-dom"
import { Container, Button } from "react-bootstrap"
import fincaImg from "../../Assets/finca.png"
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div className="HomePage">
            <Container style={{marginTop: "25px"}}>
                <img src={fincaImg} style={{marginBottom: "50px", width: "300px"}} alt="Finca El Campo placeholder"/>
                <Link to="/calendar"><Button>Reserva tu fecha</Button></Link>
            </Container>
        </div>
    );
};

export default HomePage;