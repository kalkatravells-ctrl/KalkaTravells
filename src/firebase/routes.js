/**
 * routes collection
 * Fields: from, to, vehicleId, vehicleName, price, duration, createdAt
 */
import {
  collection, getDocs, addDoc, deleteDoc,
  doc, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const COL = "routes";

export const getRoutes = async () => {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addRoute = async (data) => {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateRoute = async (id, data) => {
  return updateDoc(doc(db, COL, id), data);
};

export const deleteRoute = async (id) => {
  return deleteDoc(doc(db, COL, id));
};
