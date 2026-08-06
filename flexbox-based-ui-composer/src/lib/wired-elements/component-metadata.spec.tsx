import { cardGroups as wiredCardGroups } from './component-metadata';
import { cardGroups as displayCardGroups } from '../display-wired-elements/component-metadata';
// Import calendarEntries directly so the unused import in wired-elements
// component-metadata (calendars group commented out) still covers that file.
import { calendarEntries as wiredCalendarEntries } from './card-entries/calendarEntries';
import { calendarEntries as displayCalendarEntries } from '../display-wired-elements/card-entries/calendarEntries';

describe('component-metadata', () => {
  it('wired-elements exposes expected group titles without Calendars', () => {
    const titles = wiredCardGroups.map((g) => g.title);
    expect(titles).toEqual([
      'Cards',
      'Media',
      'Dividers',
      'Buttons/Links',
      'Tabs',
      'Form Fields',
      'Dialogs',
      'Progress Indicators',
    ]);
    expect(titles).not.toContain('Calendars');
    expect(wiredCalendarEntries.length).toBeGreaterThan(0);
  });

  it('display-wired-elements exposes expected group titles including Calendars', () => {
    const titles = displayCardGroups.map((g) => g.title);
    expect(titles).toEqual([
      'Cards',
      'Media',
      'Dividers',
      'Buttons/Links',
      'Tabs',
      'Form Fields',
      'Dialogs',
      'Calendars',
      'Progress Indicators',
    ]);
    expect(displayCalendarEntries.length).toBeGreaterThan(0);
  });
});
