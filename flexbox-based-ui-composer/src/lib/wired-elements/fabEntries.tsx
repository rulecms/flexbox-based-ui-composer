import { Favorite, Close, ThumbUp, Star, Check } from "@mui/icons-material";
import { WiredFab } from "./components/wired-fab";

export const fabEntries = [
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
