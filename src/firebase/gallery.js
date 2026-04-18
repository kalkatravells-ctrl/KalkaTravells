/**
 * gallery collection
 * Fields: url, publicId, name, createdAt
 */
import {
  collection, getDocs, addDoc, deleteDoc,
  doc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const COL = "gallery";

export const getGallery = async () => {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addGalleryImage = async ({ url, publicId, name }) => {
  return addDoc(collection(db, COL), {
    url, publicId, name,
    createdAt: serverTimestamp(),
  });
};

export const deleteGalleryImage = async (id) => {
  return deleteDoc(doc(db, COL, id));
};
