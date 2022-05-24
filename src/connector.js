import { InjectedConnector } from '@web3-react/injected-connector'
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";

// const walletlink = new WalletLinkConnector({
//   url: `https://mainnet.infura.io/v3/f40b0e7bd7714d46827c643c0aef60b8`,
//   appName: "web3-react-demo"
// });
const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,56]
});
// const walletconnect = new WalletConnectConnector({
//   rpcUrl: `https://mainnet.infura.io/v3/f40b0e7bd7714d46827c643c0aef60b8`,
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true
// });
export const connectors = {
  injected: injected,
//   walletConnect: walletconnect,
//   coinbaseWallet: walletlink
};

