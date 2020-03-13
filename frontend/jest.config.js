module.exports = {
  testPathIgnorePatterns: ['lib/', 'node_modules/'],
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  rootDir: 'src',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  reporters: ['default', 'jest-junit'],
};
