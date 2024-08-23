export const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/14.16.1';

export const fetchAllChampionsData = async () => {
    const response = await fetch(`${BASE_URL}/data/ko_KR/champion.json`);
    const data = await response.json();
    return data.data;
};

export const fetchChampionDetails = async (championId: string) => {
    const response = await fetch(`${BASE_URL}/data/ko_KR/champion/${championId}.json`);
    const data = await response.json();
    return data.data;
};

export const fetchMultipleRandomChampions = async (count: number, allChampionsData: any) => {
    if (allChampionsData) {
        const champions = Object.keys(allChampionsData);
        const detailsArray = [];
        for (let i = 0; i < count; i++) {
            const randomChampion = champions[Math.floor(Math.random() * champions.length)];

            try {
                const data = await fetchChampionDetails(randomChampion);
                const details = data[randomChampion];
                if (details) {
                    detailsArray.push(details);
                }
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        }

        return detailsArray;
    }
    return [];
};
