import { Favorite, Close, ThumbUp, Star, Check } from "@mui/icons-material";
import { WiredIconButton } from "../components/wired-icon-button";

export const iconEntries = [
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
