import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

import { COLLECTION_NAME,REGION } from "../config";

module.exports = functions.region(REGION).https.onRequest(async (req, res) => {
  let address = req.query.address;
  if (typeof address != "string") {
    res.send([]);
    return;
  }
  address = address.toLowerCase();
  const db = getFirestore();
  const doc = await db.collection(COLLECTION_NAME).doc(address).get();
  const data = doc.data();
  if (!data) {
    res.send([]);
    return;
  }
  const { tokens } = data;
  if (!tokens) {
    res.send([]);
  }
  res.send(tokens);
});
