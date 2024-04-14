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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const helpers_1 = require("@solana-developers/helpers");
const web3_js_1 = require("@solana/web3.js");
const keypair = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
const address = new web3_js_1.PublicKey(keypair.publicKey);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = new web3_js_1.Transaction();
    const sendSolTransaction = web3_js_1.SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new web3_js_1.PublicKey("CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u"),
        lamports: web3_js_1.LAMPORTS_PER_SOL * 1,
    });
    transaction.add(sendSolTransaction);
    const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
        keypair,
    ]);
    console.log(`${signature}`);
    // console.log(`https://explorer.solana.com/?cluster=devnet/${signature.}`)
    const balance = yield connection.getBalance(address);
    console.log(`Balance of the account ${keypair.publicKey} is ${balance / web3_js_1.LAMPORTS_PER_SOL}`);
}))();
