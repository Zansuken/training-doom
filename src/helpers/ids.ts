const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
export const generateId = () => {
  return (
    Array.from(
      { length: 10 },
      () => letters[Math.floor(Math.random() * letters.length)]
    ).join("") +
    Array.from(
      { length: 5 },
      () => numbers[Math.floor(Math.random() * numbers.length)]
    ).join("")
  );
};
