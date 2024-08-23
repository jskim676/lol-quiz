import React, { useState, useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';
import { BASE_URL, fetchAllChampionsData } from '../services/champion';
import { ChampionData } from '../types/championTypes';

const SpellIconQuiz = () => {
    const { quizSetup } = useQuiz();
    const [quizSpellIcon, setQuizSpellIcon] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState(1);
    const [viewState, setViewState] = useState(false);
    const [spellKey, setSpellKey] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [championList, setChampionList] = useState<string[]>([]);
    const [filteredChampions, setFilteredChampions] = useState<string[]>([]);
    const [inputFocused, setInputFocused] = useState(false);

    const totalQuestions = 20;

    const spellIcon = quizSetup.spell_icon[currentIndex];

    useEffect(() => {
        if (spellIcon && spellIcon.spells.length > 0) {
            const randomIndex = Math.floor(Math.random() * spellIcon.spells.length);
            setQuizSpellIcon(spellIcon.spells[randomIndex].id);
            setSpellKey(randomIndex);
            setIsLoading(false);
        } else {
            console.error('문제를 불러오는 중 오류가 발생했습니다.');
        }
    }, [quizSetup, currentIndex]);

    useEffect(() => {
        fetchAllChampionsData()
            .then((data) => {
                const championData = data as ChampionData;
                const names = Object.values(championData).map((champion) => champion.name);
                setChampionList(names);
                setFilteredChampions(names);
            })
            .catch((error) => {
                console.error('챔피언 데이터를 불러오는 중 오류가 발생했습니다:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedAnswer) {
            setFilteredChampions(championList.filter((champion) => champion.includes(selectedAnswer)));
        } else {
            setFilteredChampions(championList);
        }
    }, [selectedAnswer, championList]);

    useEffect(() => {
        if (!inputFocused) {
            setFilteredChampions(championList);
        }
    }, [inputFocused, championList]);

    const handleAnswerSubmit = () => {
        const isCorrect = spellIcon && selectedAnswer === spellIcon.name;

        console.log(isCorrect ? '정답입니다!' : '정답이 아닙니다. 다시 시도해보세요.');

        if (currentIndex < totalQuestions - 1) {
            setSelectedAnswer('');
            setViewState(true);
        } else {
            console.log('퀴즈를 모두 완료했습니다!');
        }
    };

    const nextQuiz = () => {
        if (viewState) {
            setViewState(false);
            setCurrentIndex(currentIndex + 1);
            setIsLoading(true);
            setInputFocused(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!viewState) {
                handleAnswerSubmit();
            }
        }
    };

    const spellKeyMap: { [key: number]: string } = {
        0: 'Q',
        1: 'W',
        2: 'E',
        3: 'R',
    };

    return (
        <div className="flex flex-col items-center p-20">
            {isLoading ? (
                <p>로딩 중...</p>
            ) : quizSpellIcon ? (
                <img src={`${BASE_URL}/img/spell/${quizSpellIcon}.png`} className="w-240 h-240" alt="Spell Icon" />
            ) : (
                <p>스펠 아이콘을 불러오는 중입니다...</p>
            )}
            {viewState ? (
                <div className="flex justify-center p-10 gap-x-2">
                    <p className="flex justify-center items-center w-64 h-45">
                        정답은 {spellIcon ? spellIcon.name : ''} {spellKeyMap[spellKey]}
                    </p>
                    <button
                        className="bg-white text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={nextQuiz}
                    >
                        다음
                    </button>
                </div>
            ) : (
                <div className="flex flex-row p-10 gap-x-2">
                    <div className="">
                        <input
                            type="text"
                            placeholder="챔피언 이름을 입력하세요"
                            className="shadow appearance-none border rounded w-64 h-45 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedAnswer}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                        />
                        {inputFocused && filteredChampions.length > 0 && (
                            <ul
                                className="relative z-10 w-64 border rounded shadow bg-white mt-1 overflow-y-auto"
                                style={{ maxHeight: `${Math.min(filteredChampions.length * 40, 240)}px` }}
                            >
                                {filteredChampions.map((champion) => (
                                    <li
                                        key={champion}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => setSelectedAnswer(champion)}
                                    >
                                        {champion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button
                        className="h-45 bg-white text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={handleAnswerSubmit}
                    >
                        확인
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpellIconQuiz;
