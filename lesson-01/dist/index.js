"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@solana-developers/helpers");
require("dotenv/config");
// const keypair = Keypair.generate();
// console.log('The public key is: ', keypair.publicKey.toBase58());
// console.log('The private key is: ', keypair.secretKey);
const keypair1 = (0, helpers_1.getKeypairFromEnvironment)('SECRET_KEY');
console.log(keypair1.publicKey.toBase58());
