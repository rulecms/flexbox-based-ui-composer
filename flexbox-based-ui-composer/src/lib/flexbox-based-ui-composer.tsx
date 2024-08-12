import './flexbox-based-ui-composer.css'; //imports css files as is without modifying class names using the rollup-plugin-postcss
import { DragDropContainer } from './DragDropContainer';
import { Provider } from 'react-redux';
import store from './redux/store';
export function FlexboxBasedUiComposer() {
  return (
      <Provider store={store}>
        <DragDropContainer/>
      </Provider>
  );
}

export default FlexboxBasedUiComposer;
