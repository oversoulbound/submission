import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  return (
    <NextLink href={to} passHref>
      <ChakraLink style={{ textDecoration: "none" }}>{children}</ChakraLink>
    </NextLink>
  );
};
