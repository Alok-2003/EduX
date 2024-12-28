import { ethers } from 'ethers';
import { dotenv } from './dotenv';
// require("dotenv").config();

const privateKey = process.env.PKEY;
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(privateKey, provider);

// Contract address and ABI
const contractAddress = '0xc4dd14d9edeb04e1021d7b8e46c64a523e9931d3';
const contractABI = [
    "function deposit() external payable",
    "function transfer(address to, uint256 amount) external",
    "function withdraw(uint256 amount) external",
    "function getBalance(address user) external view returns (uint256)",
    "function getTransactionHistory(address user) external view returns (tuple(address to, uint256 amount, uint256 timestamp)[])",
    "function owner() external view returns (address)"
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Check if the current wallet is the contract owner
async function checkOwner() {
    try {
        const owner = await contract.owner();
        console.log(`Contract owner is: ${owner}`);
    } catch (error) {
        console.error('Error fetching owner:', error);
    }
}

// Function to deposit Ether
async function deposit(amountInEther) {
    try {
        const amount = ethers.utils.parseEther(amountInEther.toString());
        const tx = await contract.deposit({ value: amount });
        console.log(`Deposit transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log('Deposit successful');
    } catch (error) {
        console.error('Error during deposit:', error);
    }
}

// Function to withdraw Ether
async function withdraw(amountInEther) {
    try {
        const amount = ethers.utils.parseEther(amountInEther.toString());
        const tx = await contract.withdraw(amount);
        console.log(`Withdrawal transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log('Withdrawal successful');
    } catch (error) {
        console.error('Error during withdrawal:', error);
    }
}

// Function to transfer funds to another user
async function transferFunds(toAddress, amountInEther) {
    try {
        const amount = ethers.utils.parseEther(amountInEther.toString());
        const tx = await contract.transfer(toAddress, amount);
        console.log(`Transfer transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log('Transfer successful');
    } catch (error) {
        console.error('Error during transfer:', error);
    }
}

// Function to get the balance of a user
async function getBalance(userAddress) {
    try {
        const balance = await contract.getBalance(userAddress);
        console.log(`Balance of ${userAddress}: ${ethers.utils.formatEther(balance)} ETH`);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Function to get the transaction history of a user
async function getTransactionHistory(userAddress) {
    try {
        const history = await contract.getTransactionHistory(userAddress);
        console.log(`Transaction history for ${userAddress}:`);
        history.forEach(tx => {
            console.log(`To: ${tx.to}, Amount: ${ethers.utils.formatEther(tx.amount)} ETH, Timestamp: ${new Date(tx.timestamp * 1000)}`);
        });
    } catch (error) {
        console.error('Error fetching transaction history:', error);
    }
}

// // Example usage
// (async () => {
//     const userAddress = wallet.address;

//     await checkOwner();  // Check owner of the contract

//     // 1. Get balance of the user
//     await getBalance(userAddress);

//     // 2. Deposit 0.1 ETH
//     await deposit(0.1);

//     // 3. Get balance again after deposit
//     await getBalance(userAddress);

//     // 4. Withdraw 0.05 ETH
//     await withdraw(0.05);

//     // 5. Get balance again after withdrawal
//     await getBalance(userAddress);

//     // 6. Transfer 0.02 ETH to another address (replace with a valid recipient address)
//     const recipientAddress = '0xe50D64F1e30fA6C728FfCAf2780D483A82B6e961';  // replace with actual recipient address
//     await transferFunds(recipientAddress, 0.02);

//     // 7. Get transaction history
//     await getTransactionHistory(userAddress);
// })();