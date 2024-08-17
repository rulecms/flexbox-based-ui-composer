import { ComposePlayground } from './ComposePlayground';

export function ComposePlaygroundContainer({ children }: any) {
  return (
    <div
      style={{ height: `100%` }}
      className="flex auto flex-col justify-start"
    >
      <ComposePlayground key="compose-playground" />
    </div>
  );
}
