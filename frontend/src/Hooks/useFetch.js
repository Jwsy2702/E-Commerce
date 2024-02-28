import { useEffect, useState } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(undefined);
    setIsError(false);
    setIsLoading(true);
    const controller = new AbortController();
    fetch(url, { signal: controller.signal, ...options })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.error(res);
        }
      })
      .then(setData)
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setIsError(true);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [options, url]);

  return { data, isError, isLoading };
};

export const useAuthFetch = (url, authToken, cartOptions) => {
  if (!authToken) throw new Error("No auth token provided");
  const options = authToken
    ? {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        ...cartOptions,
      }
    : null;

  return useFetch(url, options);
};
