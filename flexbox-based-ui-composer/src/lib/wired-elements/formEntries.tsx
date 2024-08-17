import { WiredCheckbox } from "./components/wired-checkbox";
import { WiredCombo } from "./components/wired-combo";
import { WiredInput } from "./components/wired-input";
import { WiredListbox } from "./components/wired-listbox";
import { WiredSearchInput } from "./components/wired-search-input";
import { WiredSlider } from "./components/wired-slider";
import { WiredTextarea } from "./components/wired-textarea";
import { WiredToggle } from "./components/wired-toggle";

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
