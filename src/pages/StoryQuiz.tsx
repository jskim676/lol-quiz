import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

const StoryQuiz = () => {
    const { quizSetup } = useQuiz();

    console.log(quizSetup);
    return <div></div>;
};

export default StoryQuiz;
