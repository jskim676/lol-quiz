import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

const SpellNameQuiz = () => {
    const { quizSetup } = useQuiz();

    console.log(quizSetup);
    return <div></div>;
};

export default SpellNameQuiz;
