import React from 'react';
import { useAuth } from "../../hooks/useAuth";
import { getAccessToken } from '../../store/AccessTokenStore';

const MyProfile = () => {

    const { setUser, user } = useAuth()
    const token = getAccessToken();

    if(!token) {
        setUser(undefined)
    }

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