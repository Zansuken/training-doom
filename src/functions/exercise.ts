import { db } from "@/firebase";
import { addToast } from "@heroui/react";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { ExerciseType } from "@/types/exercise.type";

const getUserExercises: (
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

export { getUserExercises };
