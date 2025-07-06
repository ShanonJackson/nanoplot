import * as React from "react";
import { DocumentationHeading } from "../../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationLayout } from "../../../../../components/Documentation/DocumentationLayout/DocumentationLayout";
import { Sandpack } from "../../../../../components/Documentation/Sandpack/Sandpack";
import { AreaGraphExample } from "./examples/AreaGraphExample";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Area Examples</DocumentationHeading>
			<DocumentationHeading level={2}>Area Graph</DocumentationHeading>
			<Sandpack files={{ "App.js": AreaGraphExample }} />
		</DocumentationLayout>
	);
}
