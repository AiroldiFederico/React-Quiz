import QuestionTimer from "./QuestionTimer.jsx";
import Questions from "../questions.js";
import Answers from "./Answers.jsx";
import {useState} from "react";
import questions from "../questions.js";


export default function Question({
	index,
	onSelectAnswer,
	onSkipAnswer
}) {

	const [answer, setAnswer] = useState({
		selectedAnswers: '',
		isCorrect: null
	});

	function handleSelectAnswer(answer) {
		setAnswer({
			selectedAnswers: answer,
			isCorrect: null
		});

		setTimeout(() => {
			setAnswer({
				selectedAnswers: answer,
				isCorrect: Questions[index].answers[0] === answer
			});

			setTimeout(() => {
				onSelectAnswer(answer);
			}, 2000);

		}, 1000);
	};

	let answerState = "";

	if (answer.selectedAnswers && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? 'correct' : 'wrong';
	} else if (answer.selectedAnswers) {
		answerState = 'answered';
	}

	return (

		<div id="question">
			<QuestionTimer timeout={10000} onTimeout={onSkipAnswer}/>

			<h2>{Questions[index].text}</h2>

			<Answers
				answers={Questions[index].answers}
				selectedAnswers={answer.selectedAnswers}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>
		</div>
	)
}