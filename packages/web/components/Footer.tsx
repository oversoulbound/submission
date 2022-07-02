import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <Flex minH={"64px"} alignItems={"center"} justifyContent={"center"} p={{ base: 4 }} gap={"16px"}>
      <Text fontSize={"xs"} fontWeight={"medium"} color="white">
        OverSoul @ Tokyo Hacker House - Polygon
      </Text>
    </Flex>
  );
};
