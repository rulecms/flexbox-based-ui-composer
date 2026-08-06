import { getDropContainerDimensions } from './get-drop-container-dimensions';

describe('getDropContainerDimensions', () => {
  it('returns full size for a single cell', () => {
    expect(getDropContainerDimensions(1, 1)).toEqual({
      height: '100%',
      width: '100%',
    });
  });

  it('returns full size for single-column multi-row layouts', () => {
    expect(getDropContainerDimensions(3, 1)).toEqual({
      height: '100%',
      width: '100%',
    });
  });

  it('returns a fixed width for multi-column layouts', () => {
    expect(getDropContainerDimensions(1, 2)).toEqual({
      height: '100%',
      width: '50px',
    });
    expect(getDropContainerDimensions(4, 3)).toEqual({
      height: '100%',
      width: '50px',
    });
  });
});
