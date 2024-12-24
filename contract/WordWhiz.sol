// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMemeCoin {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract GuessTheWord {
    address public owner;
    address public memeCoinAddress;
    address[] public players;
    uint256 public constant STAKE_AMOUNT = 0.5e18;
    uint256 public constant HINT_COST = 5;
    uint256 public constant WIN_REWARD = 0.1e18;

    mapping(address => bool) public hasJoined;

    constructor(address _memeCoinAddress) {
        owner = msg.sender;
        memeCoinAddress = _memeCoinAddress;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function joinGame() external {
        require(!hasJoined[msg.sender], "Already joined");
        IMemeCoin memeCoin = IMemeCoin(memeCoinAddress);
        require(memeCoin.transferFrom(msg.sender, address(this), STAKE_AMOUNT), "Stake transfer failed");
        players.push(msg.sender);
        hasJoined[msg.sender] = true;
    }

    function rewardWinner(address winner) external onlyOwner {
        IMemeCoin memeCoin = IMemeCoin(memeCoinAddress);
        require(memeCoin.transfer(winner, WIN_REWARD), "Reward transfer failed");
    }

    function resetPlayers() external onlyOwner {
        for (uint256 i = 0; i < players.length; i++) {
            hasJoined[players[i]] = false;
        }
        delete players;
    }

    function getPlayers() external view returns (address[] memory) {
        return players;
    }
}
