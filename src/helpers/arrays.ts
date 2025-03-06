export const compareArrays = (arr1: any[], arr2: any[]) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
};
