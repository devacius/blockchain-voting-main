import React, { useEffect, useState } from "react";
import TempContract from "../truffle_abis/TempContract.json";
import Web3 from "web3";
import Base from "./Base";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { FormGroup } from "@mui/material";

const AddCandidate = () => {
  const [contractInstance, setContractInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [name, setName] = useState(null);
  const [party, setParty] = useState(null);
  const [manifesto, setManifesto] = useState(null);
  const [constituency, setConstituency] = useState(null);
  const [candidates, setCandidates] = useState(null);
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
      setAccount(accounts[0]);
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
    if ((name, party, manifesto, constituency)) {
      await contractInstance.methods
        .addCandidate(name, party, manifesto, constituency)
        .send({
          from: account,
          gas: 1000000,
        });
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
          </div>
        )}
      </div>

      <div>
        {isOwner ? (
          <>
            <h1>Add Candidate</h1>
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
                label="Enter Party Name"
                variant="standard"
                value={party}
                onChange={(e) => {
                  setParty(e.target.value);
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
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter manifesto"
                style={{ width: 200 }}
                value={manifesto}
                onChange={(e) => {
                  setManifesto(e.target.value);
                }}
              />
              <Button variant="contained" onClick={onSubmit}>
                Add Candidate
              </Button>
              {/* <div>
                <h1>Data </h1>
                {name} <br />
                {party} <br />
                {constituency} :{typeof constituency} <br />
                {manifesto}
              </div> */}
            </FormGroup>
          </>
        ) : (
          <div>Only owner can add candidate </div>
        )}
      </div>
    </div>
  );
};

export default AddCandidate;
