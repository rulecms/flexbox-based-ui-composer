const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({ render: mockRender }));

jest.mock('react-dom/client', () => ({
  createRoot: (...args: unknown[]) => mockCreateRoot(...args),
}));

jest.mock('./app/app', () => ({
  __esModule: true,
  default: () => null,
}));

describe('main', () => {
  it('creates a root and renders App in StrictMode', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    jest.isolateModules(() => {
      require('./main');
    });

    expect(mockCreateRoot).toHaveBeenCalledWith(root);
    expect(mockRender).toHaveBeenCalledTimes(1);
    const rendered = mockRender.mock.calls[0][0];
    expect(rendered.type).toBe(require('react').StrictMode);
  });
});
