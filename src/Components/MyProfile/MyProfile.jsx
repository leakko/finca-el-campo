import { useAuth } from "../../hooks/useAuth";
import { getAccessToken } from '../../store/AccessTokenStore';
import { dateParser } from "../../variousFunctions/parseDate";
import celebrationImg from "../../Assets/celebration.jpg"
import { Card, Button } from "react-bootstrap";
import "./MyProfile.scss"

const MyProfile = () => {
    const { setUser, user, userCelebrations } = useAuth()
    const token = getAccessToken();


    if(!token) {
        setUser(undefined)
    }


    return (
        <div className="MyProfile">
            {user ?
            <>
                <h1>Tus datos</h1>
                <div>
                    <h2>Correo</h2>
                    <p>{user.email}</p>
                    {user.fullName ?
                        <>
                            <h2>Full name</h2>
                            <p>{user.fullName}</p>
                        </> :
                        <>
                        </>
                    }
                    {user.DNI ?
                        <>
                            <h2>DNI</h2>
                            <p>{user.DNI}</p>
                        </> :
                        <>
                        </>
                    }
                    {user.phone ?
                        <>
                            <h2>Número de Teléfono</h2>
                            <p>{user.phone}</p>
                        </> :
                        <>
                        </>
                    }
                </div>
                <div className="celebrations d-flex flex-column align-items-center container">
                    <div className="row">
                        <h1 className="title">Tus celebraciones</h1>
                            {userCelebrations && userCelebrations.length > 0 ? 
                                userCelebrations.map((celebration) => {
                                    let newDate = new Date(celebration.date)
                                    return (
                                        <div key={celebration._id} className="col">
                                            <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={celebrationImg} />
                                            <Card.Body>
                                                <Card.Title>{dateParser(newDate)}</Card.Title>
                                                <Card.Text>
                                                    Esta es la fecha de la celebración que tienes reservada con nosotros
                                                </Card.Text>
                                                <Button variant="primary">Ver detalles</Button>
                                            </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                }) :
                                <p>No tienes celebraciones todavía</p>
                            }
                    </div>
                </div>
            </> :
                <h2>Inicia sesión para acceder a tu perfil</h2>
            }
            
            <p className="copyright" style={{fontSize: "0.8rem"}}><a href='https://www.freepik.es/vectores/banner'>Vector de Banner creado por pch.vector - www.freepik.es</a></p>
        </div>
    );
};

export default MyProfile;