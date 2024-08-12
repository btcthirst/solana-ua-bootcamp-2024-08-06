import "dotenv/config"
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js"

const connection = new Connection(clusterApiUrl("devnet"))
console.log("Connected to devnet")

let privateKey = process.env["SECRET_KEY"]
if (privateKey === undefined) {
    console.log("Add SECRET_KEY to .env")
    process.exit(1)
}
const asArray = Uint8Array.from(JSON.parse(privateKey))
const keypair = Keypair.fromSecretKey(asArray)

const publicKey = new PublicKey(keypair.publicKey)
const balanceInLamports = await connection.getBalance(publicKey)
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL

console.log(`The balance for the wallet ataddress ${publicKey} is: ${balanceInSOL}`)