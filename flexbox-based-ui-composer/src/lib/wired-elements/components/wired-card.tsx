export function WiredCard({
  elevation = '1',
  fill,
  title = 'Title',
  content = 'Content',
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
    <wired-card elevation={elevation} fill={fill}>
      <div>
        {displayTitle && <h2>{title || 'Title'}</h2>}
        {displayContent && <p>{content || 'Content'}</p>}
      </div>
    </wired-card>
  );
}
