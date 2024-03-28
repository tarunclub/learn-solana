import {
  Metaplex,
  NftWithToken,
  PublicKey,
  bundlrStorage,
  keypairIdentity,
  toMetaplexFile,
} from '@metaplex-foundation/js';
import { initializeKeypair } from './initializeKeypair';
import * as web3 from '@solana/web3.js';
import fs from 'fs';

const TOKEN_NAME = 'Shinchan-NFT';
const DESCRIPTION = 'Shinchan NFT created by Tarun Kumar';
const SYMBOL = 'SHINCHAN';
const sellerFeeBasisPoints = 100;
const imageFile = 'images/shinchan_2.png';

async function createNft(
  metaplex: Metaplex,
  uri: string
): Promise<NftWithToken> {
  const { nft } = await metaplex.nfts().create({
    uri: uri,
    name: TOKEN_NAME,
    sellerFeeBasisPoints: sellerFeeBasisPoints,
    symbol: SYMBOL,
  });

  console.log(
    `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
  );

  return nft;
}

async function updateNft(
  metaplex: Metaplex,
  uri: string,
  mintAddress: PublicKey
) {
  // get "NftWithToken" type from mint address
  const nft = await metaplex.nfts().findByMint({ mintAddress });

  // omit any fields to keep unchanged
  await metaplex.nfts().update({
    nftOrSft: nft,
    name: TOKEN_NAME,
    symbol: SYMBOL,
    uri: uri,
    sellerFeeBasisPoints: sellerFeeBasisPoints,
  });

  console.log(
    `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
  );
}

async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
  const user = await initializeKeypair(connection);

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(user))
    .use(
      bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      })
    );

  const buffer = fs.readFileSync('src/' + imageFile);

  const file = toMetaplexFile(buffer, imageFile);

  const imageUrl = await metaplex.storage().upload(file);
  console.log('image url:', imageUrl);

  const { uri } = await metaplex.nfts().uploadMetadata({
    name: TOKEN_NAME,
    description: DESCRIPTION,
    image: imageUrl,
  });

  console.log('metadata uri: ', uri);

  await createNft(metaplex, uri);

  const mintAddress = new PublicKey(
    '7MxsShoN7R4kFkGDCFkRHdWx52UVRy8Vq9n6Xg5Hize9'
  );
  await updateNft(metaplex, uri, mintAddress);
}

main()
  .then(() => {
    console.log('Finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
