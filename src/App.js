import React, { useState } from "react";
import "./App.css";
import logo from "./images/tagprotocol.png";
import tag from "./images/tag.png";
import metamask from "./images/metamask.png";
import walletconnect from "./images/walletconnect.png";
import trustwallet from "./images/trustwallet.png";
import binancewallet from "./images/binance.png";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connector";
import abiTag from "./tagAbi.json";
import abiBnb from "./bnbabi.json";
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
  ModalBody,
} from "reactstrap";
import { ethers } from "ethers";
import Web3 from "web3";
// import web3 from "web3/dist/web3.min.js";
const WalletAddress = "0x76fCc1FC56302CFC920d039496fB8838E1b177cb";
const TAGADDRESS = "0x717fb7B6d0c3d7f1421Cc60260412558283A6ae5";
const BNBADDRESS = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
let web3 = new Web3();
function App() {
  const wallet = useWallet();

  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isConnected, setisConnect] = useState(false);
  const [signer, setSigner] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const connectWallet = () => {
    setModalShow(true);
  };

  const getbalance = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    const web3 = new Web3(provider);
    const contractBNB = new ethers.Contract(BNBADDRESS, abiBnb, signer);
    contractBNB.functions.balanceOf(WalletAddress).then((balance) => {
      //     // Setting balance
      console.log("BNB BALANCE IS ", parseInt(balance[0]["_hex"], 16));
    });
    contractBNB.functions.totalSupply().then((totalSupply) => {
      console.log("TOTAL SUPPLY BNB", parseInt(totalSupply[0]["_hex"], 16));
    });
    // var CoursetroContract = web3.eth.functions.balanceOf(WalletAddress)

    /////////////////TAG....................................................................
    let abi_Tag = abiTag;
    const contractTAG = new ethers.Contract(TAGADDRESS, abi_Tag, signer);
    await contractTAG.functions.balanceOf(WalletAddress).then((balanceTag) => {
      console.log("TAG BALANCE IS ", parseInt(balanceTag[0]["_hex"], 16));
    });
    await contractTAG.functions.totalSupply().then((totalSupplyTag) => {
      console.log("TOTAL SUPPLY TAG", parseInt(totalSupplyTag[0]["_hex"], 16));
    });
    console.log("CONTRACT", web3.eth[0]);
  };

  const accountChangeHandler = (account) => {
    console.log("RESPONSE HASH", account);
    setdata({ address: account });
    getbalance(account);
  };
  function connectMetawallet() {
    wallet.connect().then(() => {
      getbalance();
    });
  }
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
                      $300.91
                    </p>
                  </NavItem>
                  {/* <NavItem className="navitem">
                    <p style={{fontSize:"20px"}}>$45.467</p>
                  </NavItem> */}
                  <NavItem>
                    <Button
                      style={{
                        backgroundColor: "#62e4cc",
                        "border-radius": "18px",
                        color: "#1751aa",
                      }}
                      onClick={connectWallet}
                    >
                      Connect
                    </Button>
                  </NavItem>
                </Nav>
              </Navbar>
              <Row style={{ paddingTop: "20%", marginLeft: "35%" }}></Row>
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
              <img
                src={walletconnect}
                // onClick={() => {
                //   activate(connectors.coinbaseWallet);
                // }}
                height="60"
                alt="logo"
              />
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
