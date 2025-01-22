export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.svg$': '<rootDir>/__mocks__/svgMock.js',  // Mock SVG files here
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Correct path for setup file
  };
  