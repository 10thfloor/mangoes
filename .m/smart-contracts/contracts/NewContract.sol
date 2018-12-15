
pragma solidity ^0.4.24;

import "zos-lib/contracts/Initializable.sol";

contract NewContract is Initializable {

  uint256 public x;
  string public s;

  function initialize(uint256 _x, string _s) initializer public {
    a = _x;
    b = _s;
  }
}
