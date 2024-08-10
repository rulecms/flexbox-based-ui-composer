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
  WiredVideo
} from './index';

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
  { id: 'wired-card-elevation-2', card: <WiredCard elevation="2"/> },
  { id: 'wired-card-elevation-3', card: <WiredCard elevation="3"/> },
  { id: 'wired-card-elevation-4', card: <WiredCard elevation="4"/> },
  { id: 'wired-card-fill', card: <WiredCard fill="#aabbcc"/> },
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
]

const dialogEntries = [
  { id: 'wired-dialog-default', card: <WiredDialog /> },
]
  const allEntries = [
  { id: 'wired-divider-default', card: <WiredDivider /> },
  { id: 'wired-fab-default', card: <WiredFab /> },
  { id: 'wired-icon-button-default', card: <WiredIconButton /> },
  { id: 'wired-image-default', card: <WiredImage /> },
  { id: 'wired-link-default', card: <WiredLink /> },
  { id: 'wired-progress-ring-default', card: <WiredProgressRing /> },
  { id: 'wired-progress-default', card: <WiredProgress /> },
  { id: 'wired-radio-group-default', card: <WiredRadioGroup /> },
  { id: 'wired-radio-default', card: <WiredRadio /> },
  { id: 'wired-slider-default', card: <WiredSlider /> },
  { id: 'wired-spinner-default', card: <WiredSpinner /> },
  { id: 'wired-tabs-default', card: <WiredTabs /> },
  { id: 'wired-video-default', card: <WiredVideo /> },
];

function RenderSelectionPanel({ title, entries }: { title: string, entries: { id: string, card: JSX.Element }[] }) {
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
      <RenderSelectionPanel title="Buttons" entries={buttonPanelEntries} />
      <RenderSelectionPanel title="Cards" entries={cardPanelEntries} />
      <RenderSelectionPanel title="Dialogs" entries={dialogEntries} />
      <RenderSelectionPanel title="Form Fields" entries={formEntries} />
      <RenderSelectionPanel title="Calendars" entries={calendarEntries} />
      <RenderSelectionPanel title="All" entries={allEntries} />
    </>
  );
}
