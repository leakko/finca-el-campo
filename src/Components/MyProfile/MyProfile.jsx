import { useAuth } from "../../hooks/useAuth";
import { getAccessToken } from '../../store/AccessTokenStore';

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
                <div>
                <h1>Tus celebraciones</h1>
                    {userCelebrations ? 
                        userCelebrations.map((celebration) => {
                            return (
                                <>
                                    <p>{celebration.date}</p>
                                </>
                            )
                        }) :
                        <p>No tienes celebraciones todavía</p>
                    }
                </div>
            </> :
                <h2>Inicia sesión para acceder a tu perfil</h2>
            }
            
        </div>
    );
};

export default MyProfile;