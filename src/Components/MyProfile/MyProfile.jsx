import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useHistory} from "react-router-dom";
import { getAccessToken } from '../../store/AccessTokenStore';
import { getUserCelebrations } from "../../services/CelebrationsService"

const MyProfile = () => {
    const { replace } = useHistory();
    const { setUser, user } = useAuth()
    const token = getAccessToken();

    const [userCelebrations, setUserCelebrations] = useState([])


    if(!token) {
        setUser(undefined)
    }

    useEffect(() => {
        if(!user) {
            replace("/")
        }
    }, [user, replace])

    useEffect(() => {
        getUserCelebrations(user._id)
        .then((userCelebrations) => {
            setUserCelebrations(userCelebrations)
        })
    }, [user])

    const userProfile = () => {
        if(user) {
            return (
                <>
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
                </>
            )
        } else {
            return <h1>Inicia sesión para acceder a tu perfil</h1>
        }
    } 

    return (
        <div className="MyProfile">
            <h1>Tus datos</h1>
            {userProfile()}
            <h1>Tus celebraciones</h1>
            {userCelebrations ? 
                userCelebrations.map((celebration) => {
                    return (
                        <p>{celebration.date}</p>
                    )
                }) :
                <p>No tienes celebraciones todavía</p>
            }
        </div>
    );
};

export default MyProfile;