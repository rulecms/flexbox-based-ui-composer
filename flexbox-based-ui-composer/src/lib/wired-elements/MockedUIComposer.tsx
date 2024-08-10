import { WiredElementsContainer } from "./WiredElementsContainer";
import { ComposePlayground } from "../ui-composer-sections/ComposePlayground";
import { SelectionContainer } from "../ui-composer-sections/SelectionContainer";
import { TopLevelContainer } from "../ui-composer-sections/TopLevelContainer";


export function MockedUIComposer({children}: any) {
    const left = (
        <SelectionContainer>
            <WiredElementsContainer />
        </SelectionContainer>
    );
    return (
        <TopLevelContainer left={left} right={<ComposePlayground/>} />
    );
}