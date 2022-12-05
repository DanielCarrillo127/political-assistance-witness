import React, { useState } from "react";


export const DataContext = React.createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [Handleonclick, setHDL] = useState("home");

   
  const saveUser = async (token, info) => {
    window.localStorage.setItem("TOKEN", token);
    window.sessionStorage.setItem("USER", JSON.stringify(info));
    setUser(info);
  };

  const saveHdl = async (hdl) => {
    if (hdl !== undefined){
      setHDL(hdl)
      window.sessionStorage.setItem("VIEW", JSON.stringify(hdl));
    }else{
      const viewPageSS = window.sessionStorage.getItem("VIEW");
      if (viewPageSS !== null){
        setHDL(JSON.parse(viewPageSS))
      }else{
        setHDL('home')
      } 
    }
  };



  const handelSession = async () => {
    const jsonSessionStorage = window.sessionStorage.getItem("USER");
    if (jsonSessionStorage !== undefined) {
      setUser(JSON.parse(jsonSessionStorage));
    }
    saveHdl()
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
        handelSession,
        saveHdl,
        Handleonclick
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
