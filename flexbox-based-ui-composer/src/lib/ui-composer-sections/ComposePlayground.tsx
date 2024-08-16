import { useSelector } from 'react-redux';
import { Droppable } from '../Droppable';
import { DisplayComponentBasedOnType } from '../wired-elements/DisplayComponentBasedOnType';

import {
  ComposePlaygroundState,
  DisplayItemColumn,
  DisplayItemRow,
  DisplayItemType,
} from '../redux/compose-playground/types.d';
import { getDropContainerDimensions } from './get-drop-container-dimensions';
import React from 'react';
import { GetStartedContainer } from './GetStartedContainer';

export function ComposePlayground() {
  const displayItemList = useSelector(
    (state: { composePlayground: ComposePlaygroundState }) =>
      state.composePlayground.displayItemList
  );

  const hasNotStarted =
    displayItemList.length === 1 && displayItemList[0].columns.length === 1;
  if (hasNotStarted) {
    return <GetStartedContainer />;
  }
  return (
    <>
      {displayItemList.map((row: DisplayItemRow) => (
        <div key={row.id} className="flex auto flex-wrap flex-row">
          {row.columns.map((col: DisplayItemColumn) => (
            <React.Fragment key={col.id}>
              {col.type === DisplayItemType.DroppableBox ? (
                <Droppable
                  id={col.id}
                  dimensions={getDropContainerDimensions(
                    displayItemList.length,
                    row.columns.length
                  )}
                >
                  <div
                    className="flex justify-center items-center flex-nowrap"
                    style={{
                      margin: `var(--sl-spacing-large)`,
                      padding: `var(--sl-spacing-large)`,
                      overflow: `hidden`,
                    }}
                  ></div>
                </Droppable>
              ) : (
                <DisplayComponentBasedOnType type={col.type} />
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </>
  );
}
