import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <Todos items = {["javascript", "typescript"]}>
        <p>I love my world</p>
      </Todos>
    </div>
  );
}

export default App;
