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

await import("@happy-dom/global-registrator")
        .then(({ GlobalRegistrator }) => {
                GlobalRegistrator.register();
        })
        .catch((error) => {
                if (!isModuleNotFound(error, "@happy-dom/global-registrator")) {
                        throw error;
                }
        });
