import { useState } from "react";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import RegisterContext from "../contexts/RegisterContext";
import UserContext from "../contexts/UserContext";

import { registerStructure, userStructure } from "../data/stateStructures";

function App() {
  const [register, setRegister] = useState({ ...registerStructure });

  const [user, setUser] = useState({ ...userStructure });

  return (
    <>
      <Reset />
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <RegisterContext.Provider value={{ register, setRegister }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </RegisterContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
