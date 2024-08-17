import { CardGroup } from "../types";
import { buttonEntries } from "./buttonEntries";
import { calendarEntries } from "./calendarEntries";
import { cardEntries } from "./cardEntries";
import { dialogEntries } from "./dialogEntries";
import { dividerEntries } from "./dividerEntries";
import { fabEntries } from "./fabEntries";
import { formEntries } from "./formEntries";
import { iconEntries } from "./iconEntries";
import { linkEntries } from "./linkEntries";
import { mediaEntries } from "./mediaEntries";
import { progressEntries } from "./progressEntries";
import { radioButtonEntries } from "./radioButtonEntries";
import { radioGroupEntries } from "./radioGroupEntries";
import { spinnerEntries } from "./spinnerEntries";
import { tabEntries } from "./tabEntries";


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
