import { ComposePlaygroundContainer } from './ComposePlayground.container';
import { SelectionContainer } from './SelectionContainer';
import { TopLevelContainer } from './TopLevelContainer';
import { SelectionChoices } from './SelectionChoices';

export function UIComposer({
  cardGroups,
  cardGroupsInitialState,
  componentList,
  displayComponentList,
}) {
  const left = (
    <SelectionContainer
      cardGroups={cardGroups}
      selectionChoices={
        <SelectionChoices cardGroupsInitialState={cardGroupsInitialState} />
      }
    />
  );
  return (
    <TopLevelContainer
      left={left}
      right={<ComposePlaygroundContainer componentList={displayComponentList} />}
    />
  );
}
