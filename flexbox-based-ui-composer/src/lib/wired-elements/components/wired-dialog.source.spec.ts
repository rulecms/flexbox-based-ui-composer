/**
 * Covers wired-dialog.source.js for both wired-elements and display-wired-elements.
 * customElement always registers a unique tag so both copies can be constructed
 * even when the production tag name is already taken.
 */

jest.mock('lit/decorators.js', () => {
  const actual = jest.requireActual('lit/decorators.js');
  let seq = 0;
  return {
    ...actual,
    customElement: (tagName: string) => {
      return (clazz: CustomElementConstructor) => {
        const registry = globalThis.customElements;
        const name = `${tagName}-${++seq}-${Date.now()}`;
        registry.define(name, clazz);
        return clazz;
      };
    },
  };
});

type WiredDialogInstance = HTMLElement & {
  elevation: number;
  open: boolean;
  card?: { wiredRender: (force?: boolean) => void } | null;
  render: () => unknown;
  updated: () => void;
};

type WiredDialogCtor = {
  new (): WiredDialogInstance;
  styles: unknown;
};

function ensureConstructable(WiredDialog: WiredDialogCtor): void {
  try {
    // Probe whether this constructor is registered.
    // eslint-disable-next-line no-new
    new WiredDialog();
  } catch {
    const name = `rulecms-wired-dialog-manual-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;
    globalThis.customElements.define(
      name,
      WiredDialog as unknown as CustomElementConstructor
    );
  }
}

async function loadWiredDialog(
  root: 'wired-elements' | 'display-wired-elements'
): Promise<WiredDialogCtor> {
  jest.resetModules();
  jest.doMock('lit/decorators.js', () => {
    const actual = jest.requireActual('lit/decorators.js');
    let seq = 0;
    return {
      ...actual,
      customElement: (tagName: string) => {
        return (clazz: CustomElementConstructor) => {
          const registry = globalThis.customElements;
          const name = `${tagName}-${++seq}-${Date.now()}`;
          registry.define(name, clazz);
          return clazz;
        };
      },
    };
  });

  if (root === 'wired-elements') {
    const mod = await import('./wired-dialog.source.js');
    return mod.WiredDialog as unknown as WiredDialogCtor;
  }
  const mod = await import(
    '../../display-wired-elements/components/wired-dialog.source.js'
  );
  return mod.WiredDialog as unknown as WiredDialogCtor;
}

describe.each(['wired-elements', 'display-wired-elements'] as const)(
  '%s wired-dialog.source.js',
  (root) => {
    let WiredDialog: WiredDialogCtor;

    beforeAll(async () => {
      WiredDialog = await loadWiredDialog(root);
      ensureConstructable(WiredDialog);
    });

    it('exposes styles getter', () => {
      expect(WiredDialog.styles).toBeDefined();
    });

    it('constructs with default elevation and open=false', () => {
      const el = new WiredDialog();
      expect(el.elevation).toBe(5);
      expect(el.open).toBe(false);
    });

    it('render() returns a template result', () => {
      const el = new WiredDialog();
      expect(el.render()).toBeDefined();
    });

    it('toggles open property true/false', () => {
      const el = new WiredDialog();
      el.open = true;
      expect(el.open).toBe(true);
      el.open = false;
      expect(el.open).toBe(false);
    });

    it('accepts custom elevation and uses it in render', () => {
      const el = new WiredDialog();
      el.elevation = 2;
      expect(el.elevation).toBe(2);
      expect(el.render()).toBeDefined();
    });

    it('updated() calls card.wiredRender when card is set', () => {
      const el = new WiredDialog();
      const wiredRender = jest.fn();
      Object.defineProperty(el, 'card', {
        configurable: true,
        value: { wiredRender },
      });
      el.updated();
      expect(wiredRender).toHaveBeenCalledWith(true);
    });

    it('updated() is a no-op when card is missing', () => {
      const el = new WiredDialog();
      Object.defineProperty(el, 'card', {
        configurable: true,
        value: undefined,
      });
      expect(() => el.updated()).not.toThrow();
    });
  }
);

describe('wired-dialog.source.js decorator helpers without Reflect.decorate', () => {
  const originalDecorate = Reflect.decorate;
  const originalMetadata = Reflect.metadata;

  afterEach(() => {
    if (originalDecorate) {
      Reflect.decorate = originalDecorate;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (Reflect as any).decorate;
    }
    if (originalMetadata) {
      Reflect.metadata = originalMetadata;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (Reflect as any).metadata;
    }
  });

  it('evaluates module when Reflect.decorate is absent (else decorate path)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Reflect as any).decorate;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Reflect as any).metadata;

    const WiredDialog = await loadWiredDialog('wired-elements');
    ensureConstructable(WiredDialog);
    expect(WiredDialog).toBeDefined();
    expect(WiredDialog.styles).toBeDefined();

    const el = new WiredDialog();
    el.open = true;
    el.render();
    Object.defineProperty(el, 'card', {
      configurable: true,
      value: { wiredRender: jest.fn() },
    });
    el.updated();
  });

  it('evaluates display copy when Reflect.decorate is absent', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Reflect as any).decorate;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Reflect as any).metadata;

    const WiredDialog = await loadWiredDialog('display-wired-elements');
    ensureConstructable(WiredDialog);
    expect(WiredDialog).toBeDefined();
    const el = new WiredDialog();
    Object.defineProperty(el, 'card', {
      configurable: true,
      value: { wiredRender: jest.fn() },
    });
    el.updated();
  });
});

describe('wired-dialog.source.js __decorate helper branch coverage', () => {
  it('covers __decorate else-path branches via isolated re-import', async () => {
    const originalDecorate = Reflect.decorate;
    const originalMetadata = Reflect.metadata;

    // Force the emitted helper's else path (no Reflect.decorate).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Reflect as any).decorate;
    // Keep Reflect.metadata so __metadata's true branch is hit on one import,
    // then delete it for the false branch on a second import.
    if (!originalMetadata) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Reflect as any).metadata = () => undefined;
    }

    jest.resetModules();
    jest.doMock('lit/decorators.js', () => {
      const actual = jest.requireActual('lit/decorators.js');
      let seq = 0;
      return {
        ...actual,
        customElement: (tagName: string) => {
          return (clazz: CustomElementConstructor) => {
            globalThis.customElements.define(
              `${tagName}-branch-${++seq}-${Date.now()}`,
              clazz
            );
            return clazz;
          };
        },
      };
    });

    const mod1 = await import('./wired-dialog.source.js');
    expect(mod1.WiredDialog).toBeDefined();

    // Second import: Reflect.metadata absent → __metadata false branch
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (Reflect as any).metadata;
    jest.resetModules();
    jest.doMock('lit/decorators.js', () => {
      const actual = jest.requireActual('lit/decorators.js');
      let seq = 0;
      return {
        ...actual,
        customElement: (tagName: string) => {
          return (clazz: CustomElementConstructor) => {
            globalThis.customElements.define(
              `${tagName}-branch2-${++seq}-${Date.now()}`,
              clazz
            );
            return clazz;
          };
        },
      };
    });
    const mod2 = await import(
      '../../display-wired-elements/components/wired-dialog.source.js'
    );
    expect(mod2.WiredDialog).toBeDefined();

    if (originalDecorate) {
      Reflect.decorate = originalDecorate;
    }
    if (originalMetadata) {
      Reflect.metadata = originalMetadata;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (Reflect as any).metadata;
    }
  });
});
