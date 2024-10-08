import { WiredCard } from "../index"

export const cardEntries = [
  { id: 'wired-card-title', card: <WiredCard displayContent={false}/> },
  { id: 'wired-card-default', card: <WiredCard displayTitle={false}/> },
  { id: 'wired-card-1', card: <WiredCard /> },
  { id: 'wired-card-elevation-2', card: <WiredCard elevation="2" /> },
  { id: 'wired-card-fill', card: <WiredCard fill="#aabbcc" /> },
];
