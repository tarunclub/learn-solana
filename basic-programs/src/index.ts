import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey(keypair.publicKey);

(async () => {
  const transaction = new Transaction();

  const sendSolTransaction = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: new PublicKey("CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u"),
    lamports: LAMPORTS_PER_SOL * 1,
  });

  transaction.add(sendSolTransaction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    keypair,
  ]);
  console.log(`${signature}`);
  // console.log(`https://explorer.solana.com/?cluster=devnet/${signature.}`)
  const balance = await connection.getBalance(address);
  console.log(
    `Balance of the account ${keypair.publicKey} is ${balance / LAMPORTS_PER_SOL}`,
  );
})();
