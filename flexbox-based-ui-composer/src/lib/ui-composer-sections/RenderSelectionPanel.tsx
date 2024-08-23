import { DraggableWithoutButtonLook } from "../drag-drop/DraggableWithoutButtonLook";
import { SelectionPanel } from "./SelectionPanel";
import { useSelector } from 'react-redux';

export function RenderSelectionPanel({
  cardGroupTitle,
  cardTitle,
  entries,
}: {
  cardGroupTitle: string;
  cardTitle: string;
  entries: { id: string; card: JSX.Element }[];
}) {
  const displayStatus = useSelector(
    (state: { composePlayground }) =>
      state.composePlayground.selectionCardDisplayStatuses
  );

  if (!displayStatus[cardGroupTitle]) {
    return null;
  }
  return (
    <SelectionPanel title={cardTitle}>
      {entries.map((entry) => (
        <div key={`${entry.id}-container`}>
          <DraggableWithoutButtonLook
            id={entry.id}
          >
            {entry.card}
          </DraggableWithoutButtonLook>
        </div>
      ))}
    </SelectionPanel>
  );
}