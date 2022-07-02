import { Box, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import React from "react";

import { getWeb3Modal } from "../lib/web3modal";

export const ConnectWallet: React.FC = () => {
  const router = useRouter();

  const connect = async () => {
    const web3Modal = getWeb3Modal();
    if (!web3Modal) {
      return;
    }
    await web3Modal.clearCachedProvider();
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    router.push(`/${address}`);
  };

  return (
    <Box py="52">
      <Button onClick={connect} size="lg" variant="outline" colorScheme="green">
        Connect Wallet
      </Button>
    </Box>
  );
};
