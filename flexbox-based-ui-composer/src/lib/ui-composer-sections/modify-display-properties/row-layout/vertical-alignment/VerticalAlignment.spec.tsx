import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  createTestStore,
  renderWithStore,
} from '../../../../../test-utils/render-with-store';
import {
  AlignItemsValues,
  DisplayItemType,
} from '../../../../redux/compose-playground/types.d';
import { VerticalAlignment } from './VerticalAlignment';

function getDisplayOptionFromFiber(
  element: Element
): React.FC<{ option: AlignItemsValues }> | undefined {
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

describe('VerticalAlignment', () => {
  const row = {
    id: 'row-1',
    verticalAlignment: AlignItemsValues.Center,
    columns: [{ id: 'col-1', type: 'wired-button' as DisplayItemType }],
  };

  const titles = [
    'Align items to the start of the container',
    'Align items to the center of the container',
    'Align items to the end of the container',
    'Align items along the baseline of the container',
    'Stretch items to fill the container',
  ];

  it('renders all options and dispatches on click', () => {
    const { store } = renderWithStore(<VerticalAlignment />, {
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

    fireEvent.click(screen.getByTitle(titles[4]));
    expect(
      store.getState().composePlayground.itemList[0].verticalAlignment
    ).toBe(AlignItemsValues.Stretch);
  });

  it('falls back when no containerId', () => {
    renderWithStore(<VerticalAlignment />, {
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
  });

  it('falls back when row is missing', () => {
    renderWithStore(<VerticalAlignment />, {
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
    renderWithStore(<VerticalAlignment />, {
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
        <VerticalAlignment />
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
            option: 'not-a-real-alignment' as AlignItemsValues,
          })}
      </Provider>
    );
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button.title).toBe('');
  });
});
