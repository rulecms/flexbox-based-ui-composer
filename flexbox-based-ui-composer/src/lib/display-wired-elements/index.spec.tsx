/**
 * Smoke import for display-wired-elements so --testPathPattern=display-wired matches.
 * Full assertions live in wired-elements/* specs (parameterized across both roots).
 */
import * as displayWired from './index';
import { cardGroups } from './component-metadata';

describe('display-wired-elements index (smoke)', () => {
  it('exports WiredButton and includes Calendars group', () => {
    expect(displayWired.WiredButton).toBeDefined();
    expect(displayWired.WiredDialog).toBeDefined();
    expect(cardGroups.some((g) => g.title === 'Calendars')).toBe(true);
  });
});
