import { SelectionPanel } from '../ui-composer-sections/SelectionPanel';
import { DraggableWiredElement } from './DraggableWiredElement';
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
  WiredProgressRing,
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
      <WiredFab color="red">
        <Favorite />
      </WiredFab>
    ),
  },
  {
    id: 'wired-fab-Close',
    card: (
      <WiredFab color="red">
        <Close />
      </WiredFab>
    ),
  },
  {
    id: 'wired-fab-thumb-up',
    card: (
      <WiredFab color="yellow">
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
    id: 'wired-fab-favorite',
    card: (
      <WiredIconButton color="red">
        <Favorite />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-fab-Close',
    card: (
      <WiredIconButton color="red">
        <Close />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-fab-thumb-up',
    card: (
      <WiredIconButton color="#FFCC00">
        <ThumbUp />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-fab-star',
    card: (
      <WiredIconButton>
        <Star />
      </WiredIconButton>
    ),
  },
  {
    id: 'wired-fab-check',
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

const tabPanelEntries = [
  { id: 'wired-tabs-default', card: <WiredTabs /> },
];

function RenderSelectionPanel({
  title,
  entries,
}: {
  title: string;
  entries: { id: string; card: JSX.Element }[];
}) {
  return (
    <SelectionPanel title={title}>
      {entries.map((entry) => (
        <div style={{ padding: '10px' }} key={`${entry.id}-container`}>
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
  return (
    <>
      <RenderSelectionPanel title="Cards" entries={cardPanelEntries} />
      <RenderSelectionPanel title="Tabs" entries={tabPanelEntries} />
      <RenderSelectionPanel title="Media" entries={mediaPanelEntries} />
      <RenderSelectionPanel title="Dividers" entries={dividerEntries} />
      <RenderSelectionPanel title="Buttons" entries={buttonPanelEntries} />
      <RenderSelectionPanel title="Icon Buttons" entries={iconEntries} />
      <RenderSelectionPanel
        title="Floating Action Buttons"
        entries={fabEntries}
      />
      <RenderSelectionPanel title="Links" entries={wiredLinkPanelEntries} />
      <RenderSelectionPanel title="Progress" entries={wiredProgressEntries} />
      <RenderSelectionPanel title="Form Fields" entries={formEntries} />
      <RenderSelectionPanel
        title="Radio Buttons"
        entries={wiredRadioButtonEntries}
      />
      <RenderSelectionPanel
        title="Radio Groups"
        entries={wiredRadioGroupEntries}
      />
      <RenderSelectionPanel title="Dialogs" entries={dialogEntries} />
      <RenderSelectionPanel title="Calendars" entries={calendarEntries} />
      <RenderSelectionPanel title="Spinners" entries={spinnerPanelEntries} />
    </>
  );
}
