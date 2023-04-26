// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  coverageThreshold: {
    global: {
      lines: 100,
      branch: 100,
    },
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '/node_modules',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// https://github.com/vercel/next.js/issues/35634
export default async function jestConfig() {
  const nextJestConfig = await createJestConfig(config)()
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!remark)/'
  return nextJestConfig
}
