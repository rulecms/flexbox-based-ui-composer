import SlButton from '@shoelace-style/shoelace/dist/react/button';

export const ModifyComponentChoices = ({ onClose }) => {
  const modifyComponentProperties = () => {
    console.log('Callback function for button 1');
  };

  const modifyRowLayout = () => {
    console.log('Callback function for button 2');
  };

  const deleteComponent = () => {
    console.log('Callback function for button 3');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: `var(--sl-spacing-large)`,
      }}
    >
      <SlButton onClick={modifyComponentProperties}>
        Modify Component Properties
      </SlButton>
      <SlButton onClick={modifyRowLayout}>Modify Row Layout</SlButton>
      <SlButton onClick={deleteComponent} variant="danger">
        Delete Component
      </SlButton>
      <SlButton onClick={onClose}>Cancel</SlButton>
    </div>
  );
};
