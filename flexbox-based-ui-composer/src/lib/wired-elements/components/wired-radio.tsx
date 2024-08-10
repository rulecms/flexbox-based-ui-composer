export function WiredRadio({checked = false, disabled = false, children}: {checked?: boolean, disabled?: boolean, children?: any}) {
    if(checked) {
        return <wired-radio checked>{children}</wired-radio>;
    }
    if(disabled) {
        return <wired-radio disabled>{children}</wired-radio>;
    }
    if(checked && disabled) {
        return <wired-radio checked disabled>{children}</wired-radio>;
    }
    if(!checked && !disabled) {
        return <wired-radio>{children}</wired-radio>;
    }
    return <wired-radio> {children}</wired-radio>;
}