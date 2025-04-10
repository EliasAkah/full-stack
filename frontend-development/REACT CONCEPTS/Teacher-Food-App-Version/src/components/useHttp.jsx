import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Ccould not fetch the information");
  }

  return resData;
}

export default function useHttp(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialValue);
  }

  //using async function to define a function that handles how the request sent would be used to update some states
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true); // set to true because we want to begin sending the request.
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data }); //accepts the response data that this function returns
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false); // set to force becos whether a response or an error is given returned the isPending state of the promise ceases
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  //returning an object that contains some properties so that any component calling the custom hook useHttp can have access to those parameters

  console.log("Data form useHttp", data);
  console.log("loading state from useHttp", isLoading);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}

//we have two components that needs to call sendRequest(). one should call it immediately the component renders ,
//the order has to call manually. to satisfy the first case we have to call sendRequest() if some conditions are satisfied within a useEffect hook and assign it as a dependency to useEffect hook
// to satisfy the second case we pass the sendRequest() as a property of the object that is returned so that the component calling the custom hook
//can have access to it when the need arises
