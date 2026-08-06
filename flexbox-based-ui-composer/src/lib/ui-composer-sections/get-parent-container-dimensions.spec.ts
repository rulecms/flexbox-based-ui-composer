import { getParentContainerDimensions } from './get-parent-container-dimensions';

describe('getParentContainerDimensions', () => {
  it('returns full size for a single row', () => {
    expect(getParentContainerDimensions(1)).toEqual({
      height: '100%',
      width: '100%',
    });
  });

  it('inherits height for multi-row layouts', () => {
    expect(getParentContainerDimensions(2)).toEqual({
      height: 'inherit',
      width: '100%',
    });
  });
});
