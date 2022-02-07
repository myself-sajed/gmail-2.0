import { collection } from "firebase/firestore";
import { db } from "./firebase";

const mailRef = collection(db, 'emails',);

export { mailRef }