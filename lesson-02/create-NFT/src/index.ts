import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  PublicKey,
} from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'));

const secret = Uint8Array.from([
  221, 238, 125, 115, 182, 138, 144, 194, 103, 74, 93, 88, 231, 243, 169, 201,
  228, 253, 68, 20, 238, 242, 180, 215, 90, 59, 246, 71, 10, 251, 235, 87, 173,
  15, 33, 244, 237, 82, 221, 203, 48, 177, 141, 148, 194, 140, 28, 205, 39, 120,
  125, 75, 229, 44, 159, 155, 202, 30, 231, 68, 199, 72, 68, 250,
]);

const wallet = Keypair.fromSecretKey(secret);

console.log(wallet.publicKey.toBase58());

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(
    bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: 'https://api.devnet.solana.com',
      timeout: 60000,
    })
  );

async function main() {
  const buffer = fs.readFileSync(__dirname + '/uploads/shinchan.jpg');
  const file = toMetaplexFile(buffer, 'image.png');

  const imageUri = await metaplex.storage().upload(file);

  const { uri } = await metaplex.nfts().uploadMetadata({
    name: 'Shinchan NFT -  Tarun',
    description: 'Shinchan NFT created by Tarun Kumar',
    image: imageUri,
  });

  const { nft } = await metaplex.nfts().create(
    {
      uri: uri,
      name: 'Shinchan NFT - Tarun Kumar',
      sellerFeeBasisPoints: 0,
    },
    { commitment: 'finalized' }
  );

  console.log(nft.address);
}

main();
