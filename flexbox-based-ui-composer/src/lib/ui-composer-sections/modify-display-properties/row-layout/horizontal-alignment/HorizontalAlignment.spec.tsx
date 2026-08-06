import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  createTestStore,
  renderWithStore,
} from '../../../../../test-utils/render-with-store';
import {
  DisplayItemType,
  JustifyContentValues,
} from '../../../../redux/compose-playground/types.d';
import { HorizontalAlignment } from './HorizontalAlignment';

function getDisplayOptionFromFiber(
  element: Element
): React.FC<{ option: JustifyContentValues }> | undefined {
  const key = Object.keys(element).find((k) => k.startsWith('__reactFiber'));
  if (!key) return undefined;
  let fiber: any = (element as any)[key];
  while (fiber) {
    if (
      typeof fiber.type === 'function' &&
      typeof fiber.type.toString === 'function' &&
      fiber.type.toString().includes('getTitle')
    ) {
      return fiber.type;
    }
    fiber = fiber.return;
  }
  return undefined;
}

describe('HorizontalAlignment', () => {
  const row = {
    id: 'row-1',
    horizontalAlignment: JustifyContentValues.Center,
    columns: [{ id: 'col-1', type: 'wired-button' as DisplayItemType }],
  };

  const titles = [
    'Items are packed toward the start of the row.',
    'Items are centered in the row.',
    'Items are packed toward the end of the row.',
    'Items are evenly distributed in the row, with the first item at the start and the last item at the end.',
    'Items are evenly distributed in the row, with equal space around each item.',
    'Items are evenly distributed in the row, with equal space around each item and at the start and end of the row.',
  ];

  it('renders all options and dispatches on click', () => {
    const { store } = renderWithStore(<HorizontalAlignment />, {
      preloadedComposePlayground: {
        selectedDisplayItem: {
          id: 'col-1',
          containerId: 'row-1',
          componentType: 'wired-button' as DisplayItemType,
        },
        itemList: [row],
      },
    });

    titles.forEach((title) => {
      expect(screen.getByTitle(title)).toBeTruthy();
    });

    fireEvent.click(screen.getByTitle(titles[2]));
    expect(
      store.getState().composePlayground.itemList[0].horizontalAlignment
    ).toBe(JustifyContentValues.FlexEnd);

    fireEvent.click(screen.getByTitle(titles[0]));
    fireEvent.click(screen.getByTitle(titles[1]));
    fireEvent.click(screen.getByTitle(titles[3]));
    fireEvent.click(screen.getByTitle(titles[4]));
    fireEvent.click(screen.getByTitle(titles[5]));
    expect(
      store.getState().composePlayground.itemList[0].horizontalAlignment
    ).toBe(JustifyContentValues.SpaceEvenly);
  });

  it('falls back when no containerId', () => {
    renderWithStore(<HorizontalAlignment />, {
      preloadedComposePlayground: {
        selectedDisplayItem: {
          id: 'col-1',
          containerId: undefined as unknown as string,
          componentType: 'wired-button' as DisplayItemType,
        },
        itemList: [row],
      },
    });
    expect(screen.getByTitle(titles[0])).toBeTruthy();
    expect(screen.getAllByRole('button').length).toBe(6);
  });

  it('falls back when row is missing', () => {
    renderWithStore(<HorizontalAlignment />, {
      preloadedComposePlayground: {
        selectedDisplayItem: {
          id: 'col-1',
          containerId: 'missing-row',
          componentType: 'wired-button' as DisplayItemType,
        },
        itemList: [row],
      },
    });
    expect(screen.getByTitle(titles[0])).toBeTruthy();
  });

  it('falls back when alignment is missing on row', () => {
    renderWithStore(<HorizontalAlignment />, {
      preloadedComposePlayground: {
        selectedDisplayItem: {
          id: 'col-1',
          containerId: 'row-1',
          componentType: 'wired-button' as DisplayItemType,
        },
        itemList: [
          {
            id: 'row-1',
            columns: [{ id: 'col-1', type: 'wired-button' as DisplayItemType }],
          },
        ],
      },
    });
    expect(screen.getByTitle(titles[0])).toBeTruthy();
  });

  it('getTitle default branch returns empty string for invalid option', () => {
    const store = createTestStore({
      selectedDisplayItem: {
        id: 'col-1',
        containerId: 'row-1',
        componentType: 'wired-button' as DisplayItemType,
      },
      itemList: [row],
    });

    render(
      <Provider store={store}>
        <HorizontalAlignment />
      </Provider>
    );

    const DisplayOption = getDisplayOptionFromFiber(
      screen.getByTitle(titles[0])
    );
    expect(DisplayOption).toBeDefined();

    const { container } = render(
      <Provider store={store}>
        {DisplayOption &&
          React.createElement(DisplayOption, {
            option: 'not-a-real-alignment' as JustifyContentValues,
          })}
      </Provider>
    );
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button.title).toBe('');
  });
});
