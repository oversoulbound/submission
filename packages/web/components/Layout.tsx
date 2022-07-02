import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex minHeight={"100vh"} direction={"column"} backgroundColor="black">
      <Header />
      <Box flex={1}>
        <Container>
          <Flex justify="center">{children}</Flex>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};
Footer;
