/* eslint-disable */
export default {
  displayName: 'flexbox-based-ui-composer',
  preset: '../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': '<rootDir>/src/test-utils/babel-jest-transformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@shoelace-style|lit|@lit|lit-html|lit-element|@lit-labs)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test-utils/style-mock.js',
    '^wired-elements$': '<rootDir>/src/test-utils/wired-elements-mock.js',
    '^wired-elements/(.*)$': '<rootDir>/src/test-utils/wired-elements-mock.js',
  },
  coverageDirectory: '../coverage/flexbox-based-ui-composer',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/test-setup.ts',
    '!src/test-utils/**',
    // Generated Lit custom-element compile output (TS __decorate emit + CE registry)
    '!src/**/*.source.js',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
