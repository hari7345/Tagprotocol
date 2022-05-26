import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./images/tagprotocol.png";
import tag from "./images/tag.png";
import metamask from "./images/metamask.png";
import walletconnect from "./images/walletconnect.png";
import trustwallet from "./images/trustwallet.png";
import binancewallet from "./images/binance.png";
import { useWeb3React } from "@web3-react/core";
import abiTag from "./tagAbi.json";
import abiBnb from "./bnbabi.json";
import tagNft from "./tagNft.json";
import tokenNames from "./tokenNames.json";
import { useWallet, UseWalletProvider } from "use-wallet";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Nav,
  Container,
  Navbar,
  NavbarBrand,
  NavItem,
  Modal,
  ModalHeader,
  CardHeader,
  Input,
  ModalBody,
} from "reactstrap";
import { ethers } from "ethers";
import Web3 from "web3";
let WalletAddress = "0x76fCc1FC56302CFC920d039496fB8838E1b177cb";
const TAGADDRESS = "0x717fb7B6d0c3d7f1421Cc60260412558283A6ae5";
const BNBADDRESS = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
function App() {
  const wallet = useWallet();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isConnected, setisConnect] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [tagprice, settagprice] = useState(0);
  const [totalBnBSupply, settotalBnBSupply] = useState(0.0);
  const [totalTagSupply, settotalTagSupply] = useState(0.0);
  const [TagUserBalance, setTagUserBalance] = useState(0.0);
  const [BnbUserBalance, setBnbUserBalance] = useState(0.0);
  const [tosearchID, setsearchID] = useState(0.0);
  const [searchHash, setsearchHash] = useState("--");
  const [hashkey, sethashkey] = useState(0);
  const connectWallet = () => {
    /**Show Wallet selection modal */
    setModalShow(true);
  };
  const getbalance = async () => {
    /**Get Balance for BNB & TAG */
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => (WalletAddress = res[0]));
    /////////////////BNB...................................................................
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    const contractBNB = new ethers.Contract(BNBADDRESS, abiBnb, signer);
    contractBNB.functions.balanceOf(WalletAddress).then((balance) => {
      // Setting balance
      console.log("BNB BALANCE IS ", parseInt(balance[0]["_hex"], 16));
      setBnbUserBalance(parseInt(balance[0]["_hex"], 16));
    });
    contractBNB.functions.totalSupply().then((totalSupply) => {
      let totalBnB=parseInt(totalSupply[0]["_hex"], 16)
      settotalBnBSupply(totalBnB);
      console.log("TOTAL SUPPLY BNB",totalBnB);
    });

    /////////////////TAG....................................................................
    let abi_Tag = abiTag;
    const BscHttp = "https://bsc-dataseed1.binance.org:443";
    const Web3Client = new Web3(new Web3.providers.HttpProvider(BscHttp));
    const contractTAG = new Web3Client.eth.Contract(abi_Tag, TAGADDRESS);
    const result = await contractTAG.methods.balanceOf(WalletAddress).call();
    const format = Web3Client.utils.fromWei(result);
    const totalSupply = await contractTAG.methods.totalSupply().call();
    settotalTagSupply(totalSupply);
    setTagUserBalance(format);
    console.log("Balance", format);
    console.log("Total Supply", totalSupply);
  };
  function connectMetawallet() {
    /**Connect To Metamask*/
    wallet.connect().then(() => {
      getbalance();
      setModalShow(false);
      setisConnect(true);
    });
  }
  async function disconnectWallet() {
    try {
      deactivate();
      setisConnect(false);
    } catch (err) {
      console.log("ERROR");
    }
  }
  const getcurrrentTag = async () => {
    /**Get corresponding Tag Balance*/
    try {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/simple/price?ids=tag-protocol&vs_currencies=usd`
        )
        .then((res) => {
          const tagprice = res.data["tag-protocol"];
          settagprice(tagprice.usd);
        });
    } catch (err) {}
  };
  function searchinput(e) {
    /**Input token ID*/
    setsearchID(e.target.value);
  }

  async function searchID() {  
    /**Search TokenID*/
    let abi_Tag = tagNft;
    const BscHttp = "https://bsc-dataseed1.binance.org:443";
    const Web3Client = new Web3(new Web3.providers.HttpProvider(BscHttp));
    const contractTAG = new Web3Client.eth.Contract(
      abi_Tag,
      "0x8D2252Ce5b346127aFCaf3f5472D12AA2C8A618e"
    );
    const searchtkID = await contractTAG.methods
      .fetchTokenDetails(tosearchID)
      .call();
    setsearchHash(searchtkID[1]);

    sethashkey(hashkey + 1);
  }

  async function searchIDCustom(value) {
    /**Search PREv/NEXT Token*/
    let abi_Tag = tagNft;
    const BscHttp = "https://bsc-dataseed1.binance.org:443";
    const Web3Client = new Web3(new Web3.providers.HttpProvider(BscHttp));
    const contractTAG = new Web3Client.eth.Contract(
      abi_Tag,
      "0x8D2252Ce5b346127aFCaf3f5472D12AA2C8A618e"
    );
    const searchtkID = await contractTAG.methods
      .fetchTokenDetails(value)
      .call();
    setsearchHash(searchtkID[1]);
    sethashkey(hashkey + 1);
  }

  function getNextID() {
      /**Set next tokenID*/
    let nextID = Number(tosearchID) + 1;
    nextID = String(nextID);
    console.log("NEXTT", nextID);
    setsearchID(nextID);
    searchIDCustom(nextID);
  }

  function getPrevID() {
    /**Set prev tokenID*/
    let prevID = Number(tosearchID) - 1;
    prevID = String(prevID);
    console.log("PREVIS", prevID);
    setsearchID(prevID);
    searchIDCustom(prevID);
  }
  useEffect(() => {
    /**Get current Tag price*/
    getcurrrentTag();
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Card style={{ backgroundColor: "#e5ebee", height: "100vh" }}>
          <CardBody>
            <Container fluid>
              <Navbar expand="md">
                <NavbarBrand href="/">
                  <img src={logo} height="50" alt="logo" />
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <img src={tag} height="40" alt="logo" />
                    <p
                      className="navitem"
                      style={{ "vertical-align": "middle", display: "inline" }}
                    >
                      ${tagprice}
                    </p>
                  </NavItem>
                  <NavItem>
                    <Button
                      style={{
                        backgroundColor: isConnected ? "#e85d5d" : "#62e4cc",
                        "border-radius": "18px",
                        color: "#1751aa",
                      }}
                      onClick={isConnected ? disconnectWallet : connectWallet}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </NavItem>
                </Nav>
              </Navbar>
              <Row xl="12" style={{ paddingTop: "2%" }}>
                <Col md="4">
                  <Card style={{ backgroundColor: "#e5ebee" }}>
                    <CardHeader style={{ backgroundColor: "#A4C1D2" }}>
                      <Row md="12">
                        <Col md="3">Tag</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>{TAGADDRESS}</p>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                        <Col md="3">Total Supply</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>{totalTagSupply}</p>
                        </Col>
                      </Row>
                      <Row md="12">
                        <Col md="3">Market Cap</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>--</p>
                        </Col>
                      </Row>
                      <Row
                        md="12"
                        style={isConnected ? {} : { display: "none" }}
                      >
                        <Col md="3">User Balance</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>{TagUserBalance}</p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card style={{ backgroundColor: "#e5ebee" }}>
                    <CardHeader style={{ backgroundColor: "#A4C1D2" }}>
                      <Row md="12">
                        <Col md="3">BNB</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>{BNBADDRESS}</p>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                        <Col md="3">Total Supply</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>{totalBnBSupply}</p>
                        </Col>
                      </Row>
                      <Row md="12">
                        <Col md="3">Market Cap</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>--</p>
                        </Col>
                      </Row>
                      <Row
                        md="12"
                        style={isConnected ? {} : { display: "none" }}
                      >
                        <Col md="3">User Balance</Col>
                        <Col md="9">
                          <p style={{ float: "right" }}>{BnbUserBalance}</p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card style={{ backgroundColor: "#e5ebee" }}>
                    <CardBody>
                      <Row md="12">
                        <Col md="6">
                          <Input
                            bsSize="sm"
                            value={tosearchID}
                            onChange={searchinput}
                            placeholder="Search ID"
                          />
                        </Col>
                        <Col md="2">
                          <Button
                            size="sm"
                            onClick={() => {
                              isConnected === true
                                ? searchID()
                                : alert("Not Connected to wallet !");
                            }}
                          >
                            Search
                          </Button>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "5%" }}>
                        <Col md="2">
                          <Button
                            size="sm"
                            onClick={() => {
                              isConnected === true
                                ? getPrevID()
                                : alert("Login Required !");
                            }}
                          >
                            &#x21e6;
                          </Button>
                        </Col>
                        <Col md="5">
                          <p key={hashkey}>Hash - {searchHash}</p>
                        </Col>
                        <Col md="2">
                          <Button
                            size="sm"
                            onClick={() => {
                              isConnected === true
                                ? getNextID()
                                : alert("Login Required !");
                            }}
                          >
                            &#x21e8;
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </div>

      <Modal isOpen={modalShow} backdrop="static" centered size="sm">
        <ModalHeader
          toggle={() => setModalShow(false)}
          style={{ backgroundColor: "#1e82ce" }}
        />
        <ModalBody style={{ marginLeft: "10%" }}>
          <Row xs={12}>
            <Col xs={6}>
              {" "}
              <img
                src={metamask}
                onClick={connectMetawallet}
                style={{ cursor: "pointer" }}
                height="60"
                alt="logo"
              />
            </Col>
            <Col xs={6}>
              <img src={walletconnect} height="60" alt="logo" />
            </Col>
          </Row>
          <Row xs={12} style={{ marginTop: "15px" }}>
            <Col xs={6}>
              <img src={trustwallet} height="60" alt="logo" />
            </Col>
            <Col xs={6}>
              <img src={binancewallet} height="50" alt="logo" />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider>
    <App />
  </UseWalletProvider>
);
