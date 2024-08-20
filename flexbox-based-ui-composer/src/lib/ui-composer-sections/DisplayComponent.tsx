import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedDisplayItem } from '../redux/compose-playground/compose-playground-slice';

const style = `
button.displayButtonContents > * {
  pointer-events: none;

}
`;
export const DisplayComponent = ({
  id,
  containerId,
  componentType,
  children,
}: {
  id: string;
  containerId: string;
  componentType: string;
  children: ReactNode;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function preventCrashOnClickOfVideoControls() {
      // wait for render to complete
      await new Promise((resolve) => setTimeout(resolve, 1));

      const controlsWithClickIssue = document
        .querySelector(`#displayComponent${id} wired-video`)
        ?.shadowRoot?.querySelector('#controls');

      if (controlsWithClickIssue) {
        controlsWithClickIssue.setAttribute('style', 'pointer-events: none');
      }
    }
    preventCrashOnClickOfVideoControls();
  }, [id]);
  if (children === null) {
    return null;
  }
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(
      setSelectedDisplayItem({
        id,
        containerId,
        componentType,
      })
    );
  };

  return (
    <button
      className="displayButtonContents"
      id={`displayComponent${id}`}
      style={{
        background: 'transparent',
        border: 'none',
        margin: 0,
        padding: 0,
        display: 'inline-block',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {children}
      <style>{style}</style>
    </button>
  );
};
