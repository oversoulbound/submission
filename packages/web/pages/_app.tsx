import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  function getLibrary(provider: ExternalProvider) {
    return new Web3Provider(provider, "any");
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
