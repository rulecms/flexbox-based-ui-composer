import { ComposePlayground } from './ComposePlayground';

export function ComposePlaygroundContainer({ children }: any) {
  return (
    <div style={{ height: `100%`}}>
      <div
        className="flex auto flex-wrap flex-row"
      >
        <ComposePlayground key="compose-playground"/>
    </div>
    </div>
  );
}
