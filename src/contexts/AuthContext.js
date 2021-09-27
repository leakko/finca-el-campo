import React, { useEffect, useState } from "react";
import { login } from "../services/AuthService";
import { getCurrentUser } from "../services/UserService";
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
          })
          .catch(() => {
            // if NOK, delete token from state AND storage
            deleteAccessToken();
            setToken(undefined);
          });
      }
    } else {
      setUser(undefined);
    }

    // if no token
    // delete user
  }, [token, user]);

  const loginFn = (email, password) => {
    return login(email, password)
  };

  const logout = () => {
    deleteAccessToken();
    setToken(undefined);
    setUser(undefined);
  }

  const value = { user: user, token: token, login: loginFn, logout, error: error, setError: setError, setAccessToken: setAccessToken, setToken: setToken };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}