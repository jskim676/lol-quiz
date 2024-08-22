// QuizContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { QuizSetup } from '../types/championTypes';

interface QuizContextProps {
    quizSetup: QuizSetup;
    setQuizSetup: React.Dispatch<React.SetStateAction<QuizSetup>>;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

// Custom hook
export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
    const [quizSetup, setQuizSetup] = useState<QuizSetup>({
        spell_name: {},
        spell_icon: {},
        skin: {},
        story: {},
    });

    return <QuizContext.Provider value={{ quizSetup, setQuizSetup }}>{children}</QuizContext.Provider>;
};
