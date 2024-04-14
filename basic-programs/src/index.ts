import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey(keypair.publicKey);

(async () => {
  const balance = await connection.getBalance(address);
  console.log(
    `Balance of the account ${keypair.publicKey} is ${balance / LAMPORTS_PER_SOL}`,
  );
})();
