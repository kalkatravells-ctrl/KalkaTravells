/**
 * destinations collection
 * Fields: name, desc, imageUrl, publicId, createdAt
 */
import {
  collection, getDocs, addDoc, deleteDoc,
  doc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const COL = "destinations";

export const getDestinations = async () => {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addDestination = async ({ name, desc, imageUrl, publicId }) => {
  return addDoc(collection(db, COL), {
    name, desc, imageUrl, publicId,
    createdAt: serverTimestamp(),
  });
};

export const deleteDestination = async (id) => {
  return deleteDoc(doc(db, COL, id));
};
