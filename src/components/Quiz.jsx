



import { useState, useCallback} from "react";

import Questions from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";


export default function Quiz() {

	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	const quizIsComplete = activeQuestionIndex === Questions.length;

	const handleSelectAnswer = useCallback( function handleSelectAnswer(selectedAnswer) {
		setUserAnswers( (prevUserAnswer) => {
			return [...prevUserAnswer, selectedAnswer]
		});
	}, []);

	const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

	if (quizIsComplete) {
		return <div id="summary">
			<img src={quizCompleteImg} alt="quizCompleteImg"/>
			<h2>Quiz Completed</h2>
		</div>
	}

	const shuffledAnswers = [...Questions[activeQuestionIndex].answers];
	shuffledAnswers.sort(() => Math.random() - 0.5)

	return (
		<div id="quiz">
		<div id="question">

			<QuestionTimer
				key={activeQuestionIndex}
				timeout={10000}
				onTimeout={() => handleSelectAnswer(null)}
			/>

			<h2>{Questions[activeQuestionIndex].text}</h2>

			<ul id="answers">
				{shuffledAnswers.map((answer) => (
					<li key={answer} className="answer">
						<button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
					</li>
				))}
			</ul>

		</div>
		</div>
	);
}