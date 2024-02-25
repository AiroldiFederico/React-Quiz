



import { useState } from "react";

import Questions from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";


export default function Quiz() {

	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	const quizIsComplete = activeQuestionIndex === Questions.length;

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswers( (prevUserAnswer) => {
			return [...prevUserAnswer, selectedAnswer]
		});
	}

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