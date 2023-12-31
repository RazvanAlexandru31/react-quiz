import React from 'react'
import { useQuiz } from '../context/QuizContext'

const Progress = () => {
  const {index, numQuestions, points, totalPoints} = useQuiz();
  return (
    <header className='progress'>
      <p>Question <strong>{index + 1}</strong>/{numQuestions}</p>
      <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  )
}

export default Progress

