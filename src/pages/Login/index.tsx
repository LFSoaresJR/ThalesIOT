import React, { useCallback } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Container, Panel } from './styles';

import ThalesLogo from '../../assets/logo.png';

const Login: React.FC = () => {
  const history = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      history('/dashboard');
    },
    [history],
  );

  return (
    <>
      <Container>
        <div id="logo">
          <img src={ThalesLogo} alt="Thales" />
        </div>
        <Panel>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Usuário" />
            <input type="password" placeholder="Senha" />
            <button type="submit">
              Entrar
              <FiChevronRight size={20} />
            </button>
          </form>
        </Panel>
      </Container>
    </>
  );
};

export default Login;
