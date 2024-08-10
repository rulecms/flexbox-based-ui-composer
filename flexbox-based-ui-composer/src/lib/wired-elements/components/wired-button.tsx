export function WiredButton({
  disabled = false,
  elevation = "1",
  click = undefined,
  content = 'Click Me',
}) {
  if (disabled) {
    return (
      <wired-button elevation={elevation} disabled>
        {content}
      </wired-button>
    );
  }
  return <wired-button elevation={elevation}>{content}</wired-button>;
}
