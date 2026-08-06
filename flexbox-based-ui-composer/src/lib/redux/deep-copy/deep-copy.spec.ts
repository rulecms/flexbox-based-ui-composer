import { getDeepCopy } from './deep-copy';
import { DisplayItemRow, DisplayItemType } from '../compose-playground/types.d';

describe('getDeepCopy', () => {
  it('returns a deep copy of a serializable item list', () => {
    const item: DisplayItemRow[] = [
      {
        id: 'row-1',
        columns: [{ id: 'col-1', type: DisplayItemType.DroppableBox }],
      },
    ];

    const copy = getDeepCopy(item);

    expect(copy).toEqual(item);
    expect(copy).not.toBe(item);
    expect(copy[0]).not.toBe(item[0]);
    expect(copy[0].columns).not.toBe(item[0].columns);
  });

  it('logs and returns the original value when cloning fails', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const circular: any = { id: 'row-1', columns: [] };
    circular.self = circular;

    const result = getDeepCopy(circular as DisplayItemRow[]);

    expect(result).toBe(circular);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error while deep copying. Undo Redo will not work as expected'
    );

    consoleErrorSpy.mockRestore();
  });
});
