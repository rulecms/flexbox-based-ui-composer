import React from 'react';
import { render, screen } from '@testing-library/react';

type Root = 'wired-elements' | 'display-wired-elements';

const roots: Root[] = ['wired-elements', 'display-wired-elements'];

async function loadComponents(root: Root) {
  if (root === 'wired-elements') {
    return import('../index');
  }
  return import('../../display-wired-elements/index');
}

describe.each(roots)('%s components', (root) => {
  let comps: Awaited<ReturnType<typeof loadComponents>>;

  beforeAll(async () => {
    comps = await loadComponents(root);
  });

  describe('WiredButton', () => {
    it('renders enabled by default', () => {
      const { container } = render(<comps.WiredButton />);
      const el = container.querySelector('wired-button');
      expect(el).toBeTruthy();
      expect(el?.hasAttribute('disabled')).toBe(false);
      expect(el?.textContent).toContain('Click Me');
    });

    it('renders disabled', () => {
      const { container } = render(<comps.WiredButton disabled />);
      const el = container.querySelector('wired-button');
      expect(el?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('WiredSpinner', () => {
    it('renders without duration', () => {
      const { container } = render(<comps.WiredSpinner />);
      const el = container.querySelector('wired-spinner');
      expect(el).toBeTruthy();
      expect(el?.hasAttribute('spinning')).toBe(false);
    });

    it('renders with duration', () => {
      const { container } = render(<comps.WiredSpinner duration="1000" />);
      const el = container.querySelector('wired-spinner');
      expect(el?.getAttribute('duration')).toBe('1000');
      expect(el?.hasAttribute('spinning')).toBe(true);
    });
  });

  describe('WiredRadio', () => {
    it('renders checked', () => {
      const { container } = render(
        <comps.WiredRadio checked>Radio</comps.WiredRadio>
      );
      const el = container.querySelector('wired-radio');
      expect(el?.hasAttribute('checked')).toBe(true);
      expect(el?.textContent).toContain('Radio');
    });

    it('renders disabled (not checked)', () => {
      const { container } = render(
        <comps.WiredRadio disabled>Radio</comps.WiredRadio>
      );
      const el = container.querySelector('wired-radio');
      expect(el?.hasAttribute('disabled')).toBe(true);
      expect(el?.hasAttribute('checked')).toBe(false);
    });

    it('renders neither checked nor disabled', () => {
      const { container } = render(
        <comps.WiredRadio>Radio</comps.WiredRadio>
      );
      const el = container.querySelector('wired-radio');
      expect(el?.hasAttribute('checked')).toBe(false);
      expect(el?.hasAttribute('disabled')).toBe(false);
    });

    // COVERAGE GAP (dead code — needs production change or istanbul ignore):
    // WiredRadio lines with `if (checked && disabled)` and the final return are
    // unreachable after earlier returns. Statement/branch coverage cannot hit them.
  });

  describe('WiredCard', () => {
    it('renders with title and content by default', () => {
      const { container } = render(<comps.WiredCard />);
      expect(container.querySelector('wired-card')).toBeTruthy();
      expect(container.querySelector('h2')).toBeTruthy();
      expect(container.querySelector('p')).toBeTruthy();
    });

    it('hides title when displayTitle is false', () => {
      const { container } = render(<comps.WiredCard displayTitle={false} />);
      expect(container.querySelector('h2')).toBeNull();
      expect(container.querySelector('p')).toBeTruthy();
    });

    it('hides content when displayContent is false', () => {
      const { container } = render(<comps.WiredCard displayContent={false} />);
      expect(container.querySelector('h2')).toBeTruthy();
      expect(container.querySelector('p')).toBeNull();
    });

    it('uses empty title/content fallbacks', () => {
      const { container } = render(
        <comps.WiredCard title="" content="" />
      );
      const h2 = container.querySelector('h2');
      const p = container.querySelector('p');
      if (root === 'wired-elements') {
        expect(h2?.textContent).toBe('Title');
        expect(p?.textContent).toBe('Content');
      } else {
        expect(h2?.textContent).toBe('');
        expect(p?.textContent).toBe('');
      }
    });
  });

  describe('WiredCheckbox', () => {
    it('renders unchecked by default', () => {
      const { container } = render(<comps.WiredCheckbox />);
      expect(container.querySelector('wired-checkbox')).toBeTruthy();
    });

    it('renders checked', () => {
      const { container } = render(<comps.WiredCheckbox checked />);
      const el = container.querySelector('wired-checkbox');
      expect(el).toBeTruthy();
    });
  });

  describe('WiredLink', () => {
    it('renders with default elevation', () => {
      const { container } = render(<comps.WiredLink />);
      const el = container.querySelector('wired-link');
      expect(el?.getAttribute('elevation')).toBe('1');
    });

    it('renders with custom elevation', () => {
      const { container } = render(<comps.WiredLink elevation="3" />);
      expect(
        container.querySelector('wired-link')?.getAttribute('elevation')
      ).toBe('3');
    });
  });

  describe('WiredCalendar', () => {
    it('renders with default selected', () => {
      const { container } = render(<comps.WiredCalendar />);
      const el = container.querySelector('wired-calendar');
      expect(el?.getAttribute('selected')).toBe('Aug 10, 2024');
    });

    it('renders with custom selected', () => {
      const { container } = render(
        <comps.WiredCalendar selected="Jan 1, 2025" />
      );
      expect(
        container.querySelector('wired-calendar')?.getAttribute('selected')
      ).toBe('Jan 1, 2025');
    });
  });

  describe('WiredFab / WiredIconButton', () => {
    it('renders fab with children', () => {
      const { container } = render(
        <comps.WiredFab>
          <span data-testid="fab-child">x</span>
        </comps.WiredFab>
      );
      expect(container.querySelector('wired-fab')).toBeTruthy();
      expect(screen.getByTestId('fab-child')).toBeTruthy();
    });

    it('renders icon button with children', () => {
      const { container } = render(
        <comps.WiredIconButton>
          <span data-testid="icon-child">x</span>
        </comps.WiredIconButton>
      );
      expect(container.querySelector('wired-icon-button')).toBeTruthy();
      expect(screen.getByTestId('icon-child')).toBeTruthy();
    });
  });

  describe('static custom elements', () => {
    it('renders WiredCombo', () => {
      const { container } = render(<comps.WiredCombo />);
      expect(container.querySelector('wired-combo')).toBeTruthy();
    });

    it('renders WiredInput', () => {
      const { container } = render(<comps.WiredInput />);
      expect(container.querySelector('wired-input')).toBeTruthy();
    });

    it('renders WiredSearchInput', () => {
      const { container } = render(<comps.WiredSearchInput />);
      expect(container.querySelector('wired-search-input')).toBeTruthy();
    });

    it('renders WiredTextarea', () => {
      const { container } = render(<comps.WiredTextarea />);
      expect(container.querySelector('wired-textarea')).toBeTruthy();
    });

    it('renders WiredToggle', () => {
      const { container } = render(<comps.WiredToggle />);
      expect(container.querySelector('wired-toggle')).toBeTruthy();
    });

    it('renders WiredSlider', () => {
      const { container } = render(<comps.WiredSlider />);
      expect(container.querySelector('wired-slider')).toBeTruthy();
    });

    it('renders WiredProgress', () => {
      const { container } = render(<comps.WiredProgress />);
      expect(container.querySelector('wired-progress')).toBeTruthy();
    });

    it('renders WiredProgressRing', () => {
      const { container } = render(<comps.WiredProgressRing />);
      expect(container.querySelector('wired-progress-ring')).toBeTruthy();
    });

    it('renders WiredTabs', () => {
      const { container } = render(<comps.WiredTabs />);
      expect(container.querySelector('wired-tabs')).toBeTruthy();
      expect(container.querySelectorAll('wired-tab').length).toBe(3);
    });

    it('renders WiredDivider', () => {
      const { container } = render(<comps.WiredDivider />);
      expect(container.querySelector('wired-divider')).toBeTruthy();
    });

    it('renders WiredImage', () => {
      const { container } = render(<comps.WiredImage />);
      expect(container.querySelector('wired-image')).toBeTruthy();
    });

    it('renders WiredVideo', () => {
      const { container } = render(<comps.WiredVideo />);
      expect(container.querySelector('wired-video')).toBeTruthy();
    });

    it('renders WiredDialog', () => {
      const { container } = render(<comps.WiredDialog />);
      expect(container.querySelector('rulecms-wired-dialog')).toBeTruthy();
      expect(container.querySelector('wired-button')).toBeTruthy();
    });

    it('renders WiredListbox', () => {
      const { container } = render(<comps.WiredListbox />);
      expect(container.querySelector('wired-listbox')).toBeTruthy();
      expect(container.querySelectorAll('wired-item').length).toBe(3);
    });

    it('renders WiredRadioGroup', () => {
      const { container } = render(<comps.WiredRadioGroup />);
      expect(container.querySelector('wired-radio-group')).toBeTruthy();
      expect(container.querySelectorAll('wired-radio').length).toBe(4);
    });
  });
});
