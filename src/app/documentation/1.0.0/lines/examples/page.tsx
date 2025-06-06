import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import * as React from "react";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";
import { LinesLegendInteractions } from "./examples/LinesLegendInteractions";
import { DocumentationNote } from "../../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { LinesWithZoomAndPan } from "./examples/LinesWithZoom";
import { LinesWithCustomTooltip } from "./examples/LinesWithCustomTooltip";
import { LinesWithMask } from "./examples/LinesWithMask";
import { DocumentationLayout } from "../../../../../components/Documentation/DocumentationLayout/DocumentationLayout";
import { LinesWithAnnotationsExample } from "./examples/LinesWithAnnotationsExample";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Lines Examples</DocumentationHeading>
			<DocumentationHeading level={2}>Lines with mask gradient</DocumentationHeading>
			<Sandpack files={{ "App.js": LinesWithMask }} />
			<DocumentationHeading level={2}>Lines with legend interactions</DocumentationHeading>
			<DocumentationNote>Click to pin. Hover to highlight</DocumentationNote>
			<Sandpack files={{ "App.js": LinesLegendInteractions }} />
			<DocumentationHeading level={2}>Lines with Zoom and Pan</DocumentationHeading>
			<DocumentationNote>Drag the highlighted track to pan.</DocumentationNote>
			<Sandpack files={{ "App.js": LinesWithZoomAndPan }} />
			<DocumentationHeading level={2}>Lines with custom tooltip</DocumentationHeading>
			<Sandpack files={{ "App.js": LinesWithCustomTooltip }} />
			<DocumentationHeading level={2}>Lines With Annotations</DocumentationHeading>
			<Sandpack files={{ "App.js": LinesWithAnnotationsExample }} />
		</DocumentationLayout>
	);
}
