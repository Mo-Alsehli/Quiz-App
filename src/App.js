import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    checkAnswer,
    correct,
    nextQuestion,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="question-wrapper">
        <p>
          Correct Answers: {correct}/{index}
        </p>
        <div className="question">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          {answers.map((answer, index) => {
            return (
              <button
                key={index}
                className="answer"
                onClick={() => checkAnswer(correct_answer === answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            );
          })}
        </div>
        <button type="button" className="next-question" onClick={nextQuestion}>
          Next Question
        </button>
      </section>
    </main>
  );
}

export default App;
