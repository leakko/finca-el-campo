import React from 'react';
import Login from '../Login/Login';
import MyNavbar from '../MyNavbar/MyNavbar';
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div className="HomePage">
            <MyNavbar />
            <Login />
        </div>
    );
};

export default HomePage;