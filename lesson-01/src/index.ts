import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';
import 'dotenv/config';

const keypair1 = getKeypairFromEnvironment('SECRET_KEY');
console.log(keypair1.publicKey.toBase58());

const connection = new Connection(clusterApiUrl('devnet'));
const address = new PublicKey('GteaL8FV2uLrdARiH4SK3y3EkDnnmcMe9rxasZSvA6vD');

(async () => {
  const balance = await connection.getBalance(address);
  console.log(
    `The balance of the account ${address} is ${balance / LAMPORTS_PER_SOL}`
  );
})();
