import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`The public key is: ${keypair.publicKey.toBase58()}`);
console.log(
  `The secret key for the public key: ${keypair.publicKey.toBase58()} is ${keypair.secretKey}`,
);
