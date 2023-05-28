import React, { useState } from "react";


export const DataContext = React.createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [Handleonclick, setHDL] = useState("home");
  const [levelRestrictions, setLevelRestrictions] = useState(0)

  //role system (disable) 
  //candidate and admin use everything coor+estadisticas
  //coordinator Home,Table,Event,Comunication,Witness
  //leader Home,Table, Witness
  const levelSystem = (info) => {
    console.log(info.role)
    if (info.role === 'COORDINATOR') {
      console.log('entro c')
      setLevelRestrictions(2)
    } else if (info.role === 'LEADER') {
      console.log('entro l')
      setLevelRestrictions(3)
    } else { //is admin or candidate
      setLevelRestrictions(1)
    }
    console.log(levelRestrictions)
    
    window.sessionStorage.setItem("LvlRestrictions", levelRestrictions);
  }

  const saveUser = async (token, info) => {
    window.localStorage.setItem("TOKEN", token);
    window.sessionStorage.setItem("USER", JSON.stringify(info));
    setUser(info);
    levelSystem(info);
  };

  const saveHdl = async (hdl) => {
    if (hdl !== undefined) {
      setHDL(hdl)
      window.sessionStorage.setItem("VIEW", JSON.stringify(hdl));
    } else {
      const viewPageSS = window.sessionStorage.getItem("VIEW");
      if (viewPageSS !== null) {
        setHDL(JSON.parse(viewPageSS))
      } else {
        setHDL('home')
      }
    }
  };

  const handelSession = async () => {
    const jsonSessionStorage = window.sessionStorage.getItem("USER");
    if (jsonSessionStorage !== undefined) {
      setUser(JSON.parse(jsonSessionStorage));
    }
    const lvlSessionStorage = window.sessionStorage.getItem("LvlRestrictions");
    if (lvlSessionStorage !== undefined) {
      setLevelRestrictions(JSON.parse(lvlSessionStorage));
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
        levelRestrictions,
        Handleonclick
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
