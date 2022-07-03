import { getNftsForOwner } from "@alch/alchemy-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { alchemy } from "../../lib/alchemy";
import { NFT } from "../../types/nft";

// THIS IS UPDATE TO SUPPORT MORE PROTOCOL, THIS IS MANAGED BY DAO MODEL
export const SBT_CONTRACT_ADDRESS = "0x60576A64851C5B42e8c57E3E4A5cF3CF4eEb2ED6";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  if (typeof address != "string") {
    return res.status(500).send({ success: false });
  }
  const { ownedNfts } = await getNftsForOwner(alchemy, address, {
    contractAddresses: [SBT_CONTRACT_ADDRESS],
  });
  const nfts: NFT[] = ownedNfts.map((nft) => {
    return {
      address: SBT_CONTRACT_ADDRESS,
      tokenId: nft.tokenId,
      phrase: nft.title,
    };
  });
  return res.status(200).json(nfts);
};
