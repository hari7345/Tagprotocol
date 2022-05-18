import React, { useState } from "react";
import "./App.css";
import logo from "./images/tagprotocol.png";
import tag from "./images/tag.png";
import metamask from "./images/metamask.png";
import walletconnect from "./images/walletconnect.png";
import trustwallet from "./images/trustwallet.png";
import binancewallet from "./images/binance.png";
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
// import Web3 from "web3";
export default function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const connectMetamask = () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      window.ethereum.request({ metthod: "eth_requestAccounts" });
      // web3=new Web3(window.ethereum)
      setModalShow(true);
    } else {
      console.log("Please install Metamask");
    }
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
                      onClick={connectMetamask}
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
              <img src={metamask} height="60" alt="logo" />            
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
