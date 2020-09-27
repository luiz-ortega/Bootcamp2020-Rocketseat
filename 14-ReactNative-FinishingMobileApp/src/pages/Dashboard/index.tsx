import React, { useCallback } from 'react';
import { Container, Header, HeaderTitle, UserName,ProfileButton,UserAvatar  } from './styles'
import { useAuth } from '../../hooks/auth'
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation()

  const navigationProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

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
      {/* <Button onPress={signOut}>LOGOUT</Button> */}
    </Container>
  )
};

export default Dashboard;
