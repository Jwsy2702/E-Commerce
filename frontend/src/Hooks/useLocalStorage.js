import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    //if value doesnt exist in local storage, use default initial value
    if (localValue == null) {
      if (typeof initialValue == "function") return initialValue();
      return initialValue;
    } else {
      //need to properly serialise json. Convert it from string to actual js object, array, whatever it is
      return JSON.parse(localValue);
    }
  });

  //easiest way to persist things into localStorage is useEffect. Every time value changes, add it to local storage.
  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      //whatever it is, array, object, string, convert it to json string
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
};
