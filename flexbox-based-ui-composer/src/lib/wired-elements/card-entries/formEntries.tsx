import { WiredCheckbox } from "../index";
import { WiredCombo } from "../index";
import { WiredInput } from "../index";
import { WiredListbox } from "../index";
import { WiredSearchInput } from "../index";
import { WiredSlider } from "../index";
import { WiredTextarea } from "../index";
import { WiredToggle } from "../index";

export const formEntries = [
  { id: 'wired-input-default', card: <WiredInput /> },
  { id: 'wired-search-input-default', card: <WiredSearchInput /> },
  { id: 'wired-textarea-default', card: <WiredTextarea /> },
  { id: 'wired-combo-default', card: <WiredCombo /> },
  { id: 'wired-listbox-default', card: <WiredListbox /> },
  { id: 'wired-checkbox-default', card: <WiredCheckbox /> },
  { id: 'wired-toggle-default', card: <WiredToggle /> },
  { id: 'wired-slider-default', card: <WiredSlider /> },
];
