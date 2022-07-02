import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import { Link } from "./Link";

export const Footer: React.FC = () => {
  return (
    <Flex minH={"64px"} alignItems={"center"} justifyContent={"center"} p={{ base: 4 }} gap={"16px"}>
      <Link to="/">
        <Text
          fontSize={"xs"}
          fontWeight={"medium"}
          align="center"
          bgGradient="linear(to-tr, teal.300,yellow.400)"
          bgClip="text"
        >
          OverSoul @ Tokyo Hacker House - Polygon
        </Text>
      </Link>
    </Flex>
  );
};
