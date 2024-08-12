import { WiredElementsContainer } from "./WiredElementsContainer";
import { ComposePlaygroundContainer } from "../ui-composer-sections/ComposePlayground.container";
import { SelectionContainer } from "../ui-composer-sections/SelectionContainer";
import { TopLevelContainer } from "../ui-composer-sections/TopLevelContainer";


export function MockedUIComposer({children}: any) {
    const left = (
        <SelectionContainer>
            <WiredElementsContainer />
        </SelectionContainer>
    );
    return (
        <TopLevelContainer left={left} right={<ComposePlaygroundContainer />} />
    );
}