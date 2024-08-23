import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import SkinImgQuiz from './pages/SkinImgQuiz';
import SpellIconQuiz from './pages/SpellIconQuiz';
import SpellNameQuiz from './pages/SpellNameQuiz';
import StoryQuiz from './pages/StoryQuiz';
import { QuizProvider } from './contexts/QuizContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <QuizProvider>
                <Routes>
                    <Route path="/" element={<App />} />
                    {/* <Route path="/skin" element={<SkinImgQuiz />} />
                    <Route path="/spell_name" element={<SpellIconQuiz />} />
                    <Route path="/spell_icon" element={<SpellNameQuiz />} />
                    <Route path="/story" element={<StoryQuiz />} /> */}
                </Routes>
            </QuizProvider>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
