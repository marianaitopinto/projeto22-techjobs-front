import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import RegisterContext from "../contexts/RegisterContext";

import logo from "../assets/logo2.png";

import API_LINK from "./../data/links";

function SignUp() {
  const { register, setRegister } = useContext(RegisterContext);

  const navigate = useNavigate();

  function toRegister(event) {
    event.preventDefault();

    if (register.password !== register.confirmationPassword) {
      alert("As senhas devem ser iguais");
      return;
    }

    delete register.confirmationPassword;
    console.log(register);

    const promise = axios.post(`${API_LINK}/sign-up`, register);

    promise.then((response) => {
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    });

    promise.catch((error) => {
      const { status, data } = error.response;

      alert(`Não foi possível realizar o cadastro.
        Erro ${status}: ${data} `);
    });
  }

  return (
    <Content>
      <Link to="/">
        <Logo src={logo} alt="logo techjobs" />
      </Link>
      <RegisterSpan> Cadastre-se: </RegisterSpan>
      <RegisterForm onSubmit={toRegister}>
        <input
          type="text"
          placeholder="Nome"
          required
          value={register.name}
          onChange={(event) =>
            setRegister({ ...register, name: event.target.value })
          }
        ></input>

        <input
          type="e-mail"
          placeholder="E-mail"
          required
          value={register.email}
          onChange={(event) =>
            setRegister({ ...register, email: event.target.value })
          }
        ></input>

        <input
          type="password"
          placeholder="Senha"
          minLength="8"
          required
          value={register.password}
          onChange={(event) =>
            setRegister({ ...register, password: event.target.value })
          }
        ></input>

        <input
          type="password"
          placeholder="Confirme sua senha"
          minLength="8"
          required
          value={register.confirmationPassword}
          onChange={(event) =>
            setRegister({
              ...register,
              confirmationPassword: event.target.value,
            })
          }
        ></input>

        <input
          type="url"
          placeholder="LinkedIn"
          title="O link deve ter um formato de URL válido."
          required
          value={register.linkedin}
          onChange={(event) => {
            setRegister({ ...register, linkedin: event.target.value });
          }}
        ></input>

        <select
          type="number"
          placeholder="Tipo de usuário"
          required
          value={register.type}
          onChange={(event) =>
            setRegister({ ...register, type: Number(event.target.value) })
          }
        >
          <option value="" disabled selected hidden>
            Tipo de usuário
          </option>
          <option value="1">Candidato</option>
          <option value="2">Empresa</option>
        </select>
        <button type="submit">Cadastrar</button>
      </RegisterForm>
      <Link to="/">
        <LoginLink>
          Já tem uma conta? <strong>Faça Login!</strong>
        </LoginLink>
      </Link>
    </Content>
  );
}

export default SignUp;

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

const RegisterSpan = styled.span`
  font-size: 16px;
  line-height: 20px;

  color: #000000;

  margin-top: 23px;
  margin-bottom: 33px;
`;

const RegisterForm = styled.form`
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
    background-color: #ffffff;
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

    margin-top: 20px;

    margin-bottom: 25px;
  }

  select {
    width: 311px;
    height: 48px;

    border: 1px solid #000000;
    border-radius: 24px;

    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    padding-left: 16px;
    color: #000000;
    background-color: #ffffff;
  }
`;

const LoginLink = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  color: #000000;

  strong {
    font-weight: 700;
  }
`;
