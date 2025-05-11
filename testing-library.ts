import { afterEach, expect } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
process.env.TZ = "Pacific/Auckland";
expect.extend(matchers);
afterEach(() => {
	cleanup();
});
