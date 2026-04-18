/**
 * vehicles collection
 * Fields: name, category, fuelType, seatingCapacity, luggageCapacity,
 *         finalPrice, originalPrice, kmCharges, hasAC,
 *         roofCarrierAvailable, roofCarrierPrice, cancellationPolicy,
 *         offerCode, offerText, taxIncludedText, icon, imageUrl, publicId, createdAt
 */
import {
  collection, getDocs, addDoc, deleteDoc,
  doc, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const COL = "vehicles";

export const getVehicles = async () => {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addVehicle = async (data) => {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateVehicle = async (id, data) => {
  return updateDoc(doc(db, COL, id), data);
};

export const deleteVehicle = async (id) => {
  return deleteDoc(doc(db, COL, id));
};
