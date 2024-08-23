import React, { useEffect, useState } from 'react';
import './App.css';
import { QuizSetup, SelectedChampionDetails } from './types/championTypes';
import { fetchAllChampionsData, fetchMultipleRandomChampions } from './services/champion';
import { useQuiz } from './contexts/QuizContext';
import SpellNameQuiz from './pages/SpellNameQuiz';
import SpellIconQuiz from './pages/SpellIconQuiz';
import SkinImgQuiz from './pages/SkinImgQuiz';
import StoryQuiz from './pages/StoryQuiz';

function App() {
    const [championDetailsArray, setChampionDetailsArray] = useState<SelectedChampionDetails[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 선택된 카테고리 상태
    const { setQuizSetup } = useQuiz();

    useEffect(() => {
        fetchAllChampionsData()
            .then((data) => {
                return fetchMultipleRandomChampions(20, data);
            })
            .then((detailsArray) => {
                setChampionDetailsArray(detailsArray);
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
            });
    }, []);

    const handleCategoryClick = (category: string) => {
        const newQuizSetup: QuizSetup = {
            spell_name: {},
            spell_icon: {},
            skin: {},
            story: {},
        };

        championDetailsArray.forEach((champion, index) => {
            newQuizSetup[category][index + 1] = champion;
        });

        setQuizSetup(newQuizSetup);
        setSelectedCategory(category);
    };

    const renderQuizComponent = () => {
        switch (selectedCategory) {
            case 'spell_name':
                return <SpellNameQuiz />;
            case 'spell_icon':
                return <SpellIconQuiz />;
            case 'skin':
                return <SkinImgQuiz />;
            case 'story':
                return <StoryQuiz />;
            default:
                return null;
        }
    };

    if (selectedCategory) {
        return renderQuizComponent();
    }

    return (
        <div className="App">
            <button
                className="bg-white text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => handleCategoryClick('spell_name')}
            >
                스킬 이름
            </button>
            <button
                className="bg-white text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => handleCategoryClick('spell_icon')}
            >
                스킬 아이콘
            </button>
            <button
                className="bg-white text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => handleCategoryClick('skin')}
            >
                스킨
            </button>
            <button
                className="bg-white text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => handleCategoryClick('story')}
            >
                스토리
            </button>
        </div>
    );
}

export default App;
