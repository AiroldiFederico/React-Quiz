



import {useState, useCallback} from "react";

import Questions from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";


export default function Quiz() {


	const [answerState, setAnswerState] = useState('')
	const [userAnswers, setUserAnswers] = useState([]);


	const activeQuestionIndex =
		answerState === '' ? userAnswers.length : userAnswers.length - 1;
	const quizIsComplete = activeQuestionIndex === Questions.length;

	const handleSelectAnswer = useCallback(
	 function handleSelectAnswer(selectedAnswer) {
		setAnswerState('answered')
		setUserAnswers( (prevUserAnswer) => {
			return [...prevUserAnswer, selectedAnswer]
		});

		setTimeout(() => {
			if (selectedAnswer === Questions[activeQuestionIndex].answers[0]) {
				setAnswerState('correct');
			} else {
				setAnswerState('wrong');
			}

			setTimeout(() => {
				setAnswerState('');
			}, 2000)

		}, 1000)

	}, [activeQuestionIndex]);

	const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

	if (quizIsComplete) {
		return <div id="summary">
			<img src={quizCompleteImg} alt="quizCompleteImg"/>
			<h2>Quiz Completed</h2>
		</div>
	}

	return (
		<div id="quiz">
		<div id="question">

			<QuestionTimer
				key={activeQuestionIndex}
				timeout={10000}
				onTimeout={() => handleSelectAnswer(null)}
			/>

			<h2>{Questions[activeQuestionIndex].text}</h2>

			<Answers
				answers={Questions[activeQuestionIndex].answers}
				selectedAnswers={userAnswers[userAnswers.length - 1]}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>

		</div>
		</div>
	);
}