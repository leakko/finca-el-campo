import React from 'react';
import { Link } from "react-router-dom"
import { Button, Container } from "react-bootstrap"
import awardsOne from "../../Assets/awards1.png"
import awardsTwo from "../../Assets/awards2.png"
import interiores from "../../Assets/interiores.jpg"
import exteriores from "../../Assets/exteriores.jpg"
import bodegon from "../../Assets/bodegon.jpg"
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div className="HomePage">
            <div className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <div style={{backgroundImage: `url(${exteriores})`}} className=" carousel-img d-block w-100" alt="" />
                    <div className="carousel-caption d-none d-md-block">
                        <h2>Gran finca con vistas a la bahía</h2>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <div style={{backgroundImage: `url(${interiores})`}} className=" carousel-img d-block w-100" alt="" />
                    <div className="carousel-caption d-none d-md-block">
                        <h2>Interiores espectaculares</h2>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <div style={{backgroundImage: `url(${bodegon})`}} className=" carousel-img d-block w-100" alt="" />
                    <div className="carousel-caption d-none d-md-block">
                        <h2>Contrata nuestros servicios extra</h2>
                    </div>
                    </div>
                </div>
            </div>
            <div className="goToCalendar">
                <Link to="/calendar"><Button variant="light">RESERVA FECHA</Button></Link>
            </div>
            <Container>
                <div className="awards">
                    <h2>Una de las fincas más premiadas de Bodas.net</h2>
                    <img alt="" src={awardsOne} />
                    <img alt="" src={awardsTwo} />
                </div>
            </Container>
        </div>
    );
};

export default HomePage;