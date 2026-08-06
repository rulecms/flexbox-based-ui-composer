import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils/render-with-store';
import { SelectionChoices } from './SelectionChoices';

describe('SelectionChoices', () => {
  const cardGroupsInitialState = [
    { cardGroupTitle: 'Buttons', displayStatus: true },
    { cardGroupTitle: 'Cards', displayStatus: false },
    { cardGroupTitle: 'Media', displayStatus: true },
  ];

  it('switches on groups with displayStatus true on mount', () => {
    const { store } = renderWithStore(
      <SelectionChoices cardGroupsInitialState={cardGroupsInitialState} />
    );
    const statuses =
      store.getState().composePlayground.selectionCardDisplayStatuses;
    expect(statuses['Buttons']).toBe(true);
    expect(statuses['Media']).toBe(true);
    expect(statuses['Cards']).toBeUndefined();
  });

  it('toggles a checkbox and can uncheck all', () => {
    const { store } = renderWithStore(
      <SelectionChoices cardGroupsInitialState={cardGroupsInitialState} />,
      {
        preloadedComposePlayground: {
          selectionCardDisplayStatuses: {
            Buttons: true,
            Media: true,
          },
        },
      }
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(
      store.getState().composePlayground.selectionCardDisplayStatuses['Buttons']
    ).toBe(false);

    fireEvent.click(screen.getByText('Uncheck all'));
    const statuses =
      store.getState().composePlayground.selectionCardDisplayStatuses;
    expect(statuses['Buttons']).toBe(false);
    expect(statuses['Media']).toBe(false);
  });

  it('disables Uncheck all when none are visible', () => {
    renderWithStore(
      <SelectionChoices
        cardGroupsInitialState={[
          { cardGroupTitle: 'Buttons', displayStatus: false },
          { cardGroupTitle: 'Cards', displayStatus: false },
        ]}
      />,
      {
        preloadedComposePlayground: {
          selectionCardDisplayStatuses: {
            Buttons: false,
            Cards: false,
          },
        },
      }
    );
    expect((screen.getByText('Uncheck all') as HTMLButtonElement).disabled).toBe(
      true
    );
  });
});
