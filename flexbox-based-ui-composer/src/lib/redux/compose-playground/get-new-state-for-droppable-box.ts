import { generateUniqueId } from './generate-unique-id';

export function getNewStateForDroppableBox() {
    return {
        id: generateUniqueId(),
        columns: [
        {
            type: 'droppable-box',
            id: generateUniqueId(),
        },
        ],
    };
}