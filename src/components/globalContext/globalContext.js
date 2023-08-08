// import React, { useState, useEffect, useRef, createContext} from "react";

// // import * as SecureStore from 'expo-secure-store';
// // import AsyncStorage from '@react-native-async-storage/async-storage';


// const UserContext = createContext();

// const Provider = ( { children } ) => {
//     const [users, setUsers] = useState([
//         {
//             id: 1,
//             username: "walla12",
//             password: "testwalla",
//             pantry: ["oranges", "apples", "spinach", "eggs"],
//             savedRecipes: ["fruit salad"],
//             preferences: ["vegetarian"]
//         },
//         {
//             id: 2,
//             username: "janet4",
//             password: "testjanet",
//             pantry: ["pineapple", "chicken", "iceburg", "onion"],
//             savedRecipes: ["chicken pineapple kabobs"],
//             preferences: []

//         },
//         {
//             id: 3,
//             username: "curry",
//             password: "testurry",
//             pantry: ["ground beef", "cabbage", "green onion", "eggs"],
//             saveRecipes: [],
//             preferences: ["carnivore"]
//         },
//     ]);


//     const [ isLoggedIn, setIsLoggedIn ] = useState(false)
//     const [ userObj, setUserObj ] = useState()

//     const globalContext = {
//         users,
//         setUsers,
//         isLoggedIn,
//         setIsLoggedIn,
//         userObj,
//         setUserObj,
//     }

//     return <UserContext.Provider value={globalContext}>{children}</UserContext.Provider>

// };

// export { UserContext, Provider };