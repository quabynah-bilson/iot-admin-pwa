import { kUsersRef } from "../../utils/constants";
import admin from "../../utils/firebase.admin";

// get all users
export default async function handler(_req, res) {
  let db = admin.firestore();
  let snapshots = await db.collection(kUsersRef).get();
  let users = snapshots.docs.map((doc) => doc.data());
  return res.status(200).json(users);
}
