import { WiredElementsContainer } from "./WiredElementsContainer";
import { ComposePlaygroundContainer } from "../ui-composer-sections/ComposePlayground.container";
import { SelectionContainer } from "../ui-composer-sections/SelectionContainer";
import { TopLevelContainer } from "../ui-composer-sections/TopLevelContainer";
import { selectionCardOptions } from "./selection-card-options";
import { SelectionChoices } from "../ui-composer-sections/SelectionChoices";

export function MockedUIComposer() {
    const left = (
        <SelectionContainer selectionChoices={<SelectionChoices selectionCardOptions={selectionCardOptions}/>} >
            <WiredElementsContainer />
        </SelectionContainer>
    );
    return (
        <TopLevelContainer left={left} right={<ComposePlaygroundContainer />} />
    );
}