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
const PING_PROGRAM_ADDRESS = new web3_js_1.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
const PING_PROGRAM_DATA_ADDRESS = new web3_js_1.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');
const keypair1 = (0, helpers_1.getKeypairFromEnvironment)('SECRET_KEY');
console.log(keypair1.publicKey.toBase58());
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
const address = new web3_js_1.PublicKey('GteaL8FV2uLrdARiH4SK3y3EkDnnmcMe9rxasZSvA6vD');
(() => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = new web3_js_1.Transaction();
    const programId = new web3_js_1.PublicKey(PING_PROGRAM_ADDRESS);
    const pingProgramDataId = new web3_js_1.PublicKey(PING_PROGRAM_DATA_ADDRESS);
    const instruction = new web3_js_1.TransactionInstruction({
        keys: [
            {
                pubkey: pingProgramDataId,
                isSigner: false,
                isWritable: true,
            },
        ],
        programId,
    });
    transaction.add(instruction);
    const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
        keypair1,
    ]);
    console.log(`✅ Transaction completed! Signature is ${signature}`);
}))();
