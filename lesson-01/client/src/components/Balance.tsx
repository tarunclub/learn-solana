import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [signature, setSignature] = useState('');

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const sendSol = () => {
    const transaction = new Transaction();
    const recipientPubKey = new PublicKey(recipientAddress!);

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey!,
      toPubkey: recipientPubKey!,
      lamports: LAMPORTS_PER_SOL * amount,
    });

    transaction.add(sendSolInstruction);

    sendTransaction(transaction, connection).then((sig) => {
      setSignature(sig);
    });
  };

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      'confirmed'
    );

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info!.lamports);
    });
  }, [connection, publicKey]);
  return (
    <div>
      {publicKey
        ? `Balance of account ${publicKey} is ${balance / LAMPORTS_PER_SOL}`
        : ''}

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Address"
          style={{
            padding: '5px',
            width: '500px',
            borderRadius: '5px',
          }}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />

        <div>
          <input
            type="number"
            placeholder="Amount"
            style={{
              marginTop: '10px',
              padding: '5px',
              borderRadius: '5px',
            }}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <button
          style={{
            marginTop: '10px',
          }}
          onClick={sendSol}
        >
          Send
        </button>

        <div
          style={{
            marginTop: '10px',
          }}
        >
          {signature &&
            `https://api.explorer.solana.com/${signature}?cluster=devnet`}
        </div>
      </div>
    </div>
  );
}
