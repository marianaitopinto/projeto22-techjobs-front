import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";

import returnIcon from "../assets/iconreturn.png";
import API_LINK from "../data/links";

export default function JobsCompanyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const promise = axios.get(`${API_LINK}/jobs/${id}`, config);
    promise.then((res) => {
      setJob(res.data);
      setLoading(false);
    });
    promise.catch(() => {
      alert("Não foi possível carregar.");
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const promise = axios.get(`${API_LINK}/application/company/${id}`, config);
    promise.then((res) => {
      setCandidates(res.data);
      setLoading(false);
    });
    promise.catch(() => {
      alert("Não foi possível carregar.");
      setLoading(false);
    });
  }, []);
  console.log(candidates);
  return loading ? (
    <>
      <Loading>
        <p>Carregando...</p>
        <Oval color="#FFFFFF" height={80} width={80} />
      </Loading>
    </>
  ) : (
    <>
      <Content>
        <>
          <main>
            <img
              src={returnIcon}
              alt="Seta para retornar"
              className="icon"
              onClick={() => navigate(-1)}
            ></img>
            <h1>{job.jobTitle}</h1>
            <p>{job.user.name}</p>
            <div>Descrição: {job.description}</div>
            {job.status === "opened" ? (
              <div>Situação: Aceita candidaturas</div>
            ) : (
              <div>Situação: Fechada para candidaturas</div>
            )}
            <h1>Candidaturas:</h1>
            {candidates.lenght === 0 ? (
              <div>Sem candidaturas!</div>
            ) : (
              candidates.map((candidate) => {
                return (
                  <>
                    <div>{candidate.user.name}</div>
                    <div>{candidate.user.linkedin}</div>
                  </>
                );
              })
            )}
          </main>
        </>
      </Content>
    </>
  );
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
