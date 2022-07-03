import Cors from "cors";
import { getNftsForOwner } from "@alch/alchemy-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { alchemyMainnet } from "../../lib/alchemy";
import { NFT } from "../../types/nft";
import { SBT_CONTRACT_ADDRESS } from "../../lib/constant";

// THIS IS UPDATE TO SUPPORT MORE PROTOCOL, THIS IS MANAGED BY DAO MODEL
const cors = Cors({
  methods: ["GET", "HEAD"],
});

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  const { address } = req.query;
  if (typeof address != "string") {
    return res.status(500).send({ success: false });
  }
  const { ownedNfts } = await getNftsForOwner(alchemyMainnet, address, {
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
