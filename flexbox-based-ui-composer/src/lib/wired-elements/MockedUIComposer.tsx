import { ComposePlaygroundContainer } from '../ui-composer-sections/ComposePlayground.container';
import { SelectionContainer } from '../ui-composer-sections/SelectionContainer';
import { TopLevelContainer } from '../ui-composer-sections/TopLevelContainer';
import { cardGroupsInitialState } from './card-groups-initial-state';
import { SelectionChoices } from '../ui-composer-sections/SelectionChoices';
import { componentAndIdArray } from './card-groups';

import { cardGroups } from './card-groups';

export function MockedUIComposer() {
  const left = (
    <SelectionContainer cardGroups={cardGroups}
    selectionChoices={
      <SelectionChoices cardGroupsInitialState={cardGroupsInitialState} />
    } />
  );
  return (
    <TopLevelContainer left={left} right={<ComposePlaygroundContainer componentList={componentAndIdArray}/>} />
  );
}
