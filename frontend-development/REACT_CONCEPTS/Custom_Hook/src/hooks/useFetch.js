import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchFn();
        setFetchedData(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFn]);

  return {
    fetchedData,
    isFetching,
    error,
    setFetchedData,
  };
}

//NOTE: the state use within a custom hook is herited by the function component that uses the custom hook
//The state produced or provided by a custom is independent for each component that calls. The change in one of a components state value used in the custom hook
//does not affect the state of the other components that use the custom hook.
