/*use solana_client::rpc_client::RpcClient;
use solana_sdk::system_instruction;
use dotenv;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::signature::{Keypair, Signer};
use solana_sdk::transaction::Transaction;
use solana_sdk::pubkey::Pubkey;
use std::env;
use std::str::FromStr;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    let name = "SECRET_KEY";

    let secret_key_str = env::var(name).expect("SECRET_KEY not set");

    let secret_key_bytes: Vec<u8> = secret_key_str.trim_matches(|c| c == '[' || c ==']')
        .split(',')
        .map(|s| s.trim().parse::<u8>().expect("Invalid byte"))
        .collect();

    let from = Keypair:: from_bytes(&secret_key_bytes).expect("Invalid secret key");
    let frompubkey = Signer::pubkey(&from);
    println!("Pub key {}", frompubkey);
    
    let topubkey = Pubkey::from_str("2mvDeTiccBvwyNiMx6mFBUSVWJyujJeGaWZwkuirNQWG");

    let lamports_to_send = 1_000_000;

    let rpc_url = String::from("https://api.devnet.solana.com");
    let connection = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

    match connection.request_airdrop(&frompubkey, LAMPORTS_PER_SOL) {
        Ok(sig) => loop {
            if let Ok(confirmed) = connection.confirm_transaction(&sig) {
                if confirmed {
                    println!("Transaction: {} Status: {}", sig, confirmed);
                    break;
                }
            }
        },
        Err(_) => println!("Error requesting airdrop"),
    };

    let ix = system_instruction::transfer(&frompubkey, &topubkey, lamports_to_send);
    let recent_blockhash =connection.get_latest_blockhash().expect("Failed to get latest blockhash.");
    let txn = Transaction::new_signed_with_payer(&[ix], Some(&frompubkey), &[&from], recent_blockhash);

    
    match connection.send_and_confirm_transaction(&txn){
        Ok(sig) => loop {
            if let Ok(confirmed) = connection.confirm_transaction(&sig) {
                if confirmed {
                    println!("Transaction: {} Status: {}", sig, confirmed);
                    break;
                }
            }
        },
        Err(e) => println!("Error transferring Sol:, {}", e),
    }
    
}*/

use solana_client::rpc_client::RpcClient;
use solana_sdk::signature::{Keypair, Signer};
use solana_sdk::transaction::Transaction;
use solana_sdk::system_instruction;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;
use std::env;
use dotenv;

#[tokio::main]
async fn main() {
    // Введіть URL RPC сервера для Devnet
    let rpc_url = "https://api.devnet.solana.com";
    let client = RpcClient::new(rpc_url);

    // Введіть ваш секретний ключ (можна з .env файлу)
    dotenv::dotenv().ok();
    let name = "SECRET_KEY";

    let secret_key_str = env::var(name).expect("SECRET_KEY not set");

    let secret_key: Vec<u8> = secret_key_str.trim_matches(|c| c == '[' || c ==']')
        .split(',')
        .map(|s| s.trim().parse::<u8>().expect("Invalid byte"))
        .collect();
    
    let from_keypair = Keypair::from_bytes(&secret_key).expect("Invalid secret key");

    // Введіть адресу отримувача
    let to_pubkey = Pubkey::from_str("2mvDeTiccBvwyNiMx6mFBUSVWJyujJeGaWZwkuirNQWG").expect("Invalid recipient address");

    // Введіть суму для надсилання
    let lamports = 1_000_000; // 1 SOL = 1_000_000_000 лампортів

    // Створіть інструкцію для переказу
    let instruction = system_instruction::transfer(&from_keypair.pubkey(), &to_pubkey, lamports);

    // Отримайте останній блок
    let recent_blockhash = client.get_latest_blockhash().expect("Failed to get recent blockhash");

    // Створіть транзакцію
    let mut transaction = Transaction::new_with_payer(&[instruction], Some(&from_keypair.pubkey()));
    transaction.sign(&[&from_keypair], recent_blockhash);

    // Надішліть транзакцію
    let signature = client.send_and_confirm_transaction(&transaction).expect("Failed to send transaction");

    // Виведіть підпис транзакції
    println!("Transaction sent with signature: {}", signature);
}

