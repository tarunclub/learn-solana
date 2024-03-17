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
const js_1 = require("@metaplex-foundation/js");
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
const secret = Uint8Array.from([
    221, 238, 125, 115, 182, 138, 144, 194, 103, 74, 93, 88, 231, 243, 169, 201,
    228, 253, 68, 20, 238, 242, 180, 215, 90, 59, 246, 71, 10, 251, 235, 87, 173,
    15, 33, 244, 237, 82, 221, 203, 48, 177, 141, 148, 194, 140, 28, 205, 39, 120,
    125, 75, 229, 44, 159, 155, 202, 30, 231, 68, 199, 72, 68, 250,
]);
const wallet = web3_js_1.Keypair.fromSecretKey(secret);
console.log(wallet.publicKey.toBase58());
const metaplex = js_1.Metaplex.make(connection)
    .use((0, js_1.keypairIdentity)(wallet))
    .use((0, js_1.bundlrStorage)({
    address: 'https://devnet.bundlr.network',
    providerUrl: 'https://api.devnet.solana.com',
    timeout: 60000,
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = fs_1.default.readFileSync(__dirname + '/uploads/shinchan.jpg');
        const file = (0, js_1.toMetaplexFile)(buffer, 'image.png');
        const imageUri = yield metaplex.storage().upload(file);
        const { uri } = yield metaplex.nfts().uploadMetadata({
            name: 'Shinchan NFT -  Tarun',
            description: 'Shinchan NFT created by Tarun Kumar',
            image: imageUri,
        });
        const { nft } = yield metaplex.nfts().create({
            uri: uri,
            name: 'Shinchan NFT - Tarun Kumar',
            sellerFeeBasisPoints: 0,
        }, { commitment: 'finalized' });
        console.log(nft.address);
    });
}
main();
