export const getSelectedRowIndex = (state) => {
  if (!state.selectedDisplayItem || !state.selectedDisplayItem.containerId) {
    console.error('No selectedDisplayItem found');
    return -1;
  }
  const index = state.itemList.findIndex(
    (row) => row.id === state.selectedDisplayItem?.containerId
  );
  if (index === -1) {
    console.error('Invalid row for the selected container id');
    return -1;
  }
  return index;
};
