import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

import logo from "../assets/logotransparente.png";
import logoutIcon from "../assets/iconlogout.svg";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user)
  function logout() {
    setUser({ token: "" });
    navigate("/");
  }

  return (
    <>
      <Container>
        <img src={logo} alt="logo" />
        <div>Olá, {user.user.name}!</div>
        <img
          src={logoutIcon}
          onClick={logout}
          alt="logout-icon"
          className="icon"
        />
      </Container>
    </>
  );
}

const Container = styled.header`
  background-color: #333333;
  height: 70px;
  width: 100vw;
  display: flex;
  align-items: center;

  justify-content: space-around;

  div {
    color: #fff;
  }

  img {
    width: 100px;
  }

  .icon {
    width: 24px;
    height: 24px;
    color: #000000;

    :hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }
`;
