import React, { useState, useEffect, useContext } from "react";
import TempContract from "../truffle_abis/TempContract.json";
import Web3 from "web3";
import Base from "./Base";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { VotingContext } from "../context/VotingContext";

const Vote = () => {
  const [contractInstance, setContractInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [status, setStatus] = useState(""); //show user the status of voting

  const [hasVoted, setHasVoted] = useState(false);

  const { votes } = useContext(VotingContext);
  const [vote, setVote] = votes;
  // console.log(vote);

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
    }
  };

  const getAllCandidateData = async () => {
    if (contractInstance) {
      const totalCan = await contractInstance.methods
        .getCandidateNumber()
        .call();
      let tempArr = [];
      for (let i = 0; i < totalCan; i++) {
        const canDet = await contractInstance.methods
          .getCandidateDetails(i)
          .call();
        tempArr.push(canDet);
      }
      setCandidateDetails(tempArr);
    }
  };

  const onVote = async (candidateId) => {
    let arr = vote;
    if (!arr[candidateId]) {
      arr[candidateId] = 1;
    } else {
      let prev = arr[candidateId];
      arr[candidateId] = ++prev;
    }
    setVote((prev) => arr);
    localStorage.setItem("votes", JSON.stringify(arr));
    console.log("🚀 ~ file: Vote.js ~ line 74 ~ onVote ~ arr", arr);
    setHasVoted(() => true);
    // if (contractInstance) {
    //   await contractInstance.methods.vote(+candidateId).call();
    // } else {
    //   console.log("Something went wrong");
    // }
  };

  useEffect(() => {
    console.log(vote);
  }, [vote]);

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

  useEffect(() => {
    getAllCandidateData();
  }, [contractInstance]);

  useEffect(() => {
    console.log(candidateDetails);
  }, [candidateDetails]);

  return (
    <div>
      <Base isOwner={isOwner} />
      {isOwner ? (
        <div>Owner can't vote </div>
      ) : (
        <div style={{ margin: "0px 20px" }}>
          <h1>Vote</h1>
          {candidateDetails.length > 0
            ? candidateDetails.map((item) => (
                <Card
                  sx={{ minWidth: 275 }}
                  style={{
                    textAlign: "center",
                    margin: "20px 0px",
                    backgroundColor: "whitesmoke",
                  }}
                  key={item.id}
                >
                  <CardContent>
                    {/* <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Candidate Details
                    </Typography> */}
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.party}
                    </Typography>
                    <Typography variant="body2">{item.manifesto}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ textAlign: "center", margin: "0 auto" }}
                      size="small"
                      variant="contained"
                      onClick={() => {
                        onVote(item.candidateId);
                      }}
                    >
                      {hasVoted ? "You have voted" : "VOTE"}
                    </Button>
                  </CardActions>
                </Card>
              ))
            : ""}
        </div>
      )}
    </div>
  );
};

export default Vote;
