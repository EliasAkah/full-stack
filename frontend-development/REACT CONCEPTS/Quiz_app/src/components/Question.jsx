import {useState} from "react";
import QuestionTimer from "./QuestionTimer.jsx"
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js"

export default function Question({index, onSelectAnswer, onSkip}){
    const [answer, setAnswer]= useState({
        selectedAnswer: '',
        isCorrect: null
    })

    let timer = 10000;

    if(answer.selectedAnswer){
        timer = 1000;
    }

    if(answer.isCorrect !== null){
        timer = 2000;
    }

    function handleSelectedAnswer(answer){
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            });


            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000)
        }, 1000)


    }
    let answerState = '';

    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    }else if(answer.selectedAnswer){
        answerState = 'answered'
    }
    
    return(
        <div id = "question">
            <QuestionTimer key = {timer} timeOut = {timer} onTimeOut = {answer.selectedAnswer === '' ? onSkip : null} mode = {answerState}/>
            <h1>{QUESTIONS[index].text}</h1>
            <Answers answers = {QUESTIONS[index].answers} onSelect = {handleSelectedAnswer} selectedAnswer = {answer.selectedAnswer} answerState = {answerState}/>
        </div>
    )
}