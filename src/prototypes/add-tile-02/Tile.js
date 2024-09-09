import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { MetricsContext } from "./MetricsContext";
import { TomeContext } from "./TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	overflow: hidden;
`;

export const Tile = props => {
	const { tileHalfSize, tileWideSize, tileTop, tileCornerRadius, tile1Left, tile2Left } =
		useContext(MetricsContext).metrics;
	const { addTileDropTarget, showAddTileDropTarget } = useContext(TomeContext);

	let size = props.size === "half" ? tileHalfSize : tileWideSize;
	let left = props.order === 1 ? tile1Left : tile2Left;
	if (showAddTileDropTarget) {
		if (addTileDropTarget === "wide") {
			size = tileWideSize;
		} else {
			size = tileHalfSize;
			if (addTileDropTarget === "left") {
				left = tile2Left;
			} else {
				left = tile1Left;
			}
		}
	}

	return (
		<Wrap
			id={props.id}
			initial={false}
			transition={transitions.layoutTransition}
			animate={{
				// backgroundColor: colors.z2,
				// backgroundColor: "cornflowerblue",
				width: size,
				height: tileHalfSize,
				borderRadius: tileCornerRadius,
				left: left,
				top: tileTop,
			}}
		>
			{props.children}
		</Wrap>
	);
};
