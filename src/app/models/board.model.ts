export interface BoardCard {
    id: string;
    header: string;
    desc: string;
    createdAt: string;
}

export interface BoardList {
    id: string;
    header: string;
    cards: BoardCard[];
}