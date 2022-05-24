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
// import { useWallet, UseWalletProvider } from 'use-wallet'
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
import web3 from "web3";
// import web3 from "web3/dist/web3.min.js";
const WalletAddress = "0x76fCc1FC56302CFC920d039496fB8838E1b177cb";
const TAGADDRESS = "0x717fb7B6d0c3d7f1421Cc60260412558283A6ae5";
const BNBADDRESS = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";

export default function App() {
  //const wallet = useWallet()
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isConnected, setisConnect] = useState(false);
  const [signer, setSigner] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await activate(connectors.injected);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let abi_bnb = [
          {
            constant: true,
            inputs: [],
            name: "name",
            outputs: [{ name: "", type: "string" }],
            payable: false,
            type: "function",
          },
          {
            constant: false,
            inputs: [
              { name: "_spender", type: "address" },
              { name: "_value", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ name: "success", type: "bool" }],
            payable: false,
            type: "function",
          },
          {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            type: "function",
          },
          {
            constant: false,
            inputs: [
              { name: "_from", type: "address" },
              { name: "_to", type: "address" },
              { name: "_value", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ name: "success", type: "bool" }],
            payable: false,
            type: "function",
          },
          {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [{ name: "", type: "uint8" }],
            payable: false,
            type: "function",
          },
          {
            constant: false,
            inputs: [{ name: "amount", type: "uint256" }],
            name: "withdrawEther",
            outputs: [],
            payable: false,
            type: "function",
          },
          {
            constant: false,
            inputs: [{ name: "_value", type: "uint256" }],
            name: "burn",
            outputs: [{ name: "success", type: "bool" }],
            payable: false,
            type: "function",
          },
          {
            constant: false,
            inputs: [{ name: "_value", type: "uint256" }],
            name: "unfreeze",
            outputs: [{ name: "success", type: "bool" }],
            payable: false,
            type: "function",
          },
          {
            constant: true,
            inputs: [{ name: "", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            type: "function",
          },
          {
            constant: true,
            inputs: [],
            name: "owner",
            outputs: [{ name: "", type: "address" }],
            payable: false,
            type: "function",
          },
          {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [{ name: "", type: "string" }],
            payable: false,
            type: "function",
          },
          {
            constant: false,
            inputs: [
              { name: "_to", type: "address" },
              { name: "_value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [],
            payable: false,
            type: "function",
          },
          {
            constant: true,
            inputs: [{ name: "", type: "address" }],
            name: "freezeOf",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            type: "function",
          },
          {
            constant: false,
            inputs: [{ name: "_value", type: "uint256" }],
            name: "freeze",
            outputs: [{ name: "success", type: "bool" }],
            payable: false,
            type: "function",
          },
          {
            constant: true,
            inputs: [
              { name: "", type: "address" },
              { name: "", type: "address" },
            ],
            name: "allowance",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            type: "function",
          },
          {
            inputs: [
              { name: "initialSupply", type: "uint256" },
              { name: "tokenName", type: "string" },
              { name: "decimalUnits", type: "uint8" },
              { name: "tokenSymbol", type: "string" },
            ],
            payable: false,
            type: "constructor",
          },
          { payable: true, type: "fallback" },
          {
            anonymous: false,
            inputs: [
              { indexed: true, name: "from", type: "address" },
              { indexed: true, name: "to", type: "address" },
              { indexed: false, name: "value", type: "uint256" },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, name: "from", type: "address" },
              { indexed: false, name: "value", type: "uint256" },
            ],
            name: "Burn",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, name: "from", type: "address" },
              { indexed: false, name: "value", type: "uint256" },
            ],
            name: "Freeze",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, name: "from", type: "address" },
              { indexed: false, name: "value", type: "uint256" },
            ],
            name: "Unfreeze",
            type: "event",
          },
        ];
        const contractBNB = new ethers.Contract(BNBADDRESS, abi_bnb, signer);
        contractBNB.functions.balanceOf(WalletAddress).then((balance) => {
          //     // Setting balance
          console.log("BNB BALANCE IS ", parseInt(balance[0]["_hex"], 16));
        });
        contractBNB.functions.totalSupply().then((totalSupply) => {
          console.log("TOTAL SUPPLY BNB", parseInt(totalSupply[0]["_hex"], 16));
        });

        /////////////////TAG....................................................................
        let abi_Tag = abiTag;
        const contractTAG = new ethers.Contract(TAGADDRESS, abi_Tag,signer);
        console.log("ERC20 IS ", contractTAG);
        contractTAG.functions.balanceOf(WalletAddress).then((balanceTag) => {
          //     // Setting balance
          console.log("TAG BALANCE IS ", parseInt(balanceTag[0]["_hex"], 16));
        });
        contractTAG.functions.totalSupply().then((totalSupplyTag) => {
          console.log(
            "TOTAL SUPPLY TAG",
            parseInt(totalSupplyTag[0]["_hex"], 16)
          );
        });
      } catch (e) {
        // setisConnect(false);
        console.log(e);
      }
    }
  };
  const connectWallet = () => {
    setModalShow(true);
  };

  const getbalance = async (address) => {
    // Requesting balance method

    // window.ethereum
    //   .request({
    //     method: "eth_getBalance",
    //     params: ["0x76fCc1FC56302CFC920d039496fB8838E1b177cb", "latest"],
    //   })
    //   .then((balance) => {
    //     // Setting balance
    //     setdata({
    //       Balance: ethers.utils.formatEther(balance),
    //     });
    //     console.log("BALANCE IS ", ethers.utils.formatEther(balance));
    //   });
    const contractAddress = "0x76fCc1FC56302CFC920d039496fB8838E1b177cb";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const abi = [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        type: "function",
      },
      {
        constant: false,
        inputs: [{ name: "amount", type: "uint256" }],
        name: "withdrawEther",
        outputs: [],
        payable: false,
        type: "function",
      },
      {
        constant: false,
        inputs: [{ name: "_value", type: "uint256" }],
        name: "burn",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        type: "function",
      },
      {
        constant: false,
        inputs: [{ name: "_value", type: "uint256" }],
        name: "unfreeze",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [],
        payable: false,
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "freezeOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
      },
      {
        constant: false,
        inputs: [{ name: "_value", type: "uint256" }],
        name: "freeze",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { name: "", type: "address" },
          { name: "", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        type: "function",
      },
      {
        inputs: [
          { name: "initialSupply", type: "uint256" },
          { name: "tokenName", type: "string" },
          { name: "decimalUnits", type: "uint8" },
          { name: "tokenSymbol", type: "string" },
        ],
        payable: false,
        type: "constructor",
      },
      { payable: true, type: "fallback" },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Burn",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Freeze",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Unfreeze",
        type: "event",
      },
    ];
    // const signer1 = provider.getSigner();
    //  let userAddress = await signer.getAddress();
    const contract = new ethers.Contract(
      "0x76fCc1FC56302CFC920d039496fB8838E1b177cb",
      abi,
      signer
    );
    try {
      contract.methods
        .balanceOf("0x76fCc1FC56302CFC920d039496fB8838E1b177cb")
        .call()
        .then((balance) => {
          //     // Setting balance
          console.log("BALANCE", ethers.utils.formatEther(balance));
        });
    } catch (error) {
      console.log(error);
    }
    console.log("CONTRACTTTT", contract);
  };

  const accountChangeHandler = (account) => {
    console.log("RESPONSE HASH", account);
    setdata({ address: account });
    getbalance(account);
  };
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
                onClick={connectMetamask}
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
