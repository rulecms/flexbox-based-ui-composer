import React from 'react';
import { render } from '@testing-library/react';
import { JustifyContentValues } from '../../../../redux/compose-playground/types.d';
import { HorizontalAlignmentOptionDisplay } from './HorizontalAlignmentOptionDisplay';

describe('HorizontalAlignmentOptionDisplay', () => {
  it.each(Object.values(JustifyContentValues))(
    'renders boxes for option %s',
    (option) => {
      const { container } = render(
        <HorizontalAlignmentOptionDisplay option={option} />
      );
      const root = container.firstChild as HTMLElement;
      expect(root.style.display).toBe('flex');
      expect(root.children.length).toBe(3);
    }
  );
});
