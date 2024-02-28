import { useEffect, useState } from "react";

export const useFetchAuth = (url, options, auth) => {
  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(undefined);
    setIsError(false);
    setIsLoading(true);
    const controller = new AbortController();
    if (localStorage.getItem("auth-token")) {
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
    } else {
      throw new Error(`No Authentication`);
    }
    return () => {
      controller.abort();
    };
  }, [options, url]);

  return { data, isError, isLoading };
};
