export function WiredIconButton({
  children,
  color = `black`,
}: {
  children?: any;
  color?: string;
}) {
  return <wired-icon-button style={{ color }}>{children}</wired-icon-button>;
}
