pragma solidity ^0.5.16;

import './Token.sol';

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;   
    uint public rate = 100; // This soulden't be static

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        // Redemption rate = # token they receive for 1 ether
        // Amount of ethereum * Redemption rate
        uint tokenAmount = msg.value * rate;

        require(token.balanceOf(address(this)) >= tokenAmount);
        token.transfer(msg.sender, tokenAmount);

        // Emit event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        // User can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of Ether to token
        uint etherAmount = _amount / rate;
        require(address(this).balance >= etherAmount);
        token.transferFrom(msg.sender, address(this) , _amount);
        msg.sender.transfer(etherAmount);
        emit TokensSold(msg.sender, address(token), etherAmount, rate);

    }
}