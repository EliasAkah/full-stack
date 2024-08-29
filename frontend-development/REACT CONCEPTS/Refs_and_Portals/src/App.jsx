import Player from "./components/Player.jsx"
import PlayerComponents from "./components/PlayerComponent.jsx"


function App() {
    
  return (
    <>
      <Player />
      <div id="challenges">
      <PlayerComponents difficulty = "Easy" time = {1} />
      <PlayerComponents difficulty = "Not Easy" time = {5}/>
      <PlayerComponents difficulty = "Getting Tough" time = {10} />
      <PlayerComponents difficulty = "Pros only" time = {15}/>
      </div>

    </>
  );
}

export default App;
