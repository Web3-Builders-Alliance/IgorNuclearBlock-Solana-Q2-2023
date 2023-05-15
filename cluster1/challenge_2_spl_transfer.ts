import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet-certification-copy.json"
import { getOrCreateAssociatedTokenAccount, transfer, transferChecked } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("2ZbLkr39eg4mvS53KQPn5cdXaMfDyQp3MjHeJQ2Gv4vm");

// Recipient address
const receiver = new PublicKey("EZwmRqCe7EzQMvDxX9eqKgCG4oyACMh2Yqg9pp7qookQ");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromWallet = await getOrCreateAssociatedTokenAccount(
      connection, // connection
      keypair, // fee payer
      mint, // mint
      keypair.publicKey // owner,
    )

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toWallet = await getOrCreateAssociatedTokenAccount(
      connection, // connection
      keypair, // fee payer
      mint, // mint
      receiver // owner,
    )
  

    // Transfer the new token to the "toTokenAccount" we just created
    let txhash = await transferChecked(
      connection, // connection
      keypair, // payer
      fromWallet.address, // from 
      mint, // mint
      toWallet.address, // receiver
      keypair, // from's owner
      10^6, // amount
      6 // decimals
    );
    
    console.log(`Transfer tx hash: ${txhash}`);

  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`)
  }
})();