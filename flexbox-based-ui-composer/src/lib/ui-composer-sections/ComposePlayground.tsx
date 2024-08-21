import { useSelector } from 'react-redux';
import { Droppable } from '../Droppable';
import {
  ComposePlaygroundState,
  DisplayItemColumn,
  DisplayItemRow,
  DisplayItemType,
  JustifyContentValues,
} from '../redux/compose-playground/types.d';
import { getDropContainerDimensions } from './get-drop-container-dimensions';
import React from 'react';
import { GetStartedContainer } from './GetStartedContainer';
import { DisplayComponent } from './DisplayComponent';
import { SetComponentProperties } from './SetComponentProperties';


export function ComposePlayground({ componentList }) {
  const displayItemList = useSelector(
    (state: { composePlayground: ComposePlaygroundState }) =>
      state.composePlayground.displayItemList
  );
  const hasNotStarted =
    displayItemList.length === 1 && displayItemList[0].columns.length === 1;

  const getHorizontalAlignmentValue = (row) => {
    return row.horizontalAlignment || JustifyContentValues.FlexStart;
  };

  if (hasNotStarted) {
    return <GetStartedContainer />;
  }

  return (
    <>
      {displayItemList.map((row: DisplayItemRow) => (
        <div
          key={row.id}
          className={`flex flex-row`}
          style={{ justifyContent: getHorizontalAlignmentValue(row) }}
        >
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
                <DisplayComponent
                  id={col.id}
                  containerId={row.id}
                  componentType={col.type}
                >
                  {componentList.find((entry) => entry.id === col.type)?.card}
                </DisplayComponent>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
      <SetComponentProperties />
    </>
  );
}
