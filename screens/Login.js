import React, { useContext, createContext  } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


let users = [
    {
        id: 1,
        username: "walla12",
        password: "testwalla",
        pantry: ["oranges", "apples", "spinach", "eggs"],
        savedRecipes: ["fruit salad"],
        preferences: ["vegetarian"]
    },
    {
        id: 2,
        username: "janet4",
        password: "testjanet",
        pantry: ["pineapple", "chicken", "iceburg", "onion"],
        savedRecipes: ["chicken pineapple kabobs"],
        preferences: []

    },
    {
        id: 3,
        username: "curry",
        password: "testurry",
        pantry: ["ground beef", "cabbage", "green onion", "eggs"],
        saveRecipes: [],
        preferences: ["carnivore"]
    }
];


const Login = ({ navigation }) => {
    readableUser = JSON.stringify(users[1])
    console.log(readableUser)

    const { setUser } = useContext(UserContext);

    // Verify user input fn - if either inputs aren't a match, show an alert of invalid login
    const handleUserLogin = () => {
        const user = useContext(readableUser)    
        navigation.navigate('Main', {user: user})

        // axios.post('http://127.0.0.1:8000/user_api/login/')
        // .then(resp => {
        //     // If inputs are valid and if username and password matches database, login user and pass their object down
        //     navigation.navigate('Main', {user: users[1]})
        // })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.centeredView}>
                <View>
                    <Text>Username : </Text>
                    <TextInput 
                        value={formFields.username} 
                        onChangeText={text => setFormFields.username(text)} textContentType="username" autoCompleteType="username" 
                        style={styles.textbox}
                    />   

                    <Text>Password :</Text>
                    <TextInput 
                        value={formFields.password} 
                        onChangeText={text => setFormFields.password(text)} textContentType="password"
                        style={styles.textbox}
                    />   
                    <Button 
                    title="Login" 
                    onPress= { handleUserLogin } 
                    />
                </View>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }
    });
