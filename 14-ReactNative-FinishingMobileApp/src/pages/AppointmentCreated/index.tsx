import React from 'react';
import {Button, View, Text} from 'react-native';
import { useAuth } from '../../hooks/auth'

const AppointmentCreated: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex:1, justifyContent: 'center' }}>
      <Text style={{ color: "#fff" }}>AppointmentCreated</Text>
    </View>
  )
};

export default AppointmentCreated;
