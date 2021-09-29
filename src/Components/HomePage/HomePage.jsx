import React from 'react';
import { Link } from "react-router-dom"
import { Container, Button } from "react-bootstrap"
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div className="HomePage">
            <Container style={{marginTop: "25px"}}>
                <img src="https://lh3.googleusercontent.com/proxy/kkF41WXNCrsq5LHwnGtyFINyl1ervZTV0a55d309zp4wrNXRDlCB8fRdVFMwD7PkrxSBujl6xDsoD-mWgPKaS1oG1VoEVzq8MYnH8A4SM4b--4h-9HaA" style={{marginBottom: "50px"}} />
                <Link to="/calendar"><Button>Reserva tu fecha</Button></Link>
            </Container>
        </div>
    );
};

export default HomePage;