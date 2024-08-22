import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

const SpellIconQuiz = () => {
    const { quizSetup } = useQuiz();

    console.log(quizSetup);
    return <div></div>;
};

export default SpellIconQuiz;
