import { memo } from "react"
import { Props as WorldmapProps } from "./Worldmap";
import { countries } from "@/utils/countries";
import { Popup } from "../Tooltip/Popup";
import { PathUtils } from "@/utils/path/path";
import { MathUtils } from "@/utils/math/math";
import { cx } from "@/utils/cx/cx";
import styles from "./Worldmap.module.scss";

type Props = Partial<WorldmapProps>

export const TooltipsMemo = memo(({tooltips}: Props) => {
	return <>
		{
			Object.entries(countries).map(([iso, path], i) => {
				const { x, y } = PathUtils.center(path);
				return (
					<Popup
						key={i}
						target={{ side: "bottom", alignment: "center" }}
						style={{ left: MathUtils.scale(x, 1090, 100) + "%", top: MathUtils.scale(y, 539, 100) + "%" }}
						border={"rgb(45, 45, 45)"}
						className={cx(`bg-black pointer-events-none`, styles.tooltip)}
						data-iso={iso}
					>
						<div>{tooltips?.[iso] ? tooltips[iso] : iso}</div>
					</Popup>
				);
			})
		}
	</>
},()=>true)