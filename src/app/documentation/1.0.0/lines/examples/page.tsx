import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import * as React from "react";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";
import { LinesLegendInteractions } from "./examples/LinesLegendInteractions";
import { DocumentationNote } from "../../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { LinesWithZoomAndPan } from "./examples/LinesWithZoom";
import { LinesWithCustomTooltip } from "./examples/LinesWithCustomTooltip";

type Props = {};
export default function Page() {
	return (
		<div className={"p-4 md:p-8 max-w-[1500px]"}>
			<DocumentationHeading level={1}>Lines Examples</DocumentationHeading>
			<DocumentationHeading level={2}>Lines with legend interactions</DocumentationHeading>
			<DocumentationNote header={"Note"}>Click to pin. Hover to highlight</DocumentationNote>
			<Sandpack files={{ "App.js": LinesLegendInteractions }} />
			<DocumentationHeading level={2}>Lines with Zoom and Pan</DocumentationHeading>
			<DocumentationNote header={"Note"}>Drag the highlighted track to pan.</DocumentationNote>
			<Sandpack files={{ "App.js": LinesWithZoomAndPan }} />
			<DocumentationHeading level={2}>Lines with custom tooltip</DocumentationHeading>
			<Sandpack files={{ "App.js": LinesWithCustomTooltip }} />
			<DocumentationHeading level={2}>Lines with mask gradient</DocumentationHeading>
		</div>
	);
}
