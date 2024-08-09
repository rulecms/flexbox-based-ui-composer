import './flexbox-based-ui-composer.css'; //imports css files as is without modifying class names using the rollup-plugin-postcss
import { DragDropContainer } from './DragDropContainer';

export function FlexboxBasedUiComposer() {
  return (
    <div className={`container`}>
      <DragDropContainer/>
    </div>
  );
}

export default FlexboxBasedUiComposer;
