import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'src/**/*.e2e.ts', // Updated to look for test files in src
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false, // Optional, disable the default support file
  },
});


