import { Draggable } from "../Draggable";

export function DraggableWiredElement({id, card}: {id: string, card: any}) {
    return (
        <Draggable id={id}>
            {card}
        </Draggable>
    );
}