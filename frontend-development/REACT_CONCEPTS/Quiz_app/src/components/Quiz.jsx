import {useState, useCallback} from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);

    //if actulaAnswer is empty move to next question else remmain in the current question
    let activeQuestionIndex = userAnswers.length;

    //checking if the quesitions in QUESTIONS array have all been answered
    const quizCompleted = activeQuestionIndex === QUESTIONS.length;

    //function that updates the answer Array with Users Choice of Answers
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){       
        setUserAnswers((prevAns) => [...prevAns, selectedAnswer])
    }, [])

    const handleSkipAnswer = useCallback(() =>  handleSelectAnswer(null), [handleSelectAnswer])

    if(quizCompleted){
        return <Summary userAnswers = {userAnswers}/>
    }


    return(
        <div id = "quiz">
            <Question key = {activeQuestionIndex} index = {activeQuestionIndex} onSkip = {handleSkipAnswer} onSelectAnswer = {handleSelectAnswer} />
        </div>

    )
    
}