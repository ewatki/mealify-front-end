import React from 'react'
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CustomDrawer = (props) => {
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView 
            {...props} 
            contentContainerStyle={{backgroundColor: 'white'}}
            >
                <Image 
                source={{uri: 'https://media.istockphoto.com/id/1086823472/vector/shelves-graphic-seamless-pattern-black-white-background-sketch-illustration-vector.jpg?s=612x612&w=0&k=20&c=aTxqLcvHvqmwIqmKEStqLSQ4eTD4J0ByWRfAyl3VC80='}}
                style={{padding: 20, marginTop: -5, marginBottom: 10, height: 180}}
                />

                <DrawerItemList {...props} />

            </DrawerContentScrollView>
            <View style={{padding:20, borderTopWidth:1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() =>{}} style={{paddingVertical:10}}>
                    <Text style={{fontFamily: 'Roboto-Medium', fontSize: 15, marginLeft: 5}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer;