import {useState, useCallback} from 'react'
import QUESTIONS from '../../questions.js'
import trophyIcon from '../assets/quiz-complete.png'
import ProgressTime from './QuestionTimer.jsx'

export default function quiz() {
    const [userAnswers, setUserAnswers] = useState([])

    let activeQuestionIndex = userAnswers.length;
    let quizComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswers){
      //updating the users answer array
      setUserAnswers(prevUserAnswer => {
          return [...prevUserAnswer, selectedAnswers]
        }
      )
    }, [])

    //using useCallBAck to prevent the function from executing multiple times when their are changes to the state or props
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizComplete){
      return(
        <div id = "summary">
          <img src={trophyIcon} alt="Trophy Icon" />
          <h2>Quiz Completed</h2>
        </div>
      )
    }

    //shuffling the answers
    let shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffleAnswers.sort(() => Math.random() - 0.5)

  return (
    <div id = "quiz">
      <ProgressTime timeout = {10000} onTimeout={handleSkipAnswer}/>
      <div id = "question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        {/* dynamically output the values */}
        <ul id = "answers">
          {shuffleAnswers.map(answer => 
            <li key = {answer} className = "answer">
              <button onClick = {() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          )}
        </ul>
      </div>
    </div>

  )
}
