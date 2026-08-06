import { getJustifyContentValue } from './get-justify-content-value';
import { JustifyContentValues } from '../../../../redux/compose-playground/types.d';

describe('getJustifyContentValue', () => {
  it.each([
    [JustifyContentValues.FlexStart, 'flex-start'],
    [JustifyContentValues.Center, 'center'],
    [JustifyContentValues.FlexEnd, 'flex-end'],
    [JustifyContentValues.SpaceBetween, 'space-between'],
    [JustifyContentValues.SpaceAround, 'space-around'],
    [JustifyContentValues.SpaceEvenly, 'space-evenly'],
  ] as const)('maps %s to %s', (option, expected) => {
    expect(getJustifyContentValue(option)).toBe(expected);
  });

  it('defaults to flex-start for unknown values', () => {
    expect(getJustifyContentValue('unknown' as JustifyContentValues)).toBe(
      'flex-start'
    );
  });
});
