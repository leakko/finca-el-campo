import React, { useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useHistory} from "react-router-dom";
import { getAccessToken } from '../../store/AccessTokenStore';

const MyProfile = () => {
    const { replace } = useHistory();
    const { setUser, user } = useAuth()
    const token = getAccessToken();

    if(!token) {
        setUser(undefined)
    }

    useEffect(() => {
        if(!user) {
            replace("/")
        }
    }, [user, replace])

    const userProfile = () => {
        if(user) {
            return <h1>{user.email}</h1>
        } else {
            return <h1>Inicia sesión para acceder a tu perfil</h1>
        }
    } 

    return (
        <div className="MyProfile">
            {userProfile()}
        </div>
    );
};

export default MyProfile;