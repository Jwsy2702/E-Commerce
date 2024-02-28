export const compareObjects = (obj1, obj2) => {
  // Get the keys of the objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over the keys and compare the values
  for (let key of keys1) {
    // Check if the corresponding key exists in both objects
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    // Compare the values
    const value1 = obj1[key];
    const value2 = obj2[key];

    // If the values are objects, recursively compare them
    if (typeof value1 === "object" && typeof value2 === "object") {
      if (!compareObjects(value1, value2)) {
        return false;
      }
    } else {
      // Compare primitive values
      if (value1 !== value2) {
        return false;
      }
    }
  }

  // If all key-value pairs are the same, return true
  return true;
};
