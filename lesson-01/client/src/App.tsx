import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "./App.css";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import Movie from "./components/Movie";
import Balance from "./components/Balance";

function App() {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <WalletMultiButton />
            <Balance />
            <Movie />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
