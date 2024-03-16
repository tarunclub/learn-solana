import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import './App.css';
import { AnchorProvider, Idl, Program, setProvider } from '@coral-xyz/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import idl from '../../target/idl/anchor_counter.json';
import { useEffect, useState } from 'react';

const account = new Keypair();

function App() {
  const [program, setProgram] = useState<Program>();
  const [counter, setCounter] = useState<PublicKey>();
  const [transactionUrl, setTransactionUrl] = useState('');
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const initializeCounter = async () => {
    const sig = await program?.methods
      .instructionOne()
      .accounts({
        counter: account.publicKey,
        user: wallet?.publicKey,
        systemAccount: SystemProgram.programId,
      })
      .signers([account])
      .rpc();

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    setCounter(account.publicKey);
  };

  const incrementCounter = async () => {
    const sig = await program?.methods
      .instructionIncrement()
      .accounts({
        counter: counter,
        user: wallet?.publicKey,
      })
      .rpc();

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  };

  const refreshCount = async (program) => {
    const counterAccount = await program.account.counter.fetch(counter);
    setCounter(counterAccount.counter.toNumber());
  };

  useEffect(() => {
    const provider = new AnchorProvider(connection, wallet!, {});
    setProvider(provider);

    const programId = new PublicKey(
      '9gAhhkLjGeKyb2NGPF4rU6WRbrXotVzZPfqq4pvmbRJ7'
    );
    const program = new Program(idl as Idl, programId);
    setProgram(program);
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}

export default App;
