import logo from '../assets/logo.png';
// import {styled} from "styled-components"

// const CssHeader = styled.header`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 2rem;
//   margin-bottom: 2rem;

// & img {
//   object-fit: contain;
//   margin-bottom: 2rem;
//   width: 11rem;
//   height: 11rem;
// }

// & h1 {
//   font-size: 1.5rem;
//   font-weight: 600;
//   letter-spacing: 0.4em;
//   text-align: center;
//   text-transform: uppercase;
//   color: #9a3412;
//   font-family: 'Pacifico', cursive;
//   margin: 0;
// }

// & p {
//   text-align: center;
//   color: #a39191;
//   margin: 0;
// }

// @media (min-width: 768px) {
//   & {
//     margin-bottom: 4rem;
//   }

//   & h1 {
//     font-size: 2.25rem;
//   }
// }`

export default function Header() {
  return (
    <header className = " flex flex-col items-center justify-self-center my-8 md:mb-16 md:text-4xl">
      <img src={logo} alt="A canvas"  className = "object-contain mb-8 w-44 h-44"/>
      <h1 className = "text-4xl font-sans tracking-widest font-semibold text-center uppercase	text-primary m-0">ReactArt</h1>
      <p className = "text-secondary m-0 text-center font-serif text-xl">A community of artists and art-lovers.</p>
    </header>
  );
}