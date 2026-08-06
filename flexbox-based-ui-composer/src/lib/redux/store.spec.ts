import store from './store';

describe('redux store', () => {
  it('configures a store with the composePlayground reducer', () => {
    const state = store.getState();

    expect(state).toHaveProperty('composePlayground');
    expect(state.composePlayground).toMatchObject({
      itemList: [],
      isDragState: false,
      selectionCardDisplayStatuses: {},
      previousItemListStates: [],
      futureItemListStates: [],
    });
    expect(state.composePlayground.displayItemList).toHaveLength(1);
    expect(typeof store.dispatch).toBe('function');
  });
});
