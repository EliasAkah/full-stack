import {useState, useCallback} from 'react'
import QUESTIONS from '../../questions.js'
import Question from './Question.jsx'
import Summary from './Summary.jsx'

export default function quiz() {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
      //updating the users answer array
      setUserAnswers(prevUserAnswer => {
          return [...prevUserAnswer, selectedAnswer]
        }
      )
    }, [])

    //using useCallBAck to prevent the function from executing multiple times when their are changes to the state or props
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete){
      return <Summary userAnswers = {userAnswers} />
    }

  return (
    <div id = "quiz">
      <Question
        key = {activeQuestionIndex}
        index = {activeQuestionIndex}
        onSelectAnswer = {handleSelectAnswer}
        onSkipAnswer = {handleSkipAnswer}
      />
    </div>

  )
}
