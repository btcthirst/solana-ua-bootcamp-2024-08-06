use solana_sdk::signature::Keypair;
use solana_sdk::signature::Signer;

fn main() {
    let pair = Keypair::new();

    println!("Public key: {}", &pair.pubkey().to_string());
    println!("Base58 private key: {:?}", &pair.to_base58_string());
    println!("JSON private key: {:?}", &pair.to_bytes());
}
