import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../../../ds/Transitions";

const ResizeHandle = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	z-index: 9999;
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 20%;
	right: 20%;
	height: 5px;
	top: 50%;
	transform: translateY(-50%);
	border-radius: 2px;
`;

const handleHeight = 44;

export const RowResizeHandle = props => {
	const { pageWidth, pageTop } = useContext(MetricsContext).metrics;
	const { currentPage, setSelectedTile, selectedTile } = useContext(TomeContext);

	const [handleTop] = useState(0);
	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	useEffect(() => {
		// setHandleTop();
	}, []);

	return (
		<ResizeHandle
			onHoverStart={(event, info) => {
				document.body.style.cursor = "ns-resize";
				setHandleHovered(true);
			}}
			onHoverEnd={(event, info) => {
				if (!handlePanning) document.body.style.cursor = "auto";
				setHandleHovered(false);
			}}
			onPanStart={(event, info) => {
				// sort tiles array by tile left position
				currentPage.tiles.sort((a, b) => a.left - b.left);

				setHandlePanning(true);
				// setTileResizing(true);
				if (selectedTile) setSelectedTile(null);
			}}
			onPanEnd={(event, info) => {
				document.body.style.cursor = "auto";
				setHandlePanning(false);
				// setTileResizing(false);
			}}
			onPan={(event, info) => {
				// console.log(info.point.x)
			}}
			transition={{
				opacity: {
					delay: handleHovered ? 0.3 : 0,
					duration: 0.2,
					type: "tween",
				},
				default: transitions.layoutTransition,
			}}
			initial={{
				opacity: 1,
			}}
			animate={{
				opacity: 1,
				top: handleTop,
			}}
			style={{
				left: 0,
				top: pageTop,
				height: handleHeight,
				width: pageWidth,
			}}
			className={"handle"}
		>
			<ResizeHandleMaterial
				animate={{
					backgroundColor: colors.accent,
				}}
			/>
		</ResizeHandle>
	);
};
