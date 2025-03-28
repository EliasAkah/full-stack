import quizCompletedTrophy from "../assets/quiz-complete.png"
import QUESTIONS from "../questions.js"

export default function Summary({userAnswers}){
    const skippedAnswers = userAnswers.filter((answer) => answer === null)
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0])
    
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100)
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100) 
    const wrongAnswersShare =  100 - skippedAnswersShare - correctAnswersShare;

    return(
        <div id = "summary">
            <img src={quizCompletedTrophy} alt="Trophy Logo" />
            <h2>Quiz Completed!</h2>
            <div id = "summary-stats">
                <p>
                    <span className = "number">{skippedAnswersShare}%</span>
                    <span className = "text">skipped</span>
                </p>
                <p>
                    <span className = "number">{correctAnswersShare}%</span>
                    <span className = "text">answered correctly</span>
                </p>
                <p>
                    <span className = "number">{wrongAnswersShare}%</span>
                    <span className = "text">answered wrongly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    //dynamically creating a cssClass
                    let cssClass = "user-answer";

                    if(answer === null){
                        cssClass += " skipped";
                    }else if(answer === QUESTIONS[index].answers[0]){
                        cssClass += " correct";
                    }else{
                        cssClass += " wrong";
                    }
                    return(
                        <li key = {index + 1}>
                            <h3>{index}</h3>
                            <p className = "question">{QUESTIONS[index].text}</p>
                            <p className = {cssClass}>{answer ?? "skipped"}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}