import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { animationURIBase } from "../lib/constant";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const { address } = await deploy("Mediator", {
    from: deployer,
    args: [animationURIBase],
    log: true,
  });
  const Mediator = await hre.ethers.getContractFactory("Mediator");
  const mediator = await Mediator.attach(address);
  const { hash } = await mediator.possess(deployer);
  console.log("Minted:", hash);
};
export default func;
func.tags = ["Token"];
