import { useSelector } from 'react-redux';
import { Droppable } from '../Droppable';
import { DisplayComponentBasedOnType } from '../wired-elements/DisplayComponentBasedOnType';


export function ComposePlayground() {
  const itemList = useSelector((state: any) => state.composePlayground.itemList)
  return (
    <div>
      <div>
        {itemList.map((row: any) => (
              <div key={row.id}
              className="flex auto flex-wrap flex-row"
            >
              {row.columns.map((item: any) => (
                <div key={item.id}>
                    {item.type === 'droppable-box'? (
                        <Droppable id={item.id}>
                            <div
                                className="flex justify-center items-center"
                                style={{
                                    height: `400px`,
                                    width: `400px`,
                                    margin: `10px`,
                                    padding: `10px`,
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