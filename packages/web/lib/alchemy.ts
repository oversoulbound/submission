import { initializeAlchemy, Network } from "@alch/alchemy-sdk";

const settings = {
  apiKey: "demo",
  network: Network.MATIC_MAINNET,
  maxRetries: 10,
};

export const alchemy = initializeAlchemy(settings);
