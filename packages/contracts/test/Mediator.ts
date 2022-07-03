import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { animationURIBase } from "../lib/constant";
import { Mediator } from "../typechain";

const ERC721_INTERFACE_ID = "0x80ac58cd";
const ERC721METADATA_INTERFACE_ID = "0x5b5e139f";

describe("Mediator", function () {
  let mediator: Mediator;
  let signer: SignerWithAddress;

  beforeEach(async function () {
    [signer] = await ethers.getSigners();
    const Mediator = await ethers.getContractFactory("Mediator");
    mediator = await Mediator.deploy(animationURIBase);
    await mediator.deployed();
  });

  it("Address & Token ID conversion", async function () {
    const tokenId = await mediator.addressToTokenId(signer.address);
    const address = await mediator.tokenIdToAddress(tokenId);
    expect(signer.address).to.equal(address);
  });

  it("supportsInterface", async function () {
    expect(await mediator.supportsInterface(ERC721_INTERFACE_ID)).to.equal(true);
    expect(await mediator.supportsInterface(ERC721METADATA_INTERFACE_ID)).to.equal(true);
  });

  it("possess", async function () {
    await mediator.possess(signer.address);
    const possesed = await mediator.possesed(signer.address);
    expect(possesed).to.equal(true);
    await expect(mediator.possess(signer.address)).to.revertedWith("Mediator: already possesed");
  });

  it("ownerOf", async function () {
    const tokenId = await mediator.addressToTokenId(signer.address);
    const owner = await mediator.ownerOf(tokenId);
    expect(signer.address).to.equal(owner);
  });

  it("balanceOf", async function () {
    const originalBalance = await mediator.balanceOf(signer.address);
    expect(originalBalance).to.equal(0);
    await mediator.possess(signer.address);
    const changedBalance = await mediator.balanceOf(signer.address);
    expect(changedBalance).to.equal(1);
  });

  it("tokenURI", async function () {
    const tokenId = await mediator.addressToTokenId(signer.address);
    const tokenURI = await mediator.tokenURI(tokenId);
    console.log(tokenURI);
  });
});
