import {useState, useEffect} from "react";
import Places from './Places.jsx';
import Error from "./Error.jsx"
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../HTTP_request.js"

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [errorState, setErrorState] = useState();

  useEffect(() => {
      //fetching data from the backend server asynchronously
      async function fetchingPlaces(){
        setIsLoading(true)
        try{
          const places = await fetchAvailablePlaces();

          //get user's location but does not return any value
          navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
            console.log(sortedPlaces)
            setAvailablePlaces(sortedPlaces)//assign sortedplaces to availableplaces
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
