import { RefObject, useEffect, useLayoutEffect, useState } from "react";

export type Position = { side: "left" | "right" | "top" | "bottom" | "center"; alignment: "top" | "bottom" | "center" | "right" | "left" };

type Props = {
	targetRef: RefObject<Element | null>;
	tetherRef: RefObject<Element | null>;
	targetPosition?: Position;
	tetherPosition?: Position;
	offset?: { y: number; x: number };
	boundingContainer?: RefObject<Element | null>;
	onCollision?: (props: Collision) => Positions;
};

export interface Positions {
	tetherPosition: Position;
	targetPosition: Position;
}

export interface Collision extends Positions {
	collision: {
		left: boolean;
		right: boolean;
		top: boolean;
		bottom: boolean;
	};
}

const getXY = ({
	targetPosition: { side: targetSide, alignment: targetAlignment },
	tetherPosition: { side: tetherSide, alignment: tetherAlignment },
	targetCoords: targetRect,
	tetherCoords: tetherRect,
	offset: { x: offsetX, y: offsetY },
}: {
	targetCoords: DOMRect;
	tetherCoords: Pick<DOMRect, "width" | "height">;
	tetherPosition: { side: "left" | "right" | "top" | "bottom" | "center"; alignment: "top" | "bottom" | "center" | "right" | "left" };
	targetPosition: { side: "left" | "right" | "top" | "bottom" | "center"; alignment: "top" | "bottom" | "center" | "right" | "left" };
	offset: { x: number; y: number };
}): { left: number; top: number } => {
	const { left: tleft, width: twidth, top: ttop, height: theight } = targetRect;
	const { width, height } = tetherRect;

	const x = (() => {
		if (targetSide === "left") return tleft;
		if (targetSide === "right") return tleft + twidth;
		if (targetAlignment === "left") return tleft;
		if (targetAlignment === "right") return tleft + twidth;
		return tleft + twidth / 2;
	})();

	const y = (() => {
		if (targetSide === "top") return ttop;
		if (targetSide === "bottom") return ttop + theight;
		if (targetAlignment === "top") return ttop;
		if (targetAlignment === "bottom") return ttop + theight;
		if (targetAlignment === "center") return ttop + theight / 2;
		return ttop + twidth / 2;
	})();

	const tetherXModifier = (() => {
		if (tetherSide === "left") return 0;
		if (tetherSide === "right") return -width;
		if (tetherAlignment === "left") return 0;
		if (tetherAlignment === "right") return -width;
		return -width / 2;
	})();

	const tetherYModifier = (() => {
		if (tetherSide === "top") return 0;
		if (tetherSide === "bottom") return -height;
		if (tetherAlignment === "top") return 0;
		if (tetherAlignment === "bottom") return -height;
		return -height / 2;
	})();

	const oy = (() => {
		if (tetherSide === "top") return offsetY;
		if (tetherSide === "bottom") return -offsetY;
		return 0;
	})();

	const ox = (() => {
		if (tetherSide === "left") return offsetX;
		if (tetherSide === "right") return -offsetX;
		return 0;
	})();

	return {
		left: x + tetherXModifier + window.scrollX + ox,
		top: y + tetherYModifier + window.scrollY + oy,
	};
};

const flip = ({
	collision,
	tetherPosition,
	targetPosition,
}: Collision): {
	tetherPosition: Position;
	targetPosition: Position;
} => {
	return {
		tetherPosition: (() => {
			if (collision.top && collision.bottom) return tetherPosition;
			if (collision.top) {
				if (collision.left) return { side: "top", alignment: "left" };
				if (collision.right) return { side: "top", alignment: "right" };
				return { side: "top", alignment: "center" };
			}
			if (collision.bottom) {
				if (collision.left) return { side: "bottom", alignment: "left" };
				if (collision.right) return { side: "bottom", alignment: "right" };
				return { side: "bottom", alignment: "center" };
			}
			if (collision.left) return { side: "bottom", alignment: "left" };
			if (collision.right) return { side: "bottom", alignment: "right" };
			return { side: "bottom", alignment: "left" };
		})(),
		targetPosition: (() => {
			if (collision.top && collision.bottom) return targetPosition;
			if (collision.top) return { side: "bottom", alignment: "center" };
			return { side: "top", alignment: "center" };
		})(),
	};
};

/*
  Calculates zIndex up the DOM tree, this fixes an edge case with tooltips that render inside Modals automatically
  Stops at the <body>
*/
const getZIndex = (ele: Node | null): number => {
	if (!document || !ele || ele === document.body || !(ele instanceof Element)) return 0;
	return (Number(window.getComputedStyle(ele).zIndex) || 0) + getZIndex(ele.parentNode);
};

/* Tethers you to one element to another by using calculations from the getBoundingClientRect of both */
export function useTether<T extends Element>({
	targetPosition = { alignment: "center", side: "top" },
	tetherPosition = { alignment: "center", side: "bottom" },
	targetRef,
	tetherRef,
	offset: { y, x } = { y: 0, x: 0 },
	boundingContainer,
	onCollision = flip,
}: Props) {
	const [positions, setPositions] = useState<Positions>({ tetherPosition, targetPosition });
	const [styles, setStyles] = useState<{ left?: number; top?: number; zIndex?: number; position?: "absolute" }>({});

	const getPositionCollision = (collision: Collision) => {
		const isColliding = Object.values(collision.collision).some(Boolean);
		if (!isColliding) return { tetherPosition, targetPosition };
		return onCollision(collision);
	};

	const onCalculate = () => {
		const { target, tether } = { target: targetRef.current, tether: tetherRef.current };
		if (!target || !tether) return;

		/* Quick maths that takes into account collision and elements rect's */
		const { height: tooltipHeight, width: tooltipWidth } = tether.getBoundingClientRect();
		const boundingRect = boundingContainer?.current?.getBoundingClientRect();
		const options = {
			targetCoords: target.getBoundingClientRect(),
			tetherCoords: { width: tooltipWidth, height: tooltipHeight },
			tetherPosition,
			targetPosition,
			offset: { y, x },
		};
		const initial = getXY(options);
		const collision = {
			left: initial.left < (boundingRect ? boundingRect.x + window.scrollX : window.scrollX),
			right:
				initial.left + tooltipWidth >
				(boundingRect
					? Math.min(boundingRect.x + boundingRect.width + window.scrollX, window.innerWidth)
					: window.scrollX + document.documentElement.clientWidth),
			top: initial.top < (boundingRect ? boundingRect.y + window.scrollY : window.scrollY),
			bottom:
				initial.top + tooltipHeight >
				(boundingRect
					? Math.min(boundingRect.y + boundingRect.height + window.scrollY, window.innerHeight)
					: window.scrollY + document.documentElement.clientHeight),
		};
		const pos = getPositionCollision({ tetherPosition, targetPosition, collision });
		const xy = getXY({ ...options, ...pos, offset: { y, x } });
		const css = { zIndex: getZIndex(target), left: xy.left, top: xy.top, position: "absolute" } as const;
		/* update if required */
		if (styles.left !== css.left || styles.top !== css.top || styles.zIndex !== css.zIndex) {
			setPositions(pos);
			setStyles(css);
		}
	};
	useLayoutEffect(onCalculate);
	useEffect(() => {
		window.addEventListener("resize", onCalculate, { passive: true });
		return () => window.removeEventListener("resize", onCalculate);
	}, []);
	useEffect(
		() => setPositions({ tetherPosition, targetPosition }),
		[tetherPosition?.side, tetherPosition?.alignment, targetPosition?.side, targetPosition?.alignment],
	);
	return { styles, positions };
}
