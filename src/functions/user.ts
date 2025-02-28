import { db } from "@/firebase";
import { UserDetailsType } from "@/types/user.type";
import { addToast } from "@heroui/react";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

const getUser = async (id: string) => {
  try {
    const docRef = doc(db, "users", id);
    const userSnapshot = await getDoc(docRef);
    return userSnapshot.data();
  } catch (error) {
    console.error("Error getting user", error);
    addToast({
      title: "Error getting user",
      color: "danger",
    });
  }
};

const createUser = async (id: string, data: UserDetailsType) => {
  try {
    const docRef = doc(db, "users", id);
    await setDoc(docRef, data);
  } catch (error) {
    console.error("Error creating user", error);
    addToast({
      title: "Error creating user",
      color: "danger",
    });
  }
};

const updateUser = async (id: string, data: UserDetailsType) => {
  try {
    const docRef = doc(db, "users", id);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error updating user", error);
    addToast({
      title: "Error updating user",
      color: "danger",
    });
  }
};

export { createUser, getUser, updateUser };
