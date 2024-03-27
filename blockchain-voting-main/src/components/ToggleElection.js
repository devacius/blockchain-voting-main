import React, { useContext, useState, useEffect } from "react";
import TempContract from "../truffle_abis/TempContract.json";
import Web3 from "web3";
import Base from "./Base";
import Button from "@mui/material/Button";

import { VotingContext } from "../context/VotingContext";

const ToggleElection = () => {
  const [contractInstance, setContractInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [started, setStarted] = useState(null);

  //   const { ll } = useContext(VotingContext);
  //   const [loading, setLoading] = ll;
  //   const { status } = useContext(VotingContext);
  //   const [started, setStarted] = status;

  const getData = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TempContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TempContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContractInstance(instance);
      setAccount(accounts[0]);
      setWeb3(web3);
    } catch (error) {
      console.log("Failed to load web3, accounts, or contract.");
      console.log("Get Data error: ", error);
    } finally {
      console.log("Loaded all data");
    }
  };

  const getInfo = async () => {
    if (contractInstance && account) {
      const owner = await contractInstance.methods.getOwner().call();
      if (account === owner) {
        setIsOwner(true);
      }
      const electionStatus = await contractInstance.methods.getStart().call();
      console.log(
        "🚀 ~ file: ToggleElection.js ~ line 49 ~ getInfo ~ electionStatus ",
        electionStatus
      );
      setStarted(electionStatus);
    }
  };

  useEffect(() => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getInfo();
  }, [contractInstance, account]);

  const onSubmit = async () => {
    if (started) {
      const start = await contractInstance.methods.startElection().call();
      console.log(
        "🚀 ~ file: ToggleElection.js ~ line 75 ~ onSubmit ~ start",
        start
      );
    } else {
      const end = await contractInstance.methods.endElection().call();
      console.log(
        "🚀 ~ file: ToggleElection.js ~ line 79 ~ onSubmit ~ end",
        end
      );
    }
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: ToggleElection.js ~ line 84 ~ useEffect ~ started",
      started
    );
  }, [started]);

  return (
    <div>
      <div>
        {!web3 ? (
          <div>
            {" "}
            <h1>Loading web3, accounts and contracts</h1>{" "}
          </div>
        ) : (
          <div>
            <Base isOwner /> <br />
            {isOwner ? (
              <div>
                <Button variant="contained" onClick={onSubmit}>
                  Start/Stop Election
                  {started ? "1" : "0"}
                </Button>
              </div>
            ) : (
              <h1>Only the owner is authorized to use this section </h1>
            )}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default ToggleElection;
