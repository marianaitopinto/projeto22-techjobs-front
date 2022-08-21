import styled from "styled-components";
import { useContext } from "react";

import UserContext from "../contexts/UserContext";

import JobsCandidatePage from "./JobsCandidatePage";
import JobsCompanyPage from "./JobsCompanyPage";

export default function Jobs() {
  const { user } = useContext(UserContext);

  return user.user.type === 1 ? <JobsCandidatePage /> : <JobsCompanyPage />;
}

const Loading = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 20px;
    padding: 15px;
  }
`;

const Content = styled.div`
  width: 375px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 22px;

  main {
    margin-bottom: 88px;
  }

  h1 {
    font-size: 25px;
    font-weight: 700;

    color: #4f4f4f;
    padding: 5px;
    margin-left: 15px;
    margin-top: 40px;
  }

  h2 {
    color: #2d7aef;
    padding: 5px;
    margin-left: 15px;
  }

  div {
    margin-left: 15px;
    margin-top: 10px;
    font-size: 16px;
    padding: 5px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.165px;
    color: #4f4f4f;
    opacity: 0.9;
    padding: 5px;
    margin-left: 15px;
  }

  button {
    width: 200px;
    height: 45px;

    background: #333333;
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

    margin-left: 15px;
  }

  button:disabled {
    background: #4f4f4f;
  }

  .icon {
    width: 24px;
    height: 24px;
    opacity: 0.6;
    position: absolute;
    margin-top: 5px;
  }
`;
