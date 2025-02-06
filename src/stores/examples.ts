import { create } from "zustand";
import { ComponentType } from "react";

export type Example = {
    name: string;
    code: string;
    component: ComponentType;
    type: "bars" | "pie";
};

type ExamplesStore = {
    example?: Example;
    setExample: (example?: Example) => void;
};

export const useExamples = create<ExamplesStore>((set) => ({
    example: undefined,
    setExample: (example) => set({ example }),
}));
