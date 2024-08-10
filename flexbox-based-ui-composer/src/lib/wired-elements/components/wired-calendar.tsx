// include this in the app header for the calendar to work:
// default import of everything is not working for the calendar
//   <script type="module" src="https://unpkg.com/wired-elements/lib/wired-calendar.js?module"></script>
export function WiredCalendar({
    selected = "Aug 10, 2024"
  }) {
    return <wired-calendar role="dialog" selected={selected} value={new Date()} locale="en-US"></wired-calendar>;
  }
  