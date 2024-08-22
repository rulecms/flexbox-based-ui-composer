export const DisplayBox = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => {
  const clampedWidthCSS = `clamp(${width}, ${width}, ${width})`;
  const clampedHeightCSS = `clamp(${height}, ${height}, ${height})`;
  return (
    <div
      style={{
        width: clampedWidthCSS,
        height: clampedHeightCSS,
        margin: `var(--sl-spacing-3x-small)`,
        backgroundColor: `var(--sl-color-danger-300)`,
      }}
    />
  );
};
