import React,{useEffect, useState} from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {
  const [questions,setQuestions] = useState([])

  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter(question=>question.id!==deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.map(question=>{
      if(question.id===updatedQuestion.id){
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res=>res.json())
    .then(questions=>setQuestions(questions))
  },[])
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion}/>
        ))}  
      </ul>
    </section>
  );
}

export default QuestionList;
