import { ReactNode } from 'react';

export function WiredIconButton({
  children,
}: {
  children?: ReactNode;
}) {
  return <wired-icon-button>{children}</wired-icon-button>;
}
