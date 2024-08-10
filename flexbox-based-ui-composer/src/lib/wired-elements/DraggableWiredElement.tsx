import { DraggableWithoutButtonLook } from "../DraggableWithoutButtonLook";

export function DraggableWiredElement({id, card}: {id: string, card: any}) {
    return (
        <DraggableWithoutButtonLook id={id}>
            {card}
        </DraggableWithoutButtonLook>
    );
}