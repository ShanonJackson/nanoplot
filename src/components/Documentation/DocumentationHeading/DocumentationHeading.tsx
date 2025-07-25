import * as React from "react";
import { cx } from "../../../utils/cx/cx";

type Props = {
	level?: 1 | 2 | 3;
	children: React.ReactNode;
};

export const DocumentationHeading = ({ level = 2, children }: Props) => {
	const Tag: `h${1 | 2 | 3}` = `h${level}`;
	const id = String(children).toLowerCase().replace(/\s+/g, "-");

	return (
		<a
			href={`#${id}`}
			className={cx(
				`flex items-center gap-1 group relative text-neutral-700 dark:text-neutral-100 font-semibold leading-tight tracking-wide`,
				{
					"text-3xl mb-4": level === 1,
					"text-2xl mt-12 mb-4": level === 2,
					"text-lg mt-4 mb-2": level === 3,
				},
			)}
		>
			<div id={id} style={{ scrollMarginTop: "74px" }} className="relative">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					className={
						"absolute left-[-1em] top-1/2 -translate-y-1/2 opacity-25 group-hover:opacity-100 stroke-blue-600 dark:stroke-blue-400 fill-blue-600 dark:fill-blue-400 cursor-pointer w-[0.85em] h-[0.85em] stroke-[0] transition-opacity duration-500"
					}
				>
					<path d="M12.856 5.457l-.937.92a1 1 0 0 0 0 1.437 1.047 1.047 0 0 0 1.463 0l.984-.966c.967-.95 2.542-1.135 3.602-.288a2.54 2.54 0 0 1 .203 3.81l-2.903 2.852a2.646 2.646 0 0 1-3.696 0l-1.11-1.09L9 13.57l1.108 1.089c1.822 1.788 4.802 1.788 6.622 0l2.905-2.852a4.558 4.558 0 0 0-.357-6.82c-1.893-1.517-4.695-1.226-6.422.47" />
					<path d="M11.144 19.543l.937-.92a1 1 0 0 0 0-1.437 1.047 1.047 0 0 0-1.462 0l-.985.966c-.967.95-2.542 1.135-3.602.288a2.54 2.54 0 0 1-.203-3.81l2.903-2.852a2.646 2.646 0 0 1 3.696 0l1.11 1.09L15 11.43l-1.108-1.089c-1.822-1.788-4.802-1.788-6.622 0l-2.905 2.852a4.558 4.558 0 0 0 .357 6.82c1.893 1.517 4.695 1.226 6.422-.47" />
				</svg>
				<Tag>{children}</Tag>
			</div>
		</a>
	);
};
