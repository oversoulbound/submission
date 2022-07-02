import { ethers } from "ethers";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

import {
  COLLECTION_NAME,
  REGION,
  RPC,
  SBT_CONTRACT_ADDRESS,
  SPAN_AGGREGATE,
} from "../config";
import { IERC1155_ABI } from "../lib/ethers/IERC1155";
import { IKudos_ABI } from "../lib/ethers/IKudos";

//FIXME: blockNumber handling
//FIXME: use the graph
//FIXME: use batch for firestore

module.exports = functions
  .region(REGION)
  .pubsub.schedule(SPAN_AGGREGATE)
  .onRun(async () => {
    const address = SBT_CONTRACT_ADDRESS;
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const blockNumber = await provider.getBlockNumber();
    const erc1155Contract = new ethers.Contract(
      address,
      IERC1155_ABI,
      provider
    );
    const kudosContract = new ethers.Contract(address, IKudos_ABI, provider);
    const filter = erc1155Contract.filters.TransferSingle();
    const events = await erc1155Contract.queryFilter(
      filter,
      30255501,
      30255501
    );

    const db = getFirestore();
    const collection = db.collection(COLLECTION_NAME);

    for (const { args } of events) {
      if (!args) {
        return;
      }
      let { to, id } = args;
      to = to.toLowerCase();
      id = id.toString();
      const [phrase] = await kudosContract.getKudosMetadata(id);
      await collection.doc(to).set({
        tokens: [
          {
            address,
            id,
            phrase,
          },
        ],
      });
    }
    await collection.doc("status").set({ blockNumber });
    return;
  });
