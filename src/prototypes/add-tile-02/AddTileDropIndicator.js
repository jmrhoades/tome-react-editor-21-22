import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../ds/Colors";
import { transitions } from "../../ds/Transitions";
import { MetricsContext } from "./MetricsContext";
import { TomeContext } from "./TomeContext";

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const Wrap = styled(motion.div)`
	position: absolute;
	border-style: solid;

	transition-property: opacity;
	transition-duration: 0.3s;
	transition-timing-function: ease-out;
`;

export const AddTileDropIndicator = props => {
	const { tileHalfSize, tileTop, tileCornerRadius, tile1Left, tile2Left, tileMargin } =
		useContext(MetricsContext).metrics;
	const { addTileDropTarget, showAddTileDropTarget } = useContext(TomeContext);
	
	const prevShowAddTile = usePrevious(showAddTileDropTarget);
	const [transition, setTransition] = useState( transitions.layoutTransition );

    useEffect(() => {
		//console.log(prevShowAddTile, showAddTileDropTarget);
		if (!prevShowAddTile && showAddTileDropTarget) {
			setTransition(transitions.layoutTransition);
		} else {
			setTransition({ duration: 0 });	
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAddTileDropTarget]);
	
	let size = tileHalfSize;
	let left = tile2Left;
	if (addTileDropTarget === "left") {
		size = tileHalfSize;
		left = tile1Left;
	} else if (addTileDropTarget === "right") {
		size = tileHalfSize;
		left = tile1Left + tileHalfSize + tileMargin;
	} else if (addTileDropTarget === "wide") {
		size = tileHalfSize * 2 + tileMargin;
		left = tile1Left;
	}

	return (
		<Wrap
			layout
			transition={transition}
			style={{
				backgroundColor: "rgba(237, 0, 235, 0.1)",
				boxShadow: "inset 0px 0px 16px rgba(237, 14, 235, 0.1)",
				opacity: showAddTileDropTarget ? 1 : 0,
				width: size,
				height: tileHalfSize,
				borderRadius: tileCornerRadius,
				left: left,
				top: tileTop,
				borderWidth: 3,
				borderColor: colors.accent,
			}}
		>
			{props.children}
		</Wrap>
	);
};
