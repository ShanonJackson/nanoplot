import { afterEach, expect } from "bun:test";

const isModuleNotFound = (error: unknown, moduleName: string): boolean => {
        if (typeof error !== "object" || error === null) {
                return false;
        }

        const maybeCode = (error as { code?: unknown }).code;
        if (typeof maybeCode === "string" && maybeCode === "MODULE_NOT_FOUND") {
                return true;
        }

        const maybeMessage = (error as { message?: unknown }).message;
        if (typeof maybeMessage !== "string") {
                return false;
        }

        return (
                maybeMessage.includes(`Cannot find module '${moduleName}'`) ||
                maybeMessage.includes(`Cannot find module "${moduleName}"`)
        );
};

type TestingLibraryReactModule = typeof import("@testing-library/react");
type TestingLibraryMatchersModule = typeof import("@testing-library/jest-dom/matchers");

const reactModulePromise: Promise<TestingLibraryReactModule | undefined> = import(
        "@testing-library/react",
).catch((error) => {
        if (isModuleNotFound(error, "@testing-library/react")) {
                return undefined;
        }
        throw error;
});

const matchersModulePromise: Promise<TestingLibraryMatchersModule | undefined> = import(
        "@testing-library/jest-dom/matchers",
).catch((error) => {
        if (isModuleNotFound(error, "@testing-library/jest-dom/matchers")) {
                return undefined;
        }
        throw error;
});

const [reactModule, matchersModule] = await Promise.all([reactModulePromise, matchersModulePromise]);

if (reactModule && matchersModule) {
        expect.extend(matchersModule);
        afterEach(() => {
                reactModule.cleanup();
        });
}
