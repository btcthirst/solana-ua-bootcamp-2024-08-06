import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
  TransactionInstruction
} from "@solana/web3.js";
import { configDotenv } from "dotenv";


configDotenv({path: __dirname + '/../../.env'})
let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);
const recipient = new PublicKey("2mvDeTiccBvwyNiMx6mFBUSVWJyujJeGaWZwkuirNQWG");
console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});
transaction.add(sendSolInstruction);

const memoProgram = new PublicKey(
    "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
  );
  
  const memoText = "Solana на фарбу!";
  
  const addMemoInstruction = new TransactionInstruction({
    keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from(memoText, "utf-8"),
    programId: memoProgram,
  });
  
  transaction.add(addMemoInstruction);
  
  console.log(`📝 memo is: ${memoText}`);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`✅ Transaction confirmed, signature: ${signature}!`);