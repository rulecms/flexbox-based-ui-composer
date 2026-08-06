jest.mock('uuid', () => {
  let id = 0;
  return {
    v4: () => `mock-uuid-${++id}`,
  };
});

import { generateUniqueId } from './generate-unique-id';

describe('generateUniqueId', () => {
  it('returns a uuid string from uuid.v4', () => {
    expect(generateUniqueId()).toBe('mock-uuid-1');
    expect(generateUniqueId()).toBe('mock-uuid-2');
  });
});
