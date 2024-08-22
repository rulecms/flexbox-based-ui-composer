export const DisplayBox = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => {
  return (
    <div
      style={{
        width,
        minHeight: height,
        margin: `var(--sl-spacing-3x-small)`,
        backgroundColor: `var(--sl-color-danger-300)`,
      }}
    />
  );
};
