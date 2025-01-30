import { RefObject, useEffect, useLayoutEffect, useState } from "react";

export type Position = { side: "left" | "right" | "top" | "bottom" | "center"; alignment: "top" | "bottom" | "center" | "right" | "left" };

type Props = {
	targetRef: RefObject<Element | null>;
	tetherRef: RefObject<Element | null>;
	targetPosition?: Position;
	tetherPosition?: Position;
	offset?: { y: number };
	boundingContainer?: React.RefObject<Element>;
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

const Y_OFFSET = 8;

const getXY = ({
	targetPosition: { side: targetSide, alignment: targetAlignment },
	tetherPosition: { side: tetherSide, alignment: tetherAlignment },
	targetCoords: targetRect,
	tetherCoords: tetherRect,
	offset,
}: {
	targetCoords: DOMRect;
	tetherCoords: Pick<DOMRect, "width" | "height">;
	tetherPosition: { side: "left" | "right" | "top" | "bottom" | "center"; alignment: "top" | "bottom" | "center" | "right" | "left" };
	targetPosition: { side: "left" | "right" | "top" | "bottom" | "center"; alignment: "top" | "bottom" | "center" | "right" | "left" };
	offset: number;
}): { left: number; top: number } => {
	const x = (() => {
		if (targetSide === "left") return targetRect.left;
		if (targetSide === "right") return targetRect.left + targetRect.width;
		if (targetAlignment === "left") return targetRect.left;
		if (targetAlignment === "right") return targetRect.left + targetRect.width;
		return targetRect.left + targetRect.width / 2;
	})();

	const y = (() => {
		if (targetSide === "top") return targetRect.top;
		if (targetSide === "bottom") return targetRect.top + targetRect.height;
		if (targetAlignment === "top") return targetRect.top;
		if (targetAlignment === "bottom") return targetRect.top + targetRect.height;
		if (targetAlignment === "center") return targetRect.top + targetRect.height / 2;
		return targetRect.top + targetRect.width / 2;
	})();

	const tetherXModifier = (() => {
		if (tetherSide === "left") return 0;
		if (tetherSide === "right") return -tetherRect.width;
		if (tetherAlignment === "left") return 0;
		if (tetherAlignment === "right") return -tetherRect.width;
		return -tetherRect.width / 2;
	})();

	const tetherYModifier = (() => {
		if (tetherSide === "top") return 0;
		if (tetherSide === "bottom") return -tetherRect.height;
		if (tetherAlignment === "top") return 0;
		if (tetherAlignment === "bottom") return -tetherRect.height;
		return -tetherRect.height / 2;
	})();

	return {
		left: x + tetherXModifier + window.scrollX,
		top: y + tetherYModifier + window.scrollY,
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
	offset: { y } = { y: Y_OFFSET },
	boundingContainer,
	onCollision = flip,
}: Props) {
	const [positions, setPositions] = useState<Positions>({ tetherPosition, targetPosition });
	useEffect(
		() => setPositions({ tetherPosition, targetPosition }),
		[tetherPosition?.side, tetherPosition?.alignment, targetPosition?.side, targetPosition?.alignment],
	);
	const [styles, setStyles] = useState<{ left?: number; top?: number; zIndex?: number; position?: "absolute" }>({});

	const getPositionCollision = (collision: Collision) => {
		if (!Object.values(collision.collision).some(Boolean)) return positions;
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
			offset: y,
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
		const xy = getXY({ ...options, ...pos, offset: y });
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
	return { styles, positions };
}
