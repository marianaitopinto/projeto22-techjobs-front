import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

import UserContext from "../contexts/UserContext";

import logo from "../assets/logo2.png";

import API_LINK from "../data/links";

function SignIn() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function toLogin(event) {
    event.preventDefault();

    setLoading(true);

    const promise = axios.post(`${API_LINK}/sign-in`, login);

    promise.then((response) => {
      const { data } = response;

      setUser(data);
      navigate("/");
    });

    promise.catch((error) => {
      const { status, data } = error.response;
      alert(`Não foi possível realizar o login.
            Erro ${status}: ${data} `);

      setLoading(false);
    });
  }

  const loginButton = loading ? (
    <ThreeDots color="white" height={13} width={51} />
  ) : (
    "Login"
  );

  return (
    <Content>
      <Link to="/">
        <Logo src={logo} alt="logo tech jobs" />
      </Link>
      <WelcomeSpan>Seja bem vindo(a)!</WelcomeSpan>
      <LoginSpan> Faça seu login </LoginSpan>
      <LoginForm onSubmit={toLogin}>
        <input
          type="e-mail"
          placeholder="E-mail"
          required
          disabled={loading}
          value={login.email}
          onChange={(event) =>
            setLogin({ ...login, email: event.target.value })
          }
        ></input>

        <input
          type="password"
          placeholder="Senha"
          minLength="8"
          required
          disabled={loading}
          value={login.password}
          onChange={(event) =>
            setLogin({ ...login, password: event.target.value })
          }
        ></input>

        <button type="submit" disabled={loading}>
          {loginButton}
        </button>
      </LoginForm>
      <Link to="/sign-up">
        <RegisterLink>
          Não tem uma conta? <strong>Cadastre-se</strong>
        </RegisterLink>
      </Link>
    </Content>
  );
}

export default SignIn;

const Content = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 359px;
  height: 216px;
`;

const WelcomeSpan = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;

  color: #000000;

  margin-top: 20px;
`;

const LoginSpan = styled.span`
  font-size: 16px;
  line-height: 20px;

  color: #000000;

  margin-top: 23px;
  margin-bottom: 43px;
`;

const LoginForm = styled.form`
  width: min-content;

  input {
    width: 311px;
    height: 48px;

    border: 1px solid #000000;
    border-radius: 24px;

    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    color: #000000;

    padding-left: 16px;

    margin-bottom: 14px;
  }

  input:disabled {
    background-color: #dbd9d9;
  }

  input::placeholder {
    color: #000000;
  }

  button {
    width: 311px;
    height: 48px;

    background: #000000;
    border-radius: 24px;

    color: #fff;

    font-weight: 700;
    font-size: 18px;
    line-height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    margin-top: 38px;

    margin-bottom: 25px;
  }
`;

const RegisterLink = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  color: #000000;

  strong {
    font-weight: 700;
  }
`;
