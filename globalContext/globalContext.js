import React, { useState, useEffect, useRef, createContext} from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext()

const Provider = ( { children } ) => {


const [ domain, setDomain ] = useState("http://127.0.0.1:8000")
const [ isLoggedIn, setIsLoggedIn ] = useState(false)
const [ userObj, setUserObj ] = useState()
const [ appSettings, setAppSettings ] = useState({})

// const setToken = async (token) => {
//     await SecureStore.setItemAsync('token', token);
//   };  

const setToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDEyODk5LCJpYXQiOjE2OTExNTM2OTksImp0aSI6Ijg0Zjg0NzZjYmMzNzRmYzJhZmFmNDkzNTY5OTY1NGRlIiwidXNlcl9pZCI6MTJ9.3ArXFOndEflUrwdAmIMFhd5U-yAJF7qoxZg6VxjKFxU"

  

  function initAppSettings() {
    fetch(`${domain}/api/app/settings`, {
      method: 'GET'
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.json()
        }
      })
      .then(json => {
        console.log(json)
        setAppSettings(json)
      })
      .catch(error => {
        console.log(error)
      })

  }

  useEffect(() => {
    initAppSettings()
  }, [])

  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn,
    appSettings,
    setAppSettings,
    userObj,
    setUserObj,
    setToken,
  }

return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };