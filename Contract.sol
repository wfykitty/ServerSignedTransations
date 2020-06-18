pragma solidity ^0.6.0;
contract Test {
    address owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function getOwner() public view returns (address) {
        return owner;
    }
    
    function setOwner(address newOwner) public {
        owner = newOwner;
    }
}