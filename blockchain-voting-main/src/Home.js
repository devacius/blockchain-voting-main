import { useEffect, useState } from "react";
import TempContract from "./truffle_abis/TempContract.json";
import Web3 from "web3";
import Base from "./components/Base";

const Home = () => {
  const [contractInstance, setContractInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      console.table(accounts);
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
      console.log(contractInstance);
      const owner = await contractInstance.methods.getOwner().call();
      console.log("owner: ", owner);
      console.log("account: ", account);
      if (account === owner) {
        setIsOwner(true);
      }

      let start = await contractInstance.methods.getStart().call();
      let end = await contractInstance.methods.getEnd().call();
      setStart(start);
      setEnd(end);
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

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div>
      <div>
        {!web3 ? (
          <div>
            <div>
              <h1>Loading web3,accounts and contracts </h1>
            </div>
          </div>
        ) : (
          <div>
            <Base isOwner={isOwner} />
            <div>
              <h1>Welcome to the voting app</h1>
            </div>{" "}
            Hello! <div> Your address is {account} </div>
            {isOwner ? (
              <div>You are owner </div>
            ) : (
              <div>You are not owner </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
