/**
 * destinations collection
 * Fields: name, desc, imageUrl, publicId, createdAt
 */
import {
  collection, getDocs, addDoc, deleteDoc,
  doc, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const COL = "destinations";

export const getDestinations = async () => {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addDestination = async ({ name, desc, state, isPopular, isHolyPlace, imageUrl, publicId }) => {
  return addDoc(collection(db, COL), {
    name, desc,
    state: state || null,
    isPopular: isPopular || false,
    isHolyPlace: isHolyPlace || false,
    imageUrl, publicId,
    createdAt: serverTimestamp(),
  });
};

export const updateDestination = async (id, data) => {
  return updateDoc(doc(db, COL, id), data);
};

export const deleteDestination = async (id) => {
  return deleteDoc(doc(db, COL, id));
};
