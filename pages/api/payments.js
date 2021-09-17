import { kPaymentsRef } from "../../utils/constants";
import admin from "../../utils/firebase.admin";

// get all users
export default async function handler(req, res) {
  let db = admin.firestore();
  console.log(req.method);
  if (req.method === "GET") {
    let snapshots = await db.collection(kPaymentsRef).get();
    let data = snapshots.docs.map((doc) => doc.data());
    return res.status(200).json(data);
  } else {
    let { user } = req.body;
    console.log(`user => ${user}`);
    // get all payments made by user
    if (user) {
      let snapshots = await db
        .collection(kPaymentsRef)
        .where("client", "==", user)
        .get();
      let data = snapshots.docs.map((doc) => doc.data());
      return res.status(200).json(data);
    } else {
      let snapshots = await db.collection(kPaymentsRef).get();
      let data = snapshots.docs.map((doc) => doc.data());
      return res.status(200).json(data);
    }
  }
}
