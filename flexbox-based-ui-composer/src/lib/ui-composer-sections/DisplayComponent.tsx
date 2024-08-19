const style = `
button.displayButtonContents > * {
  pointer-events: none;

}
`;
export const DisplayComponent = ({ children }) => {
  if (children === null) {
    return null;
  }
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('DisplayComponent clicked', event.target);
    // Add your desired logic here
  };

return (
    <button className="displayButtonContents" style={{  
            background: 'transparent',
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'inline-block',
            cursor: 'pointer',
        }} onClick={handleClick}>
        {children}
        <style>{style}</style>
    </button>
);
};
