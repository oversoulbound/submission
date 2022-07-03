import { initializeAlchemy, Network } from "@alch/alchemy-sdk";

export const alchemyTestNet = initializeAlchemy({
  apiKey: "demo",
  network: Network.MATIC_MUMBAI,
  maxRetries: 10,
});

export const alchemyMainnet = initializeAlchemy({
  apiKey: "demo",
  network: Network.MATIC_MAINNET,
  maxRetries: 10,
});
