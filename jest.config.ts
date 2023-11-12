import { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};

export default config;