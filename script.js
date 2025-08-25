let web3;
let contract;
let account;
import contractABI from './abi.js';

const contractAddress = "0xaa2141F94838401567C22c92eFd34Da57E55F2eB"; // Replace with your deployed contract
const contractABI = [[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_bankAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_registerNumber",
				"type": "uint256"
			}
		],
		"name": "addBank",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_provider",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_regNo",
				"type": "uint256"
			}
		],
		"name": "addKYCProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_bankAddress",
				"type": "address"
			}
		],
		"name": "removeBank",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_provider",
				"type": "address"
			}
		],
		"name": "removeKYCProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentHash",
				"type": "string"
			}
		],
		"name": "submitKYC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "verifyKYC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bankAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bankList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getFullKYC",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum DecentralizedKYC.Status",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getKYCStatus",
		"outputs": [
			{
				"internalType": "enum DecentralizedKYC.Status",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "kycProviders",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "kycRecords",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "documentHash",
				"type": "string"
			},
			{
				"internalType": "enum DecentralizedKYC.Status",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "verifiedBy",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registeredBanks",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "registerNumber",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        document.getElementById("connectBtn").addEventListener("click", connectWallet);
    } else {
        alert("Please install MetaMask");
    }
});

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Correct way to access the `admin` state variable
        const adminAddress = await contract.methods.admin().call();
        console.log('Admin Address:', adminAddress);
    }
}


async function addBank() {
    const name = document.getElementById("bankName").value;
    const address = document.getElementById("bankAddress").value;
    const regNo = document.getElementById("registerNumber").value;

    try {
        await contract.methods.addBank(name, address, regNo).send({ from: account });
        document.getElementById("adminLogs").textContent = "✅ Bank added successfully.";
    } catch (error) {
        document.getElementById("adminLogs").textContent = `❌ Failed to add bank: ${error.message}`;
    }
}

async function removeBank() {
    const address = document.getElementById("bankAddress").value;

    try {
        await contract.methods.removeBank(address).send({ from: account });
        document.getElementById("adminLogs").textContent = "✅ Bank removed successfully.";
    } catch (error) {
        document.getElementById("adminLogs").textContent = `❌ Failed to remove bank: ${error.message}`;
    }
}
