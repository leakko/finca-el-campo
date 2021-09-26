import React from 'react';
import Login from '../Login/Login';
import MyNavbar from '../MyNavbar/MyNavbar';
import { Container } from 'react-bootstrap';
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div className="HomePage">
            <MyNavbar />
            <Container>
                <Login />
            </Container>
        </div>
    );
};

export default HomePage;