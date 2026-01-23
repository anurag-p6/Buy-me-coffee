// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BuyMeACoffee {

    error notOwner();
    error withdrawalFailed();
    error LessThanMinimumAmount();
    // Event to emit when a Memo is created.
    event NewMemo(
       address indexed from,
       uint256 timestamp,
       string name,
       string message,
       uint256 amount
    );

    // Memo Struct.
    struct Memo {
       address from;
       uint256 timestamp;
       string name;
       string message;
       uint256 amount;
    }

    // List of all the memos recieved from friends
    Memo[] memos;

    //address of contract deployer
    address payable immutable owner;


    /**
     * @dev modifier to check if the caller is the owner of the contract
     */
    modifier onlyOwner() {
      if(msg.sender != owner) {
        revert notOwner();
      }
      _;
    }
    
    constructor() {
        owner = payable(msg.sender);
    }

    /** 
     * @notice send the ETH with the specified name and message to the contract
     * @dev this function is payable
     * @param _name with memory starage specifier
     * @param _message with memory starage specifier
     */
    function buyCoffee(string memory _name, string memory _message) public payable  {
      //  require(msg.value >= 0.001 ether, "Can't buy coffee with < 0.001 eth"); // I'm using the ether to convert the msg.value to wei

       if(msg.value < 0.001 ether){
         revert LessThanMinimumAmount(); 
      }

       memos.push(Memo(
          msg.sender,
          block.timestamp,
          _name,
          _message,
          msg.value
         ));
       
       emit NewMemo(
        msg.sender,
        block.timestamp,
        _name,
        _message,
         msg.value
        );
    }

   /* 
   *@dev Send the Entire balance on the contract to the owner 
   */
    function withdrawTips() public onlyOwner{
       (bool success, ) = owner.call{value: address(this).balance}("");
       if(!success){
         revert withdrawalFailed();
       }
    }
    
    /*
    * @dev send all the memos recieved and stored on the blockchain
     */
    function getMemos() public view returns(Memo[] memory) {
      return memos;
    }
}

// learning concept
// Constant | Immutable keywords are gas efficient in this contract we can use use Immutable keyword for the owner address
// because it is set only once in the constructor and never changes.
// Constant keyword is used for variables that are not going to change at all in the contract lifetime