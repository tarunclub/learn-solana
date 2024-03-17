import {
  createMint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from '@solana/spl-token';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';

async function createNewMint(
  connection: Connection,
  payer: Keypair,
  mintAuthority: PublicKey,
  freezeAuthority: PublicKey,
  decimal: number
) {
  const tokenMint = await createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    decimal
  );

  console.log(
    `Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`
  );

  return tokenMint;
}

async function createTokenAccount(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  owner: PublicKey
) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
  );

  console.log(
    `Token account: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`
  );

  return tokenAccount;
}

async function mintToken(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  authority: Keypair,
  amount: number
) {
  const transactionSignature = await mintTo(
    connection,
    payer,
    mint,
    destination,
    authority,
    amount
  );

  console.log(
    `Mint Token Transaction: https://explorer.solana.com/tx/${transactionSignature}?clsuter=devnet`
  );
}

async function transferTokens(
  connection: Connection,
  payer: Keypair,
  source: PublicKey,
  destination: PublicKey,
  owner: Keypair,
  amount: number
) {
  const transactionSignature = await transfer(
    connection,
    payer,
    source,
    destination,
    owner,
    amount
  );

  console.log(
    `Transfer Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );
}

async function main() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const secret = Uint8Array.from([
    221, 238, 125, 115, 182, 138, 144, 194, 103, 74, 93, 88, 231, 243, 169, 201,
    228, 253, 68, 20, 238, 242, 180, 215, 90, 59, 246, 71, 10, 251, 235, 87,
    173, 15, 33, 244, 237, 82, 221, 203, 48, 177, 141, 148, 194, 140, 28, 205,
    39, 120, 125, 75, 229, 44, 159, 155, 202, 30, 231, 68, 199, 72, 68, 250,
  ]);
  const keypair = Keypair.fromSecretKey(secret);

  const mint = await createNewMint(
    connection,
    keypair,
    keypair.publicKey,
    keypair.publicKey,
    9
  );

  const tokenAccount = await createTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  );

  console.log(tokenAccount.address.toBase58());

  await mintToken(
    connection,
    keypair,
    mint,
    tokenAccount.address,
    keypair,
    100 * 10 ** 9
  );
}

main();
