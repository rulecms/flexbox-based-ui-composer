export function WiredDialog() {
  return (
    <div style={{border: `1px solid gray`}}>
      <rulecms-wired-dialog>
        <p>Lorem ipsum dolor sit amet</p>
        <div style={{ textAlign: `right`, padding: `30px 16px 16px` }}>
          <wired-button id="closeDialog">Close dialog</wired-button>
        </div>
      </rulecms-wired-dialog>
    </div>
  );
}
