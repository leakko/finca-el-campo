import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Container, Row, Col } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import { pay } from '../../services/PaymentsService';
import { useAuth } from "../../hooks/useAuth";
import { createCelebration } from "../../services/CelebrationsService"

import "./Payment.scss"

const stripePromise = loadStripe("pk_test_51JhdmZJ4G0fPGPGm9lrDzwkfDaqi5JzV2C1H87uhnPsE92HPj1LGJz54elTupYegFf5GcaT94RxDcDGBiE39jLcQ009SNheAww");

const CheckoutForm = () => {

    const price = 2000;

    const dateParser = (date, returnDay = true) => {
        let day = date.getDay()
        let parsedDay = ""
        switch (day) {
            case 0:
                parsedDay = "Domingo";
                break;
            case 1:
                parsedDay = "Lunes";
                break;
            case 2:
                parsedDay = "Martes";
                break;
            case 3:
                parsedDay = "Miércoles";
                break;
            case 4:
                parsedDay = "Jueves";
                break;
            case 5:
                parsedDay = "Viernes";
                break;
            case 6:
                parsedDay = "Sábado";
                break;
            default:
                break;
        }
    
        let monthDay = date.getDate()
    
        let month = date.getMonth()
        let parsedMonth = ""
        switch (month) {
            case 0:
                parsedMonth = "Enero";
                break;
            case 1:
                parsedMonth = "Febrero";
                break;
            case 2:
                parsedMonth = "Marzo";
                break;
            case 3:
                parsedMonth = "Abril";
                break;
            case 4:
                parsedMonth = "Mayo";
                break;
            case 5:
                parsedMonth = "Junio";
                break;
            case 6:
                parsedMonth = "Julio";
                break;
            case 7:
                parsedMonth = "Agosto";
                break;
            case 8:
                parsedMonth = "Septiembre";
                break;
            case 9:
                parsedMonth = "Octubre";
                break;
            case 10:
                parsedMonth = "Noviembre";
                break;
            case 11:
                parsedMonth = "Diciembre";
                break;
            default:
                break;
        }
    
        let year = date.getFullYear();
    
        let parsedDate = `${returnDay ? parsedDay : ""} ${monthDay} de ${parsedMonth} de ${year}`
    
        return parsedDate
    
    }

    let { date } = useParams();
    let history = useHistory();
    const dateObj = new Date(date)

    const { setPaymentStatus, user } = useAuth()

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = (e) => {
        e.preventDefault();

        createCelebration({date: dateObj, client: user? user._id : undefined})
        .then((response) => {
            if(response.errorMessage) {
                setPaymentStatus(response.errorMessage)
                history.push("/calendar")
            } else {
                return stripe.createPaymentMethod({ type: "card", card: elements.getElement(CardElement) })
                .then((response) => {
                    if(response.paymentMethod) {
                        const { id } = response.paymentMethod;
        
                        return pay(id, price*100)
                        .then((response) => {
                            if(response.message) {
                                setPaymentStatus("¡Ya has reservado tu fecha. Ve a tu perfil y actualiza para verla!")
                                history.push("/calendar")
                            } if (response.errorMessage) {
                                setPaymentStatus("Hubo un problema con el pago, contacte con la empresa")
                                history.push("/calendar")
                            }
                        })
                    } else {
                        console.log(response.errorMessage)
                    }
                })
            }
        })
    }

    return (
        <form className="cardInput card card-body" onSubmit={handleSubmit}>
            <h5>Tu fecha</h5>
            <p>{dateParser(dateObj)}</p>
            <h5 className="mt-3">Introduce tu tarjeta</h5>
            <CardElement className="form-control"/>
            <p className="warning">
                No guardaremos estos datos.
            </p>
            <h5 className="mt-3">Importe</h5>
                <p>{`${price}€`}</p>
            <Button type="Submit" variant="success">
                Pagar
            </Button>
        </form>
    )
}

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <Container className="p-4 Payment">
                <Row className="justify-content-center">
                    <Col xs={10} lg={4}>
                        <CheckoutForm />
                    </Col>
                </Row>
            </Container>
        </Elements>
    );
};

export default Payment;