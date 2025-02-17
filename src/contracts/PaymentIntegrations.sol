// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract PaymentsInterface {

    address public owner;
    mapping(address => uint256) private balances;
    mapping(address => Transaction[]) private transactions;

    struct Transaction {
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Record transaction
        transactions[msg.sender].push(Transaction(to, amount, block.timestamp));
        transactions[to].push(Transaction(msg.sender, amount, block.timestamp));
    }

    function getTransactionHistory(address user) public view returns (Transaction[] memory) {
        return transactions[user];
    }
}
