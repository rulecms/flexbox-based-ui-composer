import { ReactNode } from 'react';
import SlCard from '@shoelace-style/shoelace/dist/react/card/index.js';

const style = `
  .card-header {
    width: clamp(450px, 450px, 450px);
}`;

export function SelectionPanel({ title, children }: {title: string, children: ReactNode}) {
  return (
    <div>
      <SlCard className="card-header">
        <div slot="header">{title}</div>
        <div className="flex flex-wrap">{children}</div>
      </SlCard>
      <style>{style}</style>
    </div>
  );
}
