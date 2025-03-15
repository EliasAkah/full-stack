import {useState, useEffect} from "react";
import Places from './Places.jsx';
import Error from "./Error.jsx"
import {sortPlacesByDistance} from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [errorState, setErrorState] = useState();

  useEffect(() => {
      //fetching data from the backend server asynchronously
      async function fetchingPlaces(){
        setIsLoading(true)
        try{
          //inserting a code that has the tendency to cause an error
          const response = await fetch('http://localhost:3000/places')

          //checking if response is not ok(400, 500) and throwing an error to enscure that the application crashes so that the catch function can display and error message to the user
          if(!response.ok){
            const error  = new Error('Failed to fetch places')
            throw error
          }

          const realData = await response.json()

          //get user's location but does not return any value
          navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(realData.places, position.coords.latitude, position.coords.longitude);
            console.log(sortedPlaces)
            setAvailablePlaces(sortedPlaces)//set the sorted places to store
            setIsLoading(false)
          }, (error) => {
            alert(`ERROR(${error.code}): ${error.message}`);
            setIsLoading(false)
          })

        }catch(error){
          setErrorState({message: error.message || "Could not fetch data from the given URL"})
          setIsLoading(false)
        }
      }

      fetchingPlaces();
  }, [])

if (errorState){
  return <Error title = "An Error Occured" message = {errorState.message} />
}

  return (
    <Places
      title="Available Places"
      isLoading = {isLoading}
      isFetchingText = "Fetching the data..."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

/*  fetch('http://localhost:3000/places')
    .then(response => response.json())//reads response body
    .then(realData => setAvailablePlaces(realData.places))
    .catch(err => console.error(err.message))
 */
