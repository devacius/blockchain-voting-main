import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import { VotingProvider } from "./context/VotingContext";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import history from "./history";
import AddCandidate from "./components/AddCandidate";
import AddVoter from "./components/AddVoter";
import ToggleElection from "./components/ToggleElection";
import Vote from "./components/Vote";
import Result from "./components/Result";

ReactDOM.render(
  <VotingProvider>
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addCandidate" element={<AddCandidate />} />
        <Route path="/applyForVoter" element={<AddVoter />} />
        {/* <Route path="/toggle" element={<ToggleElection />} /> */}
        <Route path="/vote" element={<Vote />} />
        <Route path="/result" element={<Result />} />
        {/* 
      <Route  path='/candidateDetails' element={} />
      <Route  path='/verifyVoter' element={} />
      <Route  path='/admin' element={} /> */}
      </Routes>
    </BrowserRouter>
  </VotingProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
