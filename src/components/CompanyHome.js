import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";

import API_LINK from "../data/links";

export default function CompanyPage() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const promise = axios.get(`${API_LINK}/jobs/all/${user.user.id}`, config);
    promise.then((res) => {
      setLoading(false);
      setCompanyJobs(res.data);
    });
    promise.catch(() => {
      alert("Não foi possível carregar as vagas.");
      setLoading(false);
    });
  }, []);

  const openedJobs = companyJobs.filter((job) => job.status === "opened");

  return loading ? (
    <>
      <Loading>
        <p>Carregando...</p>
        <Oval color="#FFFFFF" height={80} width={80} />
      </Loading>
    </>
  ) : (
    <>
      <Container>
        <h1>Vagas em aberto</h1>
        {companyJobs.length === 0 ? (
          <div>Sua empresa não possui vagas em aberto!</div>
        ) : (
          <Jobs>
            {openedJobs.map((job) => {
              return (
                <JobContainer onClick={() => navigate(`/job/${job.id}`)}>
                  <h2>{job.jobTitle}</h2>
                  <div>{job.description}</div>
                  <button>Mais informações</button>
                </JobContainer>
              );
            })}
          </Jobs>
        )}
        <h1>Todas as vagas</h1>
        <Jobs>
          {companyJobs.map((job) => {
            return (
              <JobContainer onClick={() => navigate(`/job/${job.id}`)}>
                <h2>{job.jobTitle}</h2>
                <div>{job.description}</div>
                <button>Mais informações</button>
              </JobContainer>
            );
          })}
        </Jobs>
      </Container>
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

const Container = styled.div`
  h1 {
    padding: 10px;
    font-size: 20px;
  }

  div {
    padding: 10px;
    font-size: 15px;
  }
`;

const JobContainer = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  width: 150px;
  height: fit-content;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  padding: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  background-color: #ffffff;

  align-items: center;

  div {
    font-size: 12px;
    height: min-content;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  button {
    width: 100x;
    height: 22px;

    background: #333333;
    border-radius: 24px;

    color: #fff;

    font-weight: 700;
    font-size: 11px;
    line-height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    margin-top: 20px;

    margin-bottom: 15px;
  }
`;

const Jobs = styled.div`
  display: flex;
  height: fit-content;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-evenly;
`;
