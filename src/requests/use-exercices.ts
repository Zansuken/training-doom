import { db } from "@/firebase";
import { ExerciseFormData, ExerciseType } from "@/types/exercise.type";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const updateExercise: (
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

const deleteExercise: (exerciseId: string) => Promise<void> = async (
  exerciseId: string
) => {
  const exerciseRef = doc(db, "exercises", exerciseId);
  await deleteDoc(exerciseRef);
};

const useExercices = (userId: string) => {
  const queryClient = useQueryClient();

  const getExercisesQuery = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getUserExercises(userId),
  });

  const createExerciseMutation = useMutation({
    mutationFn: (exercise: ExerciseFormData) =>
      createExercise(userId, exercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      addToast({
        title: "Exercise created",
        color: "success",
      });
    },
    onError: (error) => {
      console.error("Error creating exercise", error);
      addToast({
        title: "Error creating exercise",
        color: "danger",
      });
    },
  });

  const updateExerciseMutation = useMutation({
    mutationFn: ({
      userId,
      id,
      exercise,
    }: {
      userId: string;
      id: string;
      exercise: ExerciseFormData;
    }) => updateExercise(userId, id, exercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      addToast({
        title: "Exercise updated",
        color: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating exercise", error);
      addToast({
        title: "Error updating exercise",
        color: "danger",
      });
    },
  });

  const deleteExerciseMutation = useMutation({
    mutationFn: (exerciseId: string) => deleteExercise(exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      getExercisesQuery.refetch();
      addToast({
        title: "Exercise deleted",
        color: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting exercise", error);
      addToast({
        title: "Error deleting exercise",
        color: "danger",
      });
    },
  });

  return {
    getExercisesQuery,
    createExerciseMutation,
    updateExerciseMutation,
    deleteExerciseMutation,
  };
};

export default useExercices;
