export function WiredCard({
  elevation = '1',
  fill,
  title = 'Lorem ipsum dolor sit',
  content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  displayTitle = true,
  displayContent = true,
}: {
  elevation?: string;
  fill?: string;
  title?: string;
  content?: string;
  displayTitle?: boolean;
  displayContent?: boolean;
}) {
  return (
    <wired-card
      elevation={elevation}
      fill={fill}
    >
      <div>
        {displayTitle && <h2>{title || ''}</h2>}
        {displayContent && <p>{content}</p>}
      </div>
    </wired-card>
  );
}
