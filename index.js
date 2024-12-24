const contractAddress = "0x6ca990Eda280A9e67A209ea6BF4b13B28991622d"; // Replace with deployed contract address
        const memeCoinAddress = "0x4fe141360A453cdD2953e637C82CD032534E1c9A";
		const contractABI = [
			{
				"inputs": [],
				"name": "joinGame",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "resetPlayers",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					}
				],
				"name": "rewardWinner",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_memeCoinAddress",
						"type": "address"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"inputs": [],
				"name": "getPlayers",
				"outputs": [
					{
						"internalType": "address[]",
						"name": "",
						"type": "address[]"
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
				"name": "hasJoined",
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
				"inputs": [],
				"name": "memeCoin",
				"outputs": [
					{
						"internalType": "contract IERC20",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "owner",
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
				"name": "players",
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
				"inputs": [],
				"name": "STAKE_AMOUNT",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "WIN_REWARD",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		];

let web3;
let contract;
let accounts;
let memeCoinContract;

const memeCoinABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "claimTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
// Word data (stored on the client)
const words = [
    { word: "apple", meanings: ["a fruit", "a tech company", "something round"] },
    { word: "block", meanings: ["a solid piece", "a group of data in blockchain", "to obstruct"] },
    { word: "key", meanings: ["a tool to unlock", "an important factor", "a musical note"] },
    { word: "light", meanings: ["not heavy", "brightness", "something that guides"] },
    { word: "bank", meanings: ["a financial institution", "the side of a river", "to tilt an airplane"] },
    { word: "mouse", meanings: ["a small rodent", "a computer device", "a timid person"] },
    { word: "fire", meanings: ["combustion", "to dismiss someone", "a strong emotion"] },
    { word: "rock", meanings: ["a stone", "a music genre", "to sway back and forth"] },
    { word: "ring", meanings: ["a circular band", "a sound of a bell", "an organized group"] },
    { word: "water", meanings: ["a liquid essential for life", "to irrigate plants", "to dilute something"] },
    { word: "cloud", meanings: ["a mass of water vapor", "a metaphor for confusion", "a technology for storage"] },
    { word: "spring", meanings: ["a season", "a coiled metal piece", "to leap"] },
    { word: "watch", meanings: ["a timepiece", "to observe", "a period of alertness"] },
    { word: "plant", meanings: ["a living organism", "a factory", "to place something in the ground"] },
    { word: "paper", meanings: ["a material for writing", "a research article", "a legal document"] },
    { word: "train", meanings: ["a series of connected vehicles", "to practice a skill", "to aim or direct"] },
    { word: "star", meanings: ["a celestial object", "a celebrity", "a rating symbol"] },
    { word: "date", meanings: ["a calendar day", "a romantic meeting", "a type of fruit"] },
    { word: "field", meanings: ["an open area of land", "a branch of study", "a space for input"] },
    { word: "bear", meanings: ["a large mammal", "to endure", "to carry"] }
];

let currentWordIndex = 0;
let hintsUsed = 0;
let defaultAccount;

// Connect wallet
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        accounts = await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
		memeCoinContract = new web3.eth.Contract(memeCoinABI, memeCoinAddress);
        document.getElementById("walletStatus").innerText = "Wallet connected: " + accounts[0];
		updateStats();
		defaultAccount=accounts[0]
    } else {
        alert("Please install MetaMask!");
    }
}

async function claimTokens() {
    if (!defaultAccount) {
        alert("Please connect your wallet.");
        return;
    }

    try {
        // Call the claim function from the TUC contract to claim tokens
        await memeCoinContract.methods.claimTokens(web3.utils.toWei("10", "ether")).send({ from: defaultAccount });
        alert("Tokens successfully claimed!");
		updateStats()
    } catch (error) {
        console.error("Error claiming tokens: ", error);
        alert("Failed to claim tokens.");
    }
}

// Join game
async function joinGame() {
    try {
		const moveFee=0.5e18;
		await memeCoinContract.methods.approve(contractAddress, moveFee).send({ from: accounts[0] });
        await contract.methods.joinGame().send({ from: accounts[0] });
        alert("You joined the game!");
		showDefaultHint();
		updateStats();
    } catch (err) {
        console.error(err);
        alert("Error joining the game.");
    }
}

// Show default hint
function showDefaultHint() {
    const defaultHint = words[currentWordIndex].meanings[0];
    alert("Default Hint: " + defaultHint);
    hintsUsed = 1; // Default hint already shown
}

async function updateStats() {
    try {
        // Fetch the user's MemeCoin balance from the MemeCoin contract
        const balance = await memeCoinContract.methods.balanceOf(accounts[0]).call();
        console.log('MemeCoin balance:', balance);  // Debug log
        document.getElementById("balance").textContent = `${web3.utils.fromWei(balance, 'ether')} MemeCoins`;
        } catch (error) {
        console.error("Error updating stats:", error);
    }
}

// Get a hint
async function getHint() {
    if (hintsUsed >= words[currentWordIndex].meanings.length) {
        alert("No more hints available!");
        return;
    }

    try {
        // Deduct the hint cost in Solidity
        // await contract.methods.useHint().send({ from: accounts[0] });
        alert("Hint: " + words[currentWordIndex].meanings[hintsUsed]);
        hintsUsed++;
    } catch (err) {
        console.error(err);
        alert("Error deducting hint cost.");
    }
}

// Check the guess
async function guessWord(guess) {
	const reward = 0.1e18;
    const correctWord = words[currentWordIndex].word.toLowerCase();
    if (guess.toLowerCase() === correctWord) {
        try {
			await memeCoinContract.methods.approve(contractAddress, reward).send({ from: accounts[0] });
            await contract.methods.rewardWinner(accounts[0]).send({ from: accounts[0] });
            alert("Correct! You've won the reward.");
            resetGame();
			updateStats();
        } catch (err) {
            console.error(err);
            alert("Error rewarding the winner.");
        }
    } else {
        alert("Wrong guess! Try again.");
    }
}

// Reset the game
function resetGame() {
	updateStats();
    hintsUsed = 0;
    currentWordIndex = (currentWordIndex + 1) % words.length; // Move to the next word
    showDefaultHint();
}

// Reset players (admin only)
async function resetPlayers() {
    try {
        await contract.methods.resetPlayers().send({ from: accounts[0] });
        alert("Players reset successfully!");
    } catch (err) {
        console.error(err);
        alert("Error resetting players.");
    }
}

// Event listeners
document.getElementById("connectWalletButton").addEventListener("click", connectWallet);
document.getElementById("joinButton").addEventListener("click", joinGame);
document.getElementById("getHintButton").addEventListener("click", getHint);
document.getElementById("guessButton").addEventListener("click", () => {
    const guess = document.getElementById("guessInput").value;
    guessWord(guess);
});
document.getElementById("resetPlayersButton").addEventListener("click", resetPlayers);
