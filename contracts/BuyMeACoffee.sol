// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BuyMeACoffee {
    // Event to emit when a Memo is created.
    event NewMemo(
       address indexed from,
       uint256 timestamp,
       string name,
       string message
    );

    // Memo Struct.
    struct Memo {
       address from;
       uint256 timestamp;
       string name;
       string message;
    }

    // List of all the memos recieved from friends
    Memo[] memos;

    //address of contract deployer
    address payable owner;
    
    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable  {
       require(msg.value > 0, "Can't buy coffee with 0 eth");

       memos.push(Memo(
          msg.sender,
          block.timestamp,
          _name,
          _message
         ));
       
       emit NewMemo(
        msg.sender,
        block.timestamp,
        _name,
        _message
        );
    }

   /* 
   *@dev Send the Entire balance on the contract to the owner 
   */
    function withdrawTips() public {
       require(owner.send(address(this).balance));
    }
    
    /*
    * @dev send all the memos recieved and stored on the blockchain
     */
    function getMemos() public view returns(Memo[] memory) {
      return memos;
    }
}
