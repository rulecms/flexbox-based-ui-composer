import {
  getCardGroupsInitialState,
  getComponentList,
} from './component-metadata-utilities';
import { CardGroup } from '../types';

describe('component-metadata-utilities', () => {
  const groups: CardGroup[] = [
    {
      title: 'Group A',
      cards: [
        {
          title: 'Card 1',
          entries: [
            { id: 'entry-1', card: null as any },
            { id: 'entry-2', card: null as any },
          ],
        },
        {
          title: 'Card 2',
          entries: [{ id: 'entry-3', card: null as any }],
        },
      ],
    },
    {
      title: 'Group B',
      cards: [
        {
          title: 'Card 3',
          entries: [{ id: 'entry-4', card: null as any }],
        },
      ],
    },
  ];

  describe('getComponentList', () => {
    it('flattens all card entries across groups', () => {
      expect(getComponentList(groups)).toEqual([
        { id: 'entry-1', card: null },
        { id: 'entry-2', card: null },
        { id: 'entry-3', card: null },
        { id: 'entry-4', card: null },
      ]);
    });

    it('returns an empty list for empty groups', () => {
      expect(getComponentList([])).toEqual([]);
    });
  });

  describe('getCardGroupsInitialState', () => {
    it('maps each group to a visible selection card status', () => {
      expect(getCardGroupsInitialState(groups)).toEqual([
        { cardGroupTitle: 'Group A', displayStatus: true },
        { cardGroupTitle: 'Group B', displayStatus: true },
      ]);
    });

    it('returns an empty list for empty groups', () => {
      expect(getCardGroupsInitialState([])).toEqual([]);
    });
  });
});
