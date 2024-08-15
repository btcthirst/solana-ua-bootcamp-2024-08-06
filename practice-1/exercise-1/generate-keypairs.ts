import "@solana/web3.js"
import { Keypair } from "@solana/web3.js"

const ok = "✅"
const keypair = Keypair.generate()

console.log(`Generated public key: ${keypair.publicKey.toBase58()}`)
console.log(`Pribate key ${keypair.secretKey}`)
console.log(ok,"Finished!")