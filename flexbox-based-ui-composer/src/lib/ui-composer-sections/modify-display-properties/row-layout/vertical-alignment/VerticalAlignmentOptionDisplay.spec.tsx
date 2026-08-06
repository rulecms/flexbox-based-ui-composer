import React from 'react';
import { render } from '@testing-library/react';
import { AlignItemsValues } from '../../../../redux/compose-playground/types.d';
import { VerticalAlignmentOptionDisplay } from './VerticalAlignmentOptionDisplay';

describe('VerticalAlignmentOptionDisplay', () => {
  it.each(Object.values(AlignItemsValues))(
    'renders boxes for option %s',
    (option) => {
      const { container } = render(
        <VerticalAlignmentOptionDisplay option={option} />
      );
      const root = container.firstChild as HTMLElement;
      expect(root.style.display).toBe('flex');
      expect(root.children.length).toBe(3);
    }
  );
});
