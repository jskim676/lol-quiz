import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

const SkinImgQuiz = () => {
    const { quizSetup } = useQuiz();

    console.log(quizSetup);
    return <div></div>;
};

export default SkinImgQuiz;
