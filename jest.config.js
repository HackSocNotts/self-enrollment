module.exports = {
  testPathIgnorePatterns: ['lib/', 'node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  rootDir: 'src',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  reporters: ['default', 'jest-junit'],
  coverageDirectory: '../coverage',
};
