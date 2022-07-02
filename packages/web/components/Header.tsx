import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React from "react";

import { injected } from "../lib/web3";

export interface HeaderProps {
  isLanding?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const { activate, account, deactivate } = useWeb3React<Web3Provider>();
  const connect = async () => {
    activate(injected);
  };

  return (
    <Box>
      <Flex minH={"64px"} alignItems={"center"} justifyContent={"space-between"} py="8" px="4">
        <Link fontSize="2xl" fontWeight={"bold"} href="/" _focus={{ boxShadow: "none" }} color="white">
          OverSoul
        </Link>
        <Flex gap={"1"}>
          <>
            {!account ? (
              <Button onClick={connect} fontSize={"xs"} rounded={"2xl"}>
                Connect Wallet
              </Button>
            ) : (
              <>
                <Button fontSize={"xs"} maxWidth={"32"} rounded={"2xl"} onClick={deactivate}>
                  <Text noOfLines={1}>{account}</Text>
                </Button>
              </>
            )}
          </>
        </Flex>
      </Flex>
    </Box>
  );
};
