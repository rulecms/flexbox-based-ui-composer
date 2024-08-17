import { WiredRadio } from "./components/wired-radio";

export const radioButtonEntries = [
  { id: 'wired-radio-default', card: <WiredRadio>Radio 1</WiredRadio> },
  { id: 'wired-radio-checked', card: <WiredRadio checked>Radio 2</WiredRadio> },
  {
    id: 'wired-radio-disabled',
    card: <WiredRadio disabled>Radio 3</WiredRadio>,
  },
];
