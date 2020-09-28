import React, { useCallback, useEffect, useState } from 'react';
import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList} from './styles'
import { useAuth } from '../../hooks/auth'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      console.log(response)
      setProviders(response.data)
    });
  }, []);

  const navigationProfile = useCallback(() => {
    // navigate('Profile')
    signOut()
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigationProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>

      </Header>
      <ProvidersList>

      </ProvidersList>
    </Container>
  )
};

export default Dashboard;
