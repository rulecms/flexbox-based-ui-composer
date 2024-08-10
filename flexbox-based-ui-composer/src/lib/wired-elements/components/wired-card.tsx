export function WiredCard({elevation = "1", fill, title="Title", content = "Content"}: {
  elevation?: string;
  fill?: string;
  title?: string;
  content?: string;
}) {
  return (
    <wired-card elevation={elevation} fill={fill}>
      <div style={{ padding: '10px' }}>
        <h1>{title || 'Title'}</h1>
        <p>{content || 'Content'}</p>
      </div>
    </wired-card>
  );
}
