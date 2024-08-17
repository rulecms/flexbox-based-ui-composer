export type DropContainerDimensions = {
    height: string;
    width: string;
};

export type SelectionCardDisplayStatus = {
    cardGroupTitle: string;
    displayStatus: boolean;
}

export type CardEntry = {
    id: string;
    card: JSX.Element;
}

export type Card = {
    title: string;
    entries: CardEntry[];
}

export type CardGroup = {
    title: string;
    cards: Card[];
}

