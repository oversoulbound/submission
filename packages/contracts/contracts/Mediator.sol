//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract Mediator is ERC165 {
    mapping(address => bool) public possesed;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    function possess(address owner) public {
        require(!possesed[owner], "Mediator: already possesed");
        possesed[owner] = true;
        emit Transfer(address(0x0), owner, 0);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return possesed[owner] ? 1 : 0;
    }

    function ownerOf(uint256 tokenId) public pure returns (address owner) {
        return tokenIdToAddress(tokenId);
    }

    //TODO: implement
    function addressToTokenId(address owner) public pure returns (uint256) {
        return 0;
    }

    //TODO: implement
    function tokenIdToAddress(uint256 tokenId) public pure returns (address) {
        return address(0x0);
    }
}
