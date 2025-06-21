import logo from '../assets/logo.png';
import classes from './Header.module.css'//importing a css object of any name of our choice
export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p className = {classes.paragraph}>
        We are Researchers of Art
        <span style ={{display: 'block'}}>And</span>
      </p>
      <p style={{
            textAlign: 'center',
            color: 'red',
            margin: 0,
      }}>A community of artists and art-lovers.</p>
    </header>
  );
}
