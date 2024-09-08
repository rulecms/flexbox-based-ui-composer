import { DisplayItemRow } from "../compose-playground/types.d";

export const getDeepCopy = (item: DisplayItemRow[]): DisplayItemRow[] => {
  try {
    return JSON.parse(JSON.stringify(item));
  } catch (e) {
    console.error("Error while deep copying. Undo Redo will not work as expected");
    return item;
  }
};
