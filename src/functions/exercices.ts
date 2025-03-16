import { db } from "@/firebase";
import { ExerciseFormData, ExerciseType } from "@/types/exercise.type";
import { addToast } from "@heroui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";

export const getUserExercises: (
  userId: string
) => Promise<ExerciseType[] | undefined> = async (userId: string) => {
  const q = query(collection(db, "exercises"), where("userId", "==", userId));
  try {
    const exercisesSnapshot = await getDocs(q);
    return exercisesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ExerciseType[];
  } catch (error) {
    console.error("Error getting user exercises", error);
    addToast({
      title: "Error getting user exercises",
      color: "danger",
    });
  }
};

export const getUserExercisesNames: (
  userId: string
) => Promise<string[] | undefined> = async (userId: string) => {
  const q = query(collection(db, "exercises"), where("userId", "==", userId));
  try {
    const exercisesSnapshot = await getDocs(q);
    return exercisesSnapshot.docs.map((doc) => doc.data().name) as string[];
  } catch (error) {
    console.error("Error getting user exercises names", error);
    addToast({
      title: "Error getting user exercises names",
      color: "danger",
    });
  }
};

export const createExercise: (
  userId: string,
  exercise: ExerciseFormData
) => Promise<void> = async (userId: string, exercise: ExerciseFormData) => {
  // Create a reference to a new document with auto-generated ID
  const exerciseRef = doc(collection(db, "exercises"));

  await setDoc(exerciseRef, {
    userId,
    ...exercise,
  });
};

export const updateExercise: (
  userId: string,
  exerciseId: string,
  exercise: ExerciseFormData
) => Promise<void> = async (userId, exerciseId, exercise) => {
  const exerciseRef = doc(db, "exercises", exerciseId);
  await setDoc(exerciseRef, {
    id: exerciseId,
    userId,
    ...exercise,
  });
};

export const deleteExercise: (exerciseId: string) => Promise<void> = async (
  exerciseId: string
) => {
  const exerciseRef = doc(db, "exercises", exerciseId);
  await deleteDoc(exerciseRef);
};
