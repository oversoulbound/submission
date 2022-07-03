import { initializeAlchemy, Network } from "@alch/alchemy-sdk";

const settings = {
  apiKey: "demo",
  network: Network.MATIC_MUMBAI,
  maxRetries: 10,
};

export const alchemy = initializeAlchemy(settings);
