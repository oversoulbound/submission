//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Mediator is ERC165, IERC721, IERC721Metadata {
  mapping(address => bool) public possesed;

  string public animationURLBase;

  constructor(string memory animationURLBase_) {
    animationURLBase = animationURLBase_;
  }

  function possess(address owner) public {
    require(!possesed[owner], "Mediator: already possesed");
    possesed[owner] = true;
    uint256 tokenId = addressToTokenId(owner);
    emit Transfer(address(0x0), owner, tokenId);
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes calldata data
  ) public override {
    revert("Mediator: Not Implemented");
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId
  ) external override {
    revert("Mediator: Not Implemented");
  }

  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public override {
    revert("Mediator: Not Implemented");
  }

  function approve(address to, uint256 tokenId) public override {
    revert("Mediator: Not Implemented");
  }

  function setApprovalForAll(address operator, bool _approved) public override {
    revert("Mediator: Not Implemented");
  }

  function getApproved(uint256 tokenId) public view override returns (address operator) {
    revert("Mediator: Not Implemented");
  }

  function isApprovedForAll(address owner, address operator) public view override returns (bool) {
    revert("Mediator: Not Implemented");
  }

  function name() public view override returns (string memory) {
    return "Oversoul Mediator";
  }

  function symbol() public view override returns (string memory) {
    return "OM";
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    address owner = tokenIdToAddress(tokenId);
    string memory ownerAddressString = _bytesToString(abi.encodePacked(owner));
    bytes memory metadata = abi.encodePacked(
      '{"name":"Oversoul Mediator #',
      Strings.toString(tokenId),
      '","description": "A visualised onchain identity with SBT"',
      ',"animation_url":"',
      abi.encodePacked(animationURLBase, ownerAddressString),
      '"}'
    );
    return string(abi.encodePacked("data:application/json;base64,", Base64.encode(metadata)));
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC165, IERC165) returns (bool) {
    return
      interfaceId == type(IERC721).interfaceId ||
      interfaceId == type(IERC721Metadata).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function balanceOf(address owner) public view override returns (uint256 balance) {
    return possesed[owner] ? 1 : 0;
  }

  function ownerOf(uint256 tokenId) public pure override returns (address owner) {
    return tokenIdToAddress(tokenId);
  }

  function addressToTokenId(address owner) public pure returns (uint256) {
    return uint256(uint160(owner));
  }

  function tokenIdToAddress(uint256 tokenId) public pure returns (address) {
    return address(uint160(tokenId));
  }

  function _bytesToString(bytes memory input) internal pure returns (string memory) {
    bytes memory alphabet = "0123456789abcdef";
    bytes memory output = new bytes(2 + input.length * 2);
    output[0] = "0";
    output[1] = "x";
    for (uint256 i = 0; i < input.length; i++) {
      output[2 + i * 2] = alphabet[uint256(uint8(input[i] >> 4))];
      output[3 + i * 2] = alphabet[uint256(uint8(input[i] & 0x0f))];
    }
    return string(output);
  }
}
