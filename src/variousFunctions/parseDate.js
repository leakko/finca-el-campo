export const dateParser = (date, returnDay = true) => {
    let day = date.getDay()
    let parsedDay = ""
    switch (day) {
        case 0:
            parsedDay = "Lunes";
            break;
        case 1:
            parsedDay = "Martes";
            break;
        case 2:
            parsedDay = "Miércoles";
            break;
        case 3:
            parsedDay = "Jueves";
            break;
        case 4:
            parsedDay = "Viernes";
            break;
        case 5:
            parsedDay = "Sábado";
            break;
        case 6:
            parsedDay = "Domingo";
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