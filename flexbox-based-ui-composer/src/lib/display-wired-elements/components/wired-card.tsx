export function WiredCard({elevation = "1", fill, title="Title", content = "Content"}: {
  elevation?: string;
  fill?: string;
  title?: string;
  content?: string;
}) {
  return (
    <wired-card elevation={elevation} fill={fill}>
      <div>
        <h2>{title || 'Title'}</h2>
        <p>{content || 'Content'}</p>
      </div>
    </wired-card>
  );
}
