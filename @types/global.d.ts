type Falsy = false | 0 | "" | null | undefined;
interface ObjectConstructor {
	entries<T>(o: T): [keyof T, T[keyof T]][];
	keys<T>(o: T): Array<keyof T>;
}

declare module "react" {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

export {};
