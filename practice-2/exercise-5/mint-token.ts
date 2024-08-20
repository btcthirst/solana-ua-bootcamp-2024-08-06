import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";
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

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey(
  "EBQyHCDp8jmEe5Y2FeE6Qv3T3Vj7Cub8eaRxZ2g6KFo3"
);
const recipientAssociatedTokenAccount = new PublicKey(
    "DFM4j1zFy7ozcwXM36BRAXq9UfCLKTA7BFZ4xwLkDrqp"
  );
  
  const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );
  
  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  
  console.log(`✅ Success! Mint Token Transaction: ${link}`);