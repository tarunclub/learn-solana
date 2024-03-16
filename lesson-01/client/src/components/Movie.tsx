import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Movie as MovieClass } from '../lib/Movie';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN';

export default function Movie() {
  const [title, setTitle] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleTransactionSubmit = async (movie: any) => {
    if (!publicKey) {
      alert('Please connect your wallet');
      return;
    }

    const buffer = movie.serialize();
    const transaction = new Transaction();

    const [pda] = PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
      new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      const txid = await sendTransaction(transaction, connection);
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  const sendReview = (e: any) => {
    e.preventDefault();

    const movie = new MovieClass(title, rating, message);
    handleTransactionSubmit(movie);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={sendReview}>Send</button>
    </div>
  );
}
