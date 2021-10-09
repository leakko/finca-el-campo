import { useHistory } from "react-router-dom";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect} from "react";
import { Button, Alert } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import { getCelebrations } from "../../services/CelebrationsService"
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyCalendar.scss"
import { dateParser } from "../../variousFunctions/parseDate";

const locales = {
    "es": require("date-fns/locale/es")
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const MyCalendar = () => {
    let history = useHistory();
    const { paymentStatus } = useAuth();

    const [newEvent, setNewEvent] = useState({
        title: "Ocupado",
        allDay: true,
        start: "",
        end: ""
    });
    const [allEvents, setAllEvents] = useState();
    const [error, setError] = useState(undefined);

    function handleAddEvent() {

        let now = new Date()
        let celebration
        let newCelebration = new Date(newEvent.start)
        let parsedNewCelebration = dateParser(newCelebration)
        if(allEvents.some((event) => {
            celebration = new Date(event.start)
            return dateParser(celebration) === parsedNewCelebration
        })) {
            setError("Fecha ocupada, seleccione otra")
        }  else if (
            newCelebration <= now.getTime() //Not accepting events in the past
        ) {
            setError("Selecciona una fecha posterior a hoy")
        } else if (
            newCelebration <= now.getTime() + (15*24*60*60*1000) //Not accepting new events closer than 15 days
        ) {
            setError("Es una fecha demasiado temprana, necesitamos al menos 15 días para preparar todo")
        } else if (newEvent.start === "") {
            setError("Selecciona una fecha")
        } else {
            setError(null)
            history.push(`/payment/${newEvent.start}`)
        }
    }

    useEffect(() => {
        getCelebrations()
        .then((celebrations) => {
            const mappedCelebrations = celebrations.map((celebration) => {
                return ({
                    title: " ",
                    allDay: true,
                    start: celebration.date,
                    end: celebration.date
                })
            })
            setAllEvents(mappedCelebrations)
        })
    }, [newEvent])

    return (
        <div className="MyCalendar">
            <h2 className="title-new-celebration">Selecciona tu fecha</h2>
            <div className="date-picker">
                <DatePicker className="form" placeholderText="Haz click aquí" selected={newEvent.start} onChange={(date) => setNewEvent({ ...newEvent, start: date, end: date })} />
                <Button variant="dark" stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Reservar
                </Button>
                {paymentStatus && <Alert className="successPayment" variant="success">{paymentStatus}</Alert>}
                {error && <Alert className="error" variant="danger">{error}</Alert>}
            </div>
            <div className="calendarSection">
                <h3 className="separator">{" "}</h3>
                <Button className="ocupadas" variant="light">Fechas ya ocupadas</Button>
                <Calendar className="calendar" localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" views={{ month: true}} style={{ height: 500, margin: "50px" }} />
            </div>
        </div>
    );
}

export default MyCalendar;