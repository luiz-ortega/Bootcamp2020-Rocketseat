import React from 'react';

import { FiPower } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile } from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img
              src="https://avatars1.githubusercontent.com/u/31256653?s=460&u=4f439431fc5e3b9d9603b3fbd8651748710d9eb5&v=4"
              alt="Luiz Ortega"
            />
            <div>
              <span>Bem-vindo,</span>
              <strong>Luiz Ortega</strong>
            </div>
          </Profile>

          <button onClick={() => signOut()} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
