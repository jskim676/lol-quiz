import React, { useEffect, useState } from 'react';
import './App.css';
import { AllChampionsData, QuizSetup, SelectedChampionDetails } from './types/championTypes';
import { fetchAllChampionsData, fetchMultipleRandomChampions } from './services/champion';
import { useQuiz } from './contexts/QuizContext';
import { useNavigate } from 'react-router-dom';

function App() {
    const [allChampionsData, setAllChampionsData] = useState<AllChampionsData | null>(null);
    const [championDetailsArray, setChampionDetailsArray] = useState<SelectedChampionDetails[]>([]);
    const { setQuizSetup } = useQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllChampionsData()
            .then((data) => {
                setAllChampionsData(data);
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
            });
    }, []);

    useEffect(() => {
        if (allChampionsData) {
            fetchMultipleRandomChampions(20, allChampionsData)
                .then((detailsArray) => {
                    setChampionDetailsArray(detailsArray);
                })
                .catch((error) => {
                    console.error('랜덤 챔피언 데이터 가져오기 오류:', error);
                });
        }
    }, [allChampionsData]);

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
        navigate(`/${category}`);
    };

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
