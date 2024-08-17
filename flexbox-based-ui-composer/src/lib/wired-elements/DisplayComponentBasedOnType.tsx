import { componentAndIdArray } from './card-groups';

export const DisplayComponentBasedOnType = ({ type }: { type: string }) => {
  return componentAndIdArray.find((entry) => entry.id === type)?.card || null;
};
