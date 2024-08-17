// include this in the app header for the calendar to work:
//   <script type="module" src="https://unpkg.com/wired-elements/lib/wired-calendar.js?module"></script>
// default import of everything is not working for the calendar
export function WiredCalendar({
    selected = "Aug 10, 2024"
  }) {
    return <wired-calendar role="dialog" selected={selected} value={new Date()} locale="en-US"></wired-calendar>;
  }
  