"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@solana-developers/helpers");
const web3_js_1 = require("@solana/web3.js");
require("dotenv/config");
const keypair1 = (0, helpers_1.getKeypairFromEnvironment)('SECRET_KEY');
console.log(keypair1.publicKey.toBase58());
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
const address = new web3_js_1.PublicKey('GteaL8FV2uLrdARiH4SK3y3EkDnnmcMe9rxasZSvA6vD');
(() => __awaiter(void 0, void 0, void 0, function* () {
    //   const transaction = new Transaction();
    //   const sendSOLInstruction = SystemProgram.transfer({
    //     fromPubkey: keypair1.publicKey,
    //     toPubkey: new PublicKey('CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u'),
    //     lamports: LAMPORTS_PER_SOL * 1,
    //   });
    //   transaction.add(sendSOLInstruction);
    //   const signature = sendAndConfirmTransaction(connection, transaction, [
    //     keypair1,
    //   ]);
    //   console.log(`https://api.explorer.solana.com/${signature}?cluster=devnet`);
    const balance = yield connection.getBalance(address);
    console.log(`The balance of the account ${address} is ${balance / web3_js_1.LAMPORTS_PER_SOL}`);
}))();
