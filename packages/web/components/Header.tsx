import { Text } from "@chakra-ui/react";
import React from "react";

import { Link } from "./Link";

export const Header: React.FC = () => {
  return (
    <Link to="/">
      <Text
        mt="8"
        align="center"
        bgGradient="linear(to-tr, teal.300,yellow.400)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        OverSoul <br />
        🔥
      </Text>
    </Link>
  );
};
