module.exports = {
  roots: ['./src', '<rootDir>/tests'],
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}',
    '!./src/main/**/*',
    '!./src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage'
}
