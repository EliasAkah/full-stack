import {useRef} from 'react'

export default function Answers({answers, selectdAnswer, answerState, onSelect}) {
    const shuffleAnswers = useRef()
    //shuffling the answers
    if(!shuffleAnswers.current){
        shuffleAnswers.current = [...answers]
        shuffleAnswers.current.sort(() => Math.random() - 0.5)
    }

  return (
    // {/* dynamically output the values */}
    <ul id = "answers">
        {shuffleAnswers.current.map(answer => {
        //checking if every recently clicked  answer in the userAnswer array is correct or not
        const isSelected = selectdAnswer === answer
        let cssClass = '';

        if(answerState === 'answered' && isSelected){
            cssClass = 'selected'
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelected){
            cssClass = answerState;
        }

        return(
            <li key = {answer} className = "answer">
            <button onClick = {() => onSelect(answer)} className = {cssClass} disabled = {answerState !== ''}>{answer}</button>
            </li>
        )
        }
        )}
    </ul>
  )
}
