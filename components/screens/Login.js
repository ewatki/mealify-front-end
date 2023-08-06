import React, { useContext, createContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Register from './Register';

const Login = ({ route, navigation }) => {

    const [formFields, setFormFields ] = React.useState({
        username: 'curry',
        password: 'texturry',
        pantry: ["ground beef", "cabbage", "green onion", "eggs"],
        saveRecipes: ["cereal, fishsteak, eggplant curry"],
        preferences: ["carnivore"]

    });

    const UserContext = createContext(formFields);
    const user = useContext(UserContext)  

    // Verify user input fn - if either inputs aren't a match, show an alert of invalid login
    const handleUserLogin = () => {
        // axios.post('http://127.0.0.1:8000/user_api/login/')
        // .then(resp => {
        // If inputs are valid and if username and password matches database, login user and pass their object down
        // })

        // Pass down user object
        navigation.navigate('Main', {user: user})
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
                    onPress={ handleUserLogin } 
                    />
                </View>
                <View>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={ () => navigation.navigate(Register) }> 
                        <Text>Register</Text>
                    </TouchableOpacity>
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
