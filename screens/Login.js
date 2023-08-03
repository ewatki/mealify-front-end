import React from 'react'
import { View, Text } from 'react-native';

function Login() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
        </View>
    );
    // return (
    //     <View>
    //         <View>
    //             <Text>LOGIN</Text>

    //             <Text>Email Address</Text>

    //             <TextInput value={email} onChangeText={text => setEmail(text)} textContentType="username" autoCompleteType="email" style={inputs(appSettings).textInput} placeholder='Email'/>

    //             <Text>Password</Text>

    //             <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry={securePassword} textContentType="password" autoCompleteType="password" style={inputs(appSettings).textInput} placeholder='Password'/>

    //             {/* <TouchableOpacity onPress={() => handleLogin()}> */}

    //             <Text>Login</Text>

    //             {/* </TouchableOpacity> */}
    //         </View>
    //     </View>
    // )
}

export default Login;