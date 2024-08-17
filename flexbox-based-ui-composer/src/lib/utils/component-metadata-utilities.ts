import { CardEntry, CardGroup, SelectionCardDisplayStatus } from '../types';

export const getComponentList = (group: CardGroup[]): CardEntry[] => {
  return group.flatMap((group) => group.cards.flatMap((card) => card.entries));
};

export const getCardGroupsInitialState = (
  group: CardGroup[]
): SelectionCardDisplayStatus[] => {
  return group.map((group) => {
    return {
      cardGroupTitle: group.title,
      displayStatus: true,
    };
  });
};
