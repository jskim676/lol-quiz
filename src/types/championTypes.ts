// src/types/championTypes.ts

export interface ChampionSpell {
    id: string;
    name: string;
}

export interface Champion {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    // 필요한 다른 속성 추가
}

export interface ChampionData {
    [key: string]: Champion;
}

export interface SelectedChampionDetails {
    name: string;
    skins: { [key: string]: any };
    spells: { [key: string]: any };
    lore: { [key: string]: any };
}

export interface QuizSetup {
    [key: string]: { [key: number]: SelectedChampionDetails | undefined };
}
