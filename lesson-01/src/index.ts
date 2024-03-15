import { Keypair } from '@solana/web3.js';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import 'dotenv/config';

const keypair = Keypair.generate();

console.log('The public key is: ', keypair.publicKey.toBase58());
console.log('The private key is: ', keypair.secretKey);

const keypair1 = getKeypairFromEnvironment('SECRET_KEY');

console.log(keypair1.publicKey.toBase58());
