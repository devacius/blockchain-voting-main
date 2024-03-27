import React, { useState, createContext } from "react";

export const VotingContext = createContext();

export const VotingProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [vote, setVote] = useState([]);
  return (
    <VotingContext.Provider
      value={{
        ll: [loading, setLoading],
        status: [started, setStarted],
        votes: [vote, setVote],
      }}
    >
      {props.children}
    </VotingContext.Provider>
  );
};
