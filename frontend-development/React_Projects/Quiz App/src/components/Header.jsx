import logoImage from '../assets/quiz-logo.png'

export default function Header() {
  return (
    <header>
      <img src={logoImage} alt="Quiz logo" />
      <h1>Quiz Questions</h1>
    </header>
  )
}