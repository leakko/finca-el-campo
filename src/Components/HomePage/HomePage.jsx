import React from 'react';
import { Container } from "react-bootstrap"
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div className="HomePage">
            <Container style={{marginTop: "25px"}}>
                <h1>Home</h1>
            </Container>
        </div>
    );
};

export default HomePage;