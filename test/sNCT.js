const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("sNCT contract", function () {

    let sNCT;
    let deployedSNCT;
    let owner;
    let addrs;
  

    beforeEach(async function () {

        // Get the ContractFactory and Signers here.
        [owner, ...addrs] = await ethers.getSigners();

        sNCT = await ethers.getContractFactory("sNCT");
   
        deployedSNCT = await sNCT.deploy("Synthetic NCT","sNCT");
        
    });

    describe("Minting", function(){

        it("Should only allow the authorized minter to mint sNCT", async function () {
            await expect(deployedSNCT.connect(addrs[0]).mint(addrs[1].address, 100)).to.be.reverted;
        });

        it("Should mint sNCT to the correct address and amount", async function () {
            await deployedSNCT.mintWithEvent(addrs[1].address, 100, BigInt("0xbda1ccc0eb18882ff313738cdf341f45f71b953b0a7a47bda55045b4e17c185d"));
            expect(await deployedSNCT.balanceOf(addrs[1].address)).to.equal(100);
        });

        it("Should increment the total supply correctly after mint", async function () {
            await deployedSNCT.mintWithEvent(addrs[1].address, 4000, BigInt("0xbda1ccc0eb18882ff313738cdf341f45f71b953b0a7a47bda55045b4e17c185d"));
            await deployedSNCT.mintWithEvent(addrs[2].address, 4000, BigInt("0xbda1ccc0eb18882ff313738cdf341f45f71b953b0a7a47bda55045b4e17c185d"));
            expect(await deployedSNCT.totalSupply()).to.equal(8000);
        });

     
        
    });

});