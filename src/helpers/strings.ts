export const capitalize = (str: string) => {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } catch (error) {
    console.error(`Error in capitalize: ${error}`);
    return str;
  }
};
