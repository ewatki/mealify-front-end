import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Pantry from './Pantry';
import Preferences from './Preferences';

const Dashboard = ({ route, navigation }) => {
  return (
    <SafeAreaView>
      
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
export default Dashboard;