import React, { useState } from "react";


export const DataContext = React.createContext();
export const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  // const [Handleonclick, setHDL] = useState("home");

  const saveUser = async (token, info) => {
    window.localStorage.setItem("TOKEN", token);
    window.sessionStorage.setItem("USER", JSON.stringify(info));
    setUser(info);
  };

  const handelSession = async () => {
    const jsonSessionStorage = window.sessionStorage.getItem("USER");
    if (jsonSessionStorage !== undefined) {
      setUser(JSON.parse(jsonSessionStorage));
    }
  };

  const logOutUser = async () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser({});
  };

  return (
    <DataContext.Provider
      value={{
        user,
        saveUser,
        logOutUser,
        handelSession
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
