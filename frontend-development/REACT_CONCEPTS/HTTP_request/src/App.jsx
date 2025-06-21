import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {UpdateUserPlaces} from "./HTTP_request.js";
import Error from "./components/Error.jsx"
import {fetchExistingPlaces} from "./HTTP_request.js"

function App() {
  const selectedPlace = useRef();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState()
  const [isLoading, setIsLoading] = useState();
  const [errorState, setErrorState] = useState();
  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    async function fetchingDataStorage(){
      try{
        const currentPlaceStorage = await fetchExistingPlaces();
        console.log("let me see our progress", currentPlaceStorage)
        //updating the application with previously existing selected places when the system first loads by fetching them from the backend
        setUserPlaces(currentPlaceStorage);
      }catch(error){
        setErrorState({message: error.message || "Failed to fetch selectd data data."})
      }
      setIsLoading(false)
    }
    fetchingDataStorage();
  }, [])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }


  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try{
      //moving data to the backend file
      await UpdateUserPlaces([selectedPlace, ...userPlaces])
    }catch(error){
      //rounding back. Ensuring that the old places the user entered remains intact
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({message: error.message || "Failed to update user data."})
    } 
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try{
      //updating the backend when user deletes the selectedPlaces by returning an array of places whose Id does not match the selectdPlaces.id
      await UpdateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id))
    }catch(error){
      //rounding back. Ensuring that the old places the user entered remains intact
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({message: error.message || "Failed to delete user data."})
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError(){
    setErrorUpdatingPlaces(null)
  }

  return (
    <>
    <Modal open = {errorUpdatingPlaces} onClose={handleError}>
      {errorUpdatingPlaces && (<Error title = "An Error Ocurred" message = {errorUpdatingPlaces.message} onConfirm = {handleError}></Error>)}
    </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {errorState && <Error title = "An Error Ocurred" message = {errorState.message} onConfirm = {handleError}></Error>}
        {!errorState && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isLoading}
          isFetchingText = "fetching previously stored data"
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
