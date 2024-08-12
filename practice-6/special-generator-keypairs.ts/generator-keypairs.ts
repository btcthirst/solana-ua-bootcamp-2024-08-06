import "@solana/web3.js"
import { Keypair } from "@solana/web3.js"

const ok = "✅"
const search ="^max"
for(let i=0;;i++) {
    const keypair = Keypair.generate()
    if (keypair.publicKey.toBase58().toLowerCase().match(search)) {
        console.log(`Generated public key: ${keypair.publicKey.toBase58()}`)
        console.log(`Pribate key ${keypair.secretKey}`)
        break
    }
    console.log("nothing on step:", i)
}



console.log(ok,"Finished!")