import React, { useEffect, useState } from "react";
import TempContract from "../truffle_abis/TempContract.json";
import Web3 from "web3";
import Base from "./Base";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";

const AddVoter = () => {
  const [contractInstance, setContractInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [name, setName] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [constituency, setConstituency] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TempContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TempContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContractInstance(instance);
      setAccount(accounts[1]);
      setWeb3(web3);
    } catch (error) {
      console.log("Failed to load web3, accounts, or contract.");
      console.log("Get Data error: ", error);
    } finally {
      console.log("Loaded all data");
      setLoading(false);
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
    if ((name, aadhar, constituency)) {
      await contractInstance.methods
        .requestVoter(name, aadhar, constituency)
        .send({
          from: account,
          gas: 1000000,
        });
      let vCount = await contractInstance.methods.getVoterCount().call();
      console.log(
        "🚀 ~ file: AddVoter.js ~ line 77 ~ onSubmit ~ vCount",
        vCount
      );
      window.location.reload(false);
    }
  };

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
            <Base isOwner={isOwner} />
            <div>
              <h1>Add Voter</h1>
            </div>{" "}
          </div>
        )}
      </div>
      {isOwner ? (
        <h1>Contract owner can't vote </h1>
      ) : (
        <FormGroup
          style={{
            display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            margin: "0px 20px",
          }}
        >
          <TextField
            id="standard-basic"
            label="Enter Name"
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Enter Aadhar Number"
            variant="standard"
            value={aadhar}
            onChange={(e) => {
              setAadhar(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Enter Constituency Number"
            variant="standard"
            value={constituency}
            onChange={(e) => {
              setConstituency(+e.target.value);
            }}
          />

          <Button variant="contained" onClick={onSubmit}>
            Add Voter
          </Button>
          {/* <div>
            <h1>Data </h1>
            {name} : {typeof name} <br />
            {aadhar} : {typeof aadhar} <br />
            {constituency} : {typeof constituency} <br />
          </div> */}
        </FormGroup>
      )}
    </div>
  );
};

export default AddVoter;
