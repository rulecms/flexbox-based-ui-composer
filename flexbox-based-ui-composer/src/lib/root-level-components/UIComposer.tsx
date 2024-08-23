import { ComposePlaygroundContainer } from '../ui-composer-sections/ComposePlayground.container';
import { SelectionContainer } from '../ui-composer-sections/SelectionContainer';
import { TopLevelContainer } from './TopLevelContainer';
import { SelectionChoices } from '../ui-composer-sections/SelectionChoices';

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
