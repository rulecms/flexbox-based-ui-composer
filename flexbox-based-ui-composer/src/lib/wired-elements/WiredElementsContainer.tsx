import { SelectionPanel } from '../ui-composer-sections/SelectionPanel';
import { DraggableWiredElement } from './DraggableWiredElement';
import { useSelector } from 'react-redux';
import {
  WiredCard,
  WiredButton,
  WiredCalendar,
  WiredCheckbox,
  WiredCombo,
  WiredDialog,
  WiredDivider,
  WiredFab,
  WiredIconButton,
  WiredImage,
  WiredInput,
  WiredLink,
  WiredListbox,
  // WiredProgressRing,
  WiredProgress,
  WiredRadioGroup,
  WiredRadio,
  WiredSearchInput,
  WiredSlider,
  WiredSpinner,
  WiredTabs,
  WiredTextarea,
  WiredToggle,
  WiredVideo,
} from './index';

import { Favorite, Close, ThumbUp, Star, Check } from '@mui/icons-material';
import { CardGroup } from '../types';

const buttonPanelEntries = [
  { id: 'wired-button-disabled', card: <WiredButton disabled={true} /> },
  { id: 'wired-button-default', card: <WiredButton /> },
  { id: 'wired-button-elevation-2', card: <WiredButton elevation="2" /> },
  { id: 'wired-button-elevation-3', card: <WiredButton elevation="3" /> },
  { id: 'wired-button-elevation-4', card: <WiredButton elevation="4" /> },
  { id: 'wired-button-elevation-5', card: <WiredButton elevation="5" /> },
];

const cardPanelEntries = [
  { id: 'wired-card-default', card: <WiredCard /> },
  { id: 'wired-card-elevation-2', card: <WiredCard elevation="2" /> },
  { id: 'wired-card-elevation-3', card: <WiredCard elevation="3" /> },
  { id: 'wired-card-elevation-4', card: <WiredCard elevation="4" /> },
  { id: 'wired-card-fill', card: <WiredCard fill="#aabbcc" /> },
];

const mediaPanelEntries = [
  { id: 'wired-image-default', card: <WiredImage /> },
  { id: 'wired-video-default', card: <WiredVideo /> },
];
const calendarEntries = [
  { id: 'wired-calendar-default', card: <WiredCalendar /> },
];

const formEntries = [
  { id: 'wired-input-default', card: <WiredInput /> },
  { id: 'wired-search-input-default', card: <WiredSearchInput /> },
  { id: 'wired-textarea-default', card: <WiredTextarea /> },
  { id: 'wired-combo-default', card: <WiredCombo /> },
  { id: 'wired-listbox-default', card: <WiredListbox /> },
  { id: 'wired-checkbox-default', card: <WiredCheckbox /> },
  { id: 'wired-toggle-default', card: <WiredToggle /> },
  { id: 'wired-slider-default', card: <WiredSlider /> },
];
const wiredRadioButtonEntries = [
  { id: 'wired-radio-default', card: <WiredRadio>Radio 1</WiredRadio> },
  { id: 'wired-radio-checked', card: <WiredRadio checked>Radio 2</WiredRadio> },
  {
    id: 'wired-radio-disabled',
    card: <WiredRadio disabled>Radio 3</WiredRadio>,
  },
];

const wiredRadioGroupEntries = [
  { id: 'wired-radio-group-default', card: <WiredRadioGroup /> },
];

const dialogEntries = [{ id: 'wired-dialog-default', card: <WiredDialog /> }];

const dividerEntries = [
  { id: 'wired-divider-default', card: <WiredDivider /> },
];

const fabEntries = [
  {
    id: 'wired-fab-favorite',
    card: (
      <WiredFab>
        <Favorite />
      </WiredFab>
    ),
  },
  {
    id: 'wired-fab-Close',
    card: (
      <WiredFab>
        <Close />
      </WiredFab>
    ),
  },
  {
    id: 'wired-fab-thumb-up',
    card: (
      <WiredFab>
        <ThumbUp />
      </WiredFab>
    ),
  },
  {
    id: 'wired-fab-star',
    card: (
      <WiredFab>
        <Star />
      </WiredFab>
    ),
  },
  {
    id: 'wired-fab-check',
    card: (
      <WiredFab>
        <Check />
      </WiredFab>
    ),
  },
];

const iconEntries = [
  {
    id: 'wired-icon-favorite',
    card: (
      <WiredIconButton>
        <Favorite />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-icon-Close',
    card: (
      <WiredIconButton>
        <Close />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-icon-thumb-up',
    card: (
      <WiredIconButton>
        <ThumbUp />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-icon-star',
    card: (
      <WiredIconButton>
        <Star />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-icon-check',
    card: (
      <WiredIconButton>
        <Check />
      </WiredIconButton>
    ),
  },
];

const wiredLinkPanelEntries = [
  { id: 'wired-link-default', card: <WiredLink /> },
  { id: 'wired-link-elevation-3', card: <WiredLink elevation="3" /> },
];
const wiredProgressEntries = [
  // { id: 'wired-progress-ring-default', card: <WiredProgressRing /> }, does not work
  { id: 'wired-progress-default', card: <WiredProgress /> },
];

const spinnerPanelEntries = [
  { id: 'wired-spinner-default', card: <WiredSpinner /> },
  { id: 'wired-spinner-spinning', card: <WiredSpinner duration="1000" /> },
];

const tabPanelEntries = [{ id: 'wired-tabs-default', card: <WiredTabs /> }];

export const cardGroups: CardGroup[] = [
  { title: 'Cards', cards: [{ title: 'Cards', entries: cardPanelEntries }] },
  { title: 'Media', cards: [{ title: 'Media', entries: mediaPanelEntries }] },
  {
    title: 'Dividers',
    cards: [{ title: 'Dividers', entries: dividerEntries }],
  },
  {
    title: 'Buttons/Links',
    cards: [
      { title: 'Buttons', entries: buttonPanelEntries },
      { title: 'Links', entries: wiredLinkPanelEntries },
      { title: 'Icon Buttons', entries: iconEntries },
      { title: 'Floating Action Buttons', entries: fabEntries },
    ],
  },

  { title: 'Tabs', cards: [{ title: 'Tabs', entries: tabPanelEntries }] },
  {
    title: 'Form Fields',
    cards: [
      { title: 'Form Fields', entries: formEntries },
      { title: 'Radio Buttons', entries: wiredRadioButtonEntries },
      { title: 'Radio Groups', entries: wiredRadioGroupEntries },
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
      { title: 'Progress', entries: wiredProgressEntries },
      { title: 'Spinners', entries: spinnerPanelEntries },
    ],
  },
];

function RenderSelectionPanel({
  title,
  entries,
}: {
  title: string;
  entries: { id: string; card: JSX.Element }[];
}) {
  const displayStatus = useSelector(
    (state: { composePlayground }) =>
      state.composePlayground.selectionCardDisplayStatuses
  );

  function displayOn() {
    let result = false;
    cardGroups.forEach(({ title: cardGroupsTitle, cards }) => {
      const cardTitles = cards.map(({ title }) => title);
      if (cardTitles.includes(title)) {
        result = !!displayStatus[cardGroupsTitle];
      }
    });
    return result;
  }

  if (!displayOn()) {
    return null;
  }
  return (
    <SelectionPanel title={title}>
      {entries.map((entry) => (
        <div key={`${entry.id}-container`}>
          <DraggableWiredElement
            key={entry.id}
            id={entry.id}
            card={entry.card}
          />
        </div>
      ))}
    </SelectionPanel>
  );
}

export function WiredElementsContainer() {
  return cardGroups.map(({ cards }) => {
    return cards.map(({ title, entries }) => {
      return <RenderSelectionPanel key={title} title={title} entries={entries} />;
    });
  });
}
