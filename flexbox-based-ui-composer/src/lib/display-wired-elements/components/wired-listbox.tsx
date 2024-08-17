export function WiredListbox({ selected = "defaultSelectedValue" }) {
    return (
        <wired-listbox id="combo" selected="two">
        <wired-item value="one">Number One</wired-item>
        <wired-item value="two">Number Two</wired-item>
        <wired-item value="three">Number Three</wired-item>
      </wired-listbox>
    );
}