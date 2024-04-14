"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const helpers_1 = require("@solana-developers/helpers");
const keypair = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
console.log(`The public key is: ${keypair.publicKey.toBase58()}`);
console.log(`The secret key for the public key: ${keypair.publicKey.toBase58()} is ${keypair.secretKey}`);
