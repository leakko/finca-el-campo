import React, { useEffect, useState } from "react";
import { login } from "../services/AuthService";
import { getCurrentUser } from "../services/UserService";
import { getUserCelebrations } from "../services/CelebrationsService"
import {
  deleteAccessToken,
  getAccessToken,
  setAccessToken,
} from "../store/AccessTokenStore";

export const AuthContext = React.createContext({
  user: undefined,
  token: undefined,
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(getAccessToken());
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [userCelebrations, setUserCelebrations] = useState()

  useEffect(() => {
    // if there's a token
    if (token) {
      // if there's not an user
      if (!user) {
        // GET user
        getCurrentUser()
          // if OK, setUser
          .then((user) => {
            setError(null)
            setUser(user)
            getUserCelebrations(user._id)
              .then((userCelebrations) => {
              setUserCelebrations(userCelebrations)
            })
          })
          .catch(() => {
            // if NOK, delete token from state AND storage
            deleteAccessToken();
            setToken(undefined);
          });
      }
    // if no token
    // delete user
    } else {
      setUser(undefined);
      setUserCelebrations(undefined)
    }
  }, [token, user]);

  const loginFn = (email, password) => {
    return login(email, password)
  };

  const logout = () => {
    deleteAccessToken();
    setToken(undefined);
    setUser(undefined);
    setUserCelebrations(undefined)
  }

  const value = { user, setUser, token, login: loginFn, logout, error, setError, setAccessToken, setToken, userCelebrations };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}