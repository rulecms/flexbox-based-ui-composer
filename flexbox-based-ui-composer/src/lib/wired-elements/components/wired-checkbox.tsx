export function WiredCheckbox({
    checked = false,
    onChange = () => {}
}) {
    return (
        <wired-checkbox
            checked={checked}
            onChange={onChange}
        ></wired-checkbox>
    );
}