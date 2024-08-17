import { CardGroup } from '../types';
import { buttonEntries } from './card-entries/buttonEntries';
import { calendarEntries } from './card-entries/calendarEntries';
import { cardEntries } from './card-entries/cardEntries';
import { dialogEntries } from './card-entries/dialogEntries';
import { dividerEntries } from './card-entries/dividerEntries';
import { fabEntries } from './card-entries/fabEntries';
import { formEntries } from './card-entries/formEntries';
import { iconEntries } from './card-entries/iconEntries';
import { linkEntries } from './card-entries/linkEntries';
import { mediaEntries } from './card-entries/mediaEntries';
import { progressEntries } from './card-entries/progressEntries';
import { radioButtonEntries } from './card-entries/radioButtonEntries';
import { radioGroupEntries } from './card-entries/radioGroupEntries';
import { spinnerEntries } from './card-entries/spinnerEntries';
import { tabEntries } from './card-entries/tabEntries';

export const cardGroups: CardGroup[] = [
  { title: 'Cards', cards: [{ title: 'Cards', entries: cardEntries }] },
  { title: 'Media', cards: [{ title: 'Media', entries: mediaEntries }] },
  {
    title: 'Dividers',
    cards: [{ title: 'Dividers', entries: dividerEntries }],
  },
  {
    title: 'Buttons/Links',
    cards: [
      { title: 'Buttons', entries: buttonEntries },
      { title: 'Links', entries: linkEntries },
      { title: 'Icon Buttons', entries: iconEntries },
      { title: 'Floating Action Buttons', entries: fabEntries },
    ],
  },

  { title: 'Tabs', cards: [{ title: 'Tabs', entries: tabEntries }] },
  {
    title: 'Form Fields',
    cards: [
      { title: 'Form Fields', entries: formEntries },
      { title: 'Radio Buttons', entries: radioButtonEntries },
      { title: 'Radio Groups', entries: radioGroupEntries },
    ],
  },
  { title: 'Dialogs', cards: [{ title: 'Dialogs', entries: dialogEntries }] },
  {
    title: 'Calendars',
    cards: [{ title: 'Calendars', entries: calendarEntries }],
  },
  {
    title: 'Progress Indicators',
    cards: [
      { title: 'Progress', entries: progressEntries },
      { title: 'Spinners', entries: spinnerEntries },
    ],
  },
];
