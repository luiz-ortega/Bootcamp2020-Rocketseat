import React from 'react';
import {Button, View, Text} from 'react-native';
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex:1, justifyContent: 'center' }}>
      <Text style={{ color: "#fff" }}>Dashboard</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  )
};

export default Dashboard;
