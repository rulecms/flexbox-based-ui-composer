import { useSelector } from 'react-redux';
import { Droppable } from '../Droppable';
import { DisplayComponentBasedOnType } from '../wired-elements/DisplayComponentBasedOnType';

import { ComposePlaygroundState, DisplayItemColumn, DisplayItemRow, DisplayItemType } from '../redux/compose-playground/types.d';

export function ComposePlayground() {
  const displayItemList = useSelector((state: {composePlayground: ComposePlaygroundState}) => state.composePlayground.displayItemList);
  return (
    <div>
      <div>
        {displayItemList.map((row: DisplayItemRow) => (
              <div key={row.id}
              className="flex auto flex-wrap flex-row"
            >
              {row.columns.map((item: DisplayItemColumn) => (
                <div key={item.id}>
                    {item.type === DisplayItemType.DroppableBox? (
                        <Droppable id={item.id}>
                            <div
                                className="flex justify-center items-center flex-nowrap"
                                style={{
                                    height: `50px`,
                                    width: `150px`,
                                    margin: `10px`,
                                    padding: `10px`,
                                    overflow: `hidden`,
                                }}
                            >
                                {item.id}
                            </div>
                        </Droppable> 
                    ): <DisplayComponentBasedOnType type={item.type} />}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}