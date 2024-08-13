//setting HTML Attributes Dynamically & Loading Image Files
import reactImg from "./assets/react-core-concepts.png";
import componentImg from "./assets/components.png";
import { CORE_CONCEPTS } from "/src/data.js";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const randomIndex = genRandomInt(2);
  console.log(randomIndex);
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {reactDescriptions[randomIndex]} React concepts you will need for almost
        any app you are going to build!
      </p>
    </header>
  );
}



//using destructring to make a component reusable
function CoreConcepts({ image, description, title }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
    </li>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/* all the values within the CoreConcepts component called here are called props.
           inorder to use them a parameter called "props" is inserted in the coreconcept function component
           and we use "props" like object in javascript to get the needed data assign to a key */}
            <CoreConcepts
              title="components"
              description="the core UI building block"
              image={componentImg}
            />
            <CoreConcepts
              title={CORE_CONCEPTS[1].title}
              description={CORE_CONCEPTS[1].description}
              image={CORE_CONCEPTS[1].image}
            />
            <CoreConcepts {...CORE_CONCEPTS[2]} />
            <CoreConcepts {...CORE_CONCEPTS[3]} />
          </ul>
        </section>

        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;