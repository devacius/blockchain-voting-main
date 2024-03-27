import { Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Base from "./Base";
// import { VotingContext } from "../context/VotingContext";

const Result = () => {
  //   const { votes } = useContext(VotingContext);
  //   const [vote, setVote] = votes;

  const vote = JSON.parse(localStorage.getItem("votes"));
  console.log(
    "🚀 ~ file: Result.js ~ line 10 ~ Result ~ vote",
    vote,
    typeof vote
  );

  return (
    <div>
      <Base />
      <h1>Results</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          justifyContent: "center",
          margin: "0px 10px",
        }}
      >
        {vote.map((item) => (
          <Typography variant="h4" gutterBottom component="div">
            {item}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default Result;
