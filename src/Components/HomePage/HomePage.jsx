import React from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import MyNavbar from '../MyNavbar/MyNavbar';
import { Switch, Route } from "react-router-dom"
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div className="HomePage">
            <MyNavbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>
    );
};

export default HomePage;