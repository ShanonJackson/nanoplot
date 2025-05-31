import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import * as React from "react";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";
import { DonutProgressBarExample } from "./examples/DonutProgressBarExample";
import { PieCollisionExample } from "./examples/DonutCollisionExample";
import { DonutRadiusExample } from "./examples/DonutCustomRadiusExample";
import { DocumentationLayout } from "../../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Pie Examples</DocumentationHeading>
			<DocumentationHeading level={2}>Donut Progress Bar</DocumentationHeading>
			<Sandpack files={{ "App.js": DonutProgressBarExample }} />
			<DocumentationHeading level={2}>Pie Collision</DocumentationHeading>
			<Sandpack files={{ "App.js": PieCollisionExample }} />
			<DocumentationHeading level={2}>Donut Custom Radius</DocumentationHeading>
			<Sandpack files={{ "App.js": DonutRadiusExample }} />
		</DocumentationLayout>
	);
}
