import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import 'dotenv/config';

const keypair1 = getKeypairFromEnvironment('SECRET_KEY');
console.log(keypair1.publicKey.toBase58());

const connection = new Connection(clusterApiUrl('devnet'));
const address = new PublicKey('GteaL8FV2uLrdARiH4SK3y3EkDnnmcMe9rxasZSvA6vD');

(async () => {
  const transaction = new Transaction();

  const sendSOLInstruction = SystemProgram.transfer({
    fromPubkey: keypair1.publicKey,
    toPubkey: new PublicKey('CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u'),
    lamports: LAMPORTS_PER_SOL * 1,
  });

  transaction.add(sendSOLInstruction);

  const signature = sendAndConfirmTransaction(connection, transaction, [
    keypair1,
  ]);

  console.log(`https://api.explorer.solana.com/${signature}?cluster=devnet`);

  const balance = await connection.getBalance(address);
  console.log(
    `The balance of the account ${address} is ${balance / LAMPORTS_PER_SOL}`
  );
})();
