import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="repository">
          <img
            src="https://avatars1.githubusercontent.com/u/31256653?s=460&u=4f439431fc5e3b9d9603b3fbd8651748710d9eb5&v=4"
            alt="Luiz Ortega"
          />
          <div>
            <strong>VueJs</strong>
            <p>Javascripr framework!</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="repository">
          <img
            src="https://avatars1.githubusercontent.com/u/31256653?s=460&u=4f439431fc5e3b9d9603b3fbd8651748710d9eb5&v=4"
            alt="Luiz Ortega"
          />
          <div>
            <strong>VueJs</strong>
            <p>Javascripr framework!</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="repository">
          <img
            src="https://avatars1.githubusercontent.com/u/31256653?s=460&u=4f439431fc5e3b9d9603b3fbd8651748710d9eb5&v=4"
            alt="Luiz Ortega"
          />
          <div>
            <strong>VueJs</strong>
            <p>Javascripr framework!</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
