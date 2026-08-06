import { getAlignItemsValue } from './get-align-items-value';
import { AlignItemsValues } from '../../../../redux/compose-playground/types.d';

describe('getAlignItemsValue', () => {
  it.each([
    [AlignItemsValues.FlexStart, 'flex-start'],
    [AlignItemsValues.Center, 'center'],
    [AlignItemsValues.FlexEnd, 'flex-end'],
    [AlignItemsValues.Stretch, 'stretch'],
    [AlignItemsValues.Baseline, 'baseline'],
  ] as const)('maps %s to %s', (option, expected) => {
    expect(getAlignItemsValue(option)).toBe(expected);
  });
});
