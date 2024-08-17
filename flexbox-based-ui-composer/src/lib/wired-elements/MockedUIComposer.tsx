import { WiredElementsContainer } from "./WiredElementsContainer";
import { ComposePlaygroundContainer } from "../ui-composer-sections/ComposePlayground.container";
import { SelectionContainer } from "../ui-composer-sections/SelectionContainer";
import { TopLevelContainer } from "../ui-composer-sections/TopLevelContainer";
import { cardGroupsInitialState } from "./card-groups-initial-state";
import { SelectionChoices } from "../ui-composer-sections/SelectionChoices";

export function MockedUIComposer() {
    const left = (
        <SelectionContainer selectionChoices={<SelectionChoices cardGroupsInitialState={cardGroupsInitialState}/>} >
            <WiredElementsContainer />
        </SelectionContainer>
    );
    return (
        <TopLevelContainer left={left} right={<ComposePlaygroundContainer />} />
    );
}