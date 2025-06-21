import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));
function App() {sortPlacesByDistance
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [availblePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  //using useEffect() to handled fetch the location of the user
  useEffect(() => {
  //fetching the actual location
  navigator.geolocation.getCurrentPosition((position) => {
    const crd = position.coords;
    const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

    setAvailablePlaces(sortedPlaces);
  })
  
  }, [])

  function handleStartRemovePlace(id) {
    setModalIsOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    //accessing the id of the data stored in the browser local storage
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    //checking if any of the id 
    if(storedIds.indexOf(id) === -1){//checking if an a given id is not in storedIds array
          //storing the place in local storage
      localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]))
    }

    console.log(storedIds);
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);
    //accessing the id of the data stored in the browser local storage
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    //sending item to localStorage
    localStorage.setItem("selectedPlaces", JSON.stringify(storedIds.filter(id => id !== selectedPlace.current)));//returns only array of ids that is not identical to selectedPlace.current
    console.log(storedIds);
  }

  return (
    <>
      <Modal open = {modalIsOpen} onClose = {handleStopRemovePlace}>
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
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availblePlaces}
          fallbackText="searching for an available place...."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
