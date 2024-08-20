import { getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
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

console.log(
  `🔑 Our pubic key is: ${sender.publicKey.toBase58()}`
);
const tokenMintAccount = new PublicKey(
    "EBQyHCDp8jmEe5Y2FeE6Qv3T3Vj7Cub8eaRxZ2g6KFo3"
  );
  const recipient = new PublicKey("7AWJBHPj8iyCBN2z6vzn1eC8dVnyqPgzvUbG5cwXfTe6");
  
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );
  
  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
  
  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );
  
  console.log(`✅ Created token account: ${link}`);