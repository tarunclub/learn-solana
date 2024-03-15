import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import 'dotenv/config';

const PING_PROGRAM_ADDRESS = new PublicKey(
  'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
);
const PING_PROGRAM_DATA_ADDRESS = new PublicKey(
  'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'
);

const keypair1 = getKeypairFromEnvironment('SECRET_KEY');
console.log(keypair1.publicKey.toBase58());

const connection = new Connection(clusterApiUrl('devnet'));
const address = new PublicKey('GteaL8FV2uLrdARiH4SK3y3EkDnnmcMe9rxasZSvA6vD');

(async () => {
  const transaction = new Transaction();
  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  const instruction = new TransactionInstruction({
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

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    keypair1,
  ]);

  console.log(`✅ Transaction completed! Signature is ${signature}`);
})();
