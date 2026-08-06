jest.mock('uuid', () => {
  let id = 0;
  return {
    v4: () => `mock-uuid-${++id}`,
  };
});

import {
  addItem,
  deleteItem,
  deleteSelectedRow,
  duplicateItem,
  duplicateSelectedRow,
  redo,
  setDeviceDisplayType,
  setDragEnd,
  setDragStart,
  setModifyingRowLayout,
  setRowHorizontalAlignment,
  setRowVerticalAlignment,
  setSelectedDisplayItem,
  switchOffAllSelectionCardDisplayStatuses,
  switchOnSelectionCardDisplayStatus,
  toggleSelectionCardDisplayStatus,
  undo,
} from './compose-playground-slice';
import { createTestStore } from '../../../test-utils/render-with-store';
import {
  AlignItemsValues,
  DeviceDisplayType,
  DisplayItemRow,
  DisplayItemType,
  JustifyContentValues,
  SelectedDisplayItem,
} from './types.d';

const makeRow = (
  id: string,
  columnIds: string[],
  extras: Partial<DisplayItemRow> = {}
): DisplayItemRow => ({
  id,
  columns: columnIds.map((colId) => ({
    id: colId,
    type: DisplayItemType.DroppableBox,
  })),
  ...extras,
});

const selectItem = (
  id: string,
  containerId: string
): SelectedDisplayItem => ({
  id,
  containerId,
  componentType: DisplayItemType.DroppableBox,
});

describe('composePlaygroundSlice', () => {
  describe('addItem', () => {
    it('returns early for empty payload fields', () => {
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
      });
      const before = store.getState().composePlayground;

      store.dispatch(
        addItem({ itemTypeToBeAdded: '', droppedRefId: 'above-row-1' } as any)
      );
      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: '',
        } as any)
      );

      expect(store.getState().composePlayground.itemList).toEqual(
        before.itemList
      );
      expect(
        store.getState().composePlayground.previousItemListStates
      ).toEqual([]);
    });

    it('appends a new item when the list is empty', () => {
      const store = createTestStore({ itemList: [] });

      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: 'anywhere',
        })
      );

      const { itemList, previousItemListStates, futureItemListStates } =
        store.getState().composePlayground;
      expect(itemList).toHaveLength(1);
      expect(itemList[0].columns[0].type).toBe(DisplayItemType.DroppableBox);
      expect(previousItemListStates).toHaveLength(1);
      expect(previousItemListStates[0]).toEqual([]);
      expect(futureItemListStates).toEqual([]);
    });

    it('inserts above, below, left, and right of existing items', () => {
      const store = createTestStore({
        itemList: [
          makeRow('row-1', ['col-1', 'col-2']),
          makeRow('row-2', ['col-3']),
        ],
      });

      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: 'above-row-1',
        })
      );
      expect(store.getState().composePlayground.itemList[0].id).toMatch(
        /^mock-uuid-/
      );
      expect(store.getState().composePlayground.itemList).toHaveLength(3);

      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: 'below-row-2',
        })
      );
      const afterBelow = store.getState().composePlayground.itemList;
      expect(afterBelow).toHaveLength(4);
      expect(afterBelow[afterBelow.length - 1].columns[0].type).toBe(
        DisplayItemType.DroppableBox
      );

      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: 'left-col-1-in-row-1',
        })
      );
      const row1 = store
        .getState()
        .composePlayground.itemList.find((row) => row.id === 'row-1');
      expect(row1?.columns).toHaveLength(3);
      expect(row1?.columns[0].id).toMatch(/^mock-uuid-/);

      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: 'right-col-2-in-row-1',
        })
      );
      const row1AfterRight = store
        .getState()
        .composePlayground.itemList.find((row) => row.id === 'row-1');
      expect(row1AfterRight?.columns).toHaveLength(4);
    });

    it('does not change composition for an unknown droppable prefix', () => {
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
      });

      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: 'unknown-row-1',
        })
      );

      expect(store.getState().composePlayground.itemList).toEqual([
        makeRow('row-1', ['col-1']),
      ]);
      expect(
        store.getState().composePlayground.previousItemListStates
      ).toEqual([]);
    });

    it('caps previous history at 10 entries', () => {
      const store = createTestStore({ itemList: [] });

      for (let i = 0; i < 11; i += 1) {
        const itemList = store.getState().composePlayground.itemList;
        const droppedRefId =
          itemList.length === 0
            ? 'seed'
            : `below-${itemList[itemList.length - 1].id}`;
        store.dispatch(
          addItem({
            itemTypeToBeAdded: DisplayItemType.DroppableBox,
            droppedRefId,
          })
        );
      }

      expect(
        store.getState().composePlayground.previousItemListStates
      ).toHaveLength(10);
    });
  });

  describe('deleteItem', () => {
    it('errors when the row is missing', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
      });

      store.dispatch(deleteItem({ id: 'col-1', containerId: 'missing' }));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No row item found with id: ',
        'missing'
      );
      expect(store.getState().composePlayground.itemList).toHaveLength(1);
      consoleErrorSpy.mockRestore();
    });

    it('removes the entire row when it has a single column', () => {
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1']), makeRow('row-2', ['col-2'])],
      });

      store.dispatch(deleteItem({ id: 'col-1', containerId: 'row-1' }));

      expect(store.getState().composePlayground.itemList).toEqual([
        makeRow('row-2', ['col-2']),
      ]);
      expect(
        store.getState().composePlayground.previousItemListStates
      ).toHaveLength(1);
    });

    it('removes a column and clears selection in a multi-column row', () => {
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1', 'col-2'])],
        selectedDisplayItem: selectItem('col-1', 'row-1'),
      });

      store.dispatch(deleteItem({ id: 'col-1', containerId: 'row-1' }));

      expect(store.getState().composePlayground.itemList).toEqual([
        makeRow('row-1', ['col-2']),
      ]);
      expect(store.getState().composePlayground.selectedDisplayItem).toBeNull();
    });

    it('errors when the column is missing in a multi-column row', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1', 'col-2'])],
      });

      store.dispatch(deleteItem({ id: 'missing-col', containerId: 'row-1' }));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No column item found with id: ',
        'row-1'
      );
      expect(store.getState().composePlayground.itemList[0].columns).toHaveLength(
        2
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe('duplicateItem', () => {
    it('errors for invalid row or column selection', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
      });

      store.dispatch(duplicateItem({ id: 'col-1', containerId: 'missing' }));
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No row item found with id: ',
        'missing'
      );

      store.dispatch(duplicateItem({ id: 'missing', containerId: 'row-1' }));
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No column item found with id: ',
        'missing'
      );
      consoleErrorSpy.mockRestore();
    });

    it('duplicates a column in place', () => {
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
      });

      store.dispatch(duplicateItem({ id: 'col-1', containerId: 'row-1' }));

      const columns = store.getState().composePlayground.itemList[0].columns;
      expect(columns).toHaveLength(2);
      expect(columns[0].id).toMatch(/^mock-uuid-/);
      expect(columns[1].id).toBe('col-1');
    });
  });

  describe('duplicateSelectedRow / deleteSelectedRow', () => {
    it('errors when there is no valid selected row', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
      });

      store.dispatch(duplicateSelectedRow());
      store.dispatch(deleteSelectedRow());

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No selectedDisplayItem found'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith('No selected row found');
      consoleErrorSpy.mockRestore();
    });

    it('errors when selected container id is invalid', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
        selectedDisplayItem: selectItem('col-1', 'missing-row'),
      });

      store.dispatch(duplicateSelectedRow());
      store.dispatch(deleteSelectedRow());

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Invalid row for the selected container id'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith('No selected row found');
      consoleErrorSpy.mockRestore();
    });

    it('duplicates and deletes the selected row', () => {
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1']), makeRow('row-2', ['col-2'])],
        selectedDisplayItem: selectItem('col-1', 'row-1'),
      });

      store.dispatch(duplicateSelectedRow());
      expect(store.getState().composePlayground.itemList).toHaveLength(3);
      expect(store.getState().composePlayground.itemList[0].id).toMatch(
        /^mock-uuid-/
      );
      expect(store.getState().composePlayground.itemList[0].columns[0].id).toMatch(
        /^mock-uuid-/
      );

      store.dispatch(
        setSelectedDisplayItem(selectItem('col-2', 'row-2'))
      );
      store.dispatch(deleteSelectedRow());

      expect(
        store
          .getState()
          .composePlayground.itemList.find((row) => row.id === 'row-2')
      ).toBeUndefined();
      expect(store.getState().composePlayground.selectedDisplayItem).toBeNull();
    });
  });

  describe('undo / redo', () => {
    it('errors when stacks are empty', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const store = createTestStore();

      store.dispatch(undo());
      store.dispatch(redo());

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No previous state to undo to'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No future state to redo to'
      );
      consoleErrorSpy.mockRestore();
    });

    it('undoes and redoes composition changes', () => {
      const store = createTestStore({ itemList: [] });

      store.dispatch(
        addItem({
          itemTypeToBeAdded: DisplayItemType.DroppableBox,
          droppedRefId: 'seed',
        })
      );
      const afterAdd = store.getState().composePlayground.itemList;

      store.dispatch(undo());
      expect(store.getState().composePlayground.itemList).toEqual([]);
      expect(
        store.getState().composePlayground.futureItemListStates
      ).toHaveLength(1);

      store.dispatch(redo());
      expect(store.getState().composePlayground.itemList).toEqual(afterAdd);
      expect(
        store.getState().composePlayground.previousItemListStates
      ).toHaveLength(1);
      expect(
        store.getState().composePlayground.futureItemListStates
      ).toEqual([]);
    });
  });

  describe('device display type', () => {
    it('updates the compose view device display type', () => {
      const store = createTestStore();

      store.dispatch(setDeviceDisplayType(DeviceDisplayType.Phone));

      expect(
        store.getState().composePlayground.uiStyles.composeView.deviceDisplayType
      ).toBe(DeviceDisplayType.Phone);
    });
  });

  describe('row layout', () => {
    it('throws when selection is invalid', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      const horizontalStore = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
      });
      expect(() =>
        horizontalStore.dispatch(
          setRowHorizontalAlignment(JustifyContentValues.Center)
        )
      ).toThrow();

      const verticalStore = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
        selectedDisplayItem: {
          id: 'col-1',
          containerId: '',
          componentType: DisplayItemType.DroppableBox,
        },
      });
      expect(() =>
        verticalStore.dispatch(setRowVerticalAlignment(AlignItemsValues.Center))
      ).toThrow();

      consoleErrorSpy.mockRestore();
    });

    it('no-ops when alignment values are unchanged', () => {
      const store = createTestStore({
        itemList: [
          makeRow('row-1', ['col-1'], {
            horizontalAlignment: JustifyContentValues.Center,
            verticalAlignment: AlignItemsValues.Center,
          }),
        ],
        selectedDisplayItem: selectItem('col-1', 'row-1'),
      });

      store.dispatch(setRowHorizontalAlignment(JustifyContentValues.Center));
      store.dispatch(setRowVerticalAlignment(AlignItemsValues.Center));

      expect(
        store.getState().composePlayground.previousItemListStates
      ).toEqual([]);
    });

    it('updates horizontal and vertical alignment', () => {
      const store = createTestStore({
        itemList: [makeRow('row-1', ['col-1'])],
        selectedDisplayItem: selectItem('col-1', 'row-1'),
      });

      store.dispatch(setRowHorizontalAlignment(JustifyContentValues.FlexEnd));
      store.dispatch(setRowVerticalAlignment(AlignItemsValues.FlexEnd));

      const row = store.getState().composePlayground.itemList[0];
      expect(row.horizontalAlignment).toBe(JustifyContentValues.FlexEnd);
      expect(row.verticalAlignment).toBe(AlignItemsValues.FlexEnd);
      expect(
        store.getState().composePlayground.previousItemListStates
      ).toHaveLength(2);
    });
  });

  describe('selection and drag helpers', () => {
    it('sets selected display item and modifying row layout', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const store = createTestStore();

      store.dispatch(setModifyingRowLayout());
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'No selectedDisplayItem found'
      );

      const selected = selectItem('col-1', 'row-1');
      store.dispatch(setSelectedDisplayItem(selected));
      store.dispatch(setModifyingRowLayout());

      expect(store.getState().composePlayground.selectedDisplayItem).toEqual({
        ...selected,
        modifyingRowLayout: true,
      });
      consoleErrorSpy.mockRestore();
    });

    it('toggles drag state', () => {
      const store = createTestStore();

      store.dispatch(setDragStart());
      expect(store.getState().composePlayground.isDragState).toBe(true);

      store.dispatch(setDragEnd());
      expect(store.getState().composePlayground.isDragState).toBe(false);
    });

    it('manages selection card display statuses', () => {
      const store = createTestStore({
        selectionCardDisplayStatuses: {
          'card-a': false,
          'card-b': true,
        },
      });

      store.dispatch(toggleSelectionCardDisplayStatus('card-a'));
      expect(
        store.getState().composePlayground.selectionCardDisplayStatuses['card-a']
      ).toBe(true);

      store.dispatch(toggleSelectionCardDisplayStatus('card-a'));
      expect(
        store.getState().composePlayground.selectionCardDisplayStatuses['card-a']
      ).toBe(false);

      store.dispatch(switchOnSelectionCardDisplayStatus('card-c'));
      expect(
        store.getState().composePlayground.selectionCardDisplayStatuses['card-c']
      ).toBe(true);

      store.dispatch(switchOffAllSelectionCardDisplayStatuses());
      expect(
        store.getState().composePlayground.selectionCardDisplayStatuses
      ).toEqual({
        'card-a': false,
        'card-b': false,
        'card-c': false,
      });
    });
  });
});
