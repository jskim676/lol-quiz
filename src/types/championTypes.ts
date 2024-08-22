// src/types/championTypes.ts

export interface ChampionSpell {
    id: string;
    name: string;
}

export interface ChampionData {
    id: string;
    name: string;
    spells: ChampionSpell[];
}

export interface AllChampionsData {
    [key: string]: ChampionData;
}

export interface SelectedChampionDetails {
    spells: { [key: string]: any };
    skins: { [key: string]: any };
    stories: { [key: string]: any };
}

export interface QuizSetup {
    [key: string]: { [key: number]: SelectedChampionDetails | undefined };
}
