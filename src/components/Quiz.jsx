



import { useState } from "react";

import Questions from "../questions.js";


export default function Quiz() {

	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswers( (prevUserAnswer) => {
			return [...prevUserAnswer, selectedAnswer]
		});
	}

	return (
		<div id="quiz">
		<div id="question">

			<h2>{Questions[activeQuestionIndex].text}</h2>

			<ul id="answers">
				{Questions[activeQuestionIndex].answers.map((answer) => (
					<li key={answer} className="answer">
						<button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
					</li>
				))}
			</ul>

		</div>
		</div>
	);
}