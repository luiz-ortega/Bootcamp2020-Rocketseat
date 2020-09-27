import React from 'react';
import {Button, View, Text} from 'react-native';
import { useAuth } from '../../hooks/auth'

const CreateAppointment: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex:1, justifyContent: 'center' }}>
      <Text style={{ color: "#fff" }}>CreateAppointment</Text>
    </View>
  )
};

export default CreateAppointment;
