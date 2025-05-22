import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import * as React from "react";
import { PositiveNegativeBars } from "./examples/PositiveNegativeBars";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";
import { HorizontalBarsExample } from "./examples/HorizontalBarsExample";
import { BarsStackedExample } from "./examples/BarsStackedExample";
import { BarsPercentExample } from "./examples/BarsPercentExample";
import { BarsWithMaskExample } from "./examples/BarsWithMaskExample";
import { DocumentationNote } from "../../../../../components/Documentation/DocumentationNote/DocumentationNote";

export default function Page() {
	return (
		<div className={"p-4 md:p-8 max-w-[1500px]"}>
			<DocumentationHeading level={1}>Bars Examples</DocumentationHeading>
			<DocumentationHeading level={2}>Positive Negative Bars</DocumentationHeading>
			<Sandpack files={{ "App.js": PositiveNegativeBars }} />
			<DocumentationHeading level={2}>Horizontal Bars</DocumentationHeading>
			<Sandpack files={{ "App.js": HorizontalBarsExample }} />
			<DocumentationHeading level={2}>Stacked Bars</DocumentationHeading>
			<Sandpack files={{ "App.js": BarsStackedExample }} />
			<DocumentationHeading level={2}>Percent Bars</DocumentationHeading>
			<Sandpack files={{ "App.js": BarsPercentExample }} />
			<DocumentationHeading level={2}>Mask Gradient Bars</DocumentationHeading>
			<DocumentationNote>Notice the gradient starts from the top of the Y Axis, rather than the top of the bar.</DocumentationNote>
			<Sandpack files={{ "App.js": BarsWithMaskExample }} />
		</div>
	);
}
