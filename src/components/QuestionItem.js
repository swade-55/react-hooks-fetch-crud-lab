import React from "react";

function QuestionItem({ question, onDeleteQuestion,onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:'DELETE',
    })
    .then(r=>r.json())
    .then(()=>onDeleteQuestion(question))
  }

  function handleUpdateClick(e){
    e.preventDefault()
    fetch(`http://localhost:4000/questions/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        correctIndex
      }),
    })
    .then(r=>r.json())
    .then(updatedQuestion=>onUpdateQuestion(updatedQuestion))
  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onSelect={handleUpdateClick} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
