import { ComposePlayground } from './ComposePlayground';

export function ComposePlaygroundContainer({ componentList }) {
  return (
    <div
      style={{ height: `100%` }}
      className="flex auto flex-col justify-start"
    >
      <ComposePlayground componentList={componentList} />
    </div>
  );
}
