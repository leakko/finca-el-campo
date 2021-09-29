import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect} from "react";
import { Button, Alert } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { getCelebrations, createCelebration } from "../../services/CelebrationsService"
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyCalendar.scss"

const locales = {
    "es": require("date-fns/locale/es"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const MyCalendar = () => {
    const { user } = useAuth();

    const [newEvent, setNewEvent] = useState({
        title: "Ocupado",
        allDay: true,
        start: "",
        end: ""
    });
    const [allEvents, setAllEvents] = useState();
    const [error, setError] = useState(undefined);

    function handleAddEvent() {
        createCelebration({date: newEvent.start, client: user? user._id : undefined}).
        then((response) => {
            if(response.errorMessage) {
                setError(response.errorMessage)
            } else {
                setNewEvent({
                    title: "Ocupado",
                    allDay: true,
                    start: "",
                    end: ""
                })
            }
        })  
    }

    useEffect(() => {
        getCelebrations()
        .then((celebrations) => {
            const mappedCelebrations = celebrations.map((celebration) => {
                return ({
                    title: "Ocupado",
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
            <h2>Add New Event</h2>
            <div>
                <DatePicker placeholderText="Selecciona tu fecha" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(date) => setNewEvent({ ...newEvent, start: date, end: date })} />
                <Button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Reservar
                </Button>
                {error && <Alert variant="danger">{error}</Alert>}
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" views={{ month: true}} style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default MyCalendar;