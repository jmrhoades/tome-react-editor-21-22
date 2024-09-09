import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import { TILE_SIZE_HALF, PAGE_MARGIN, TILE_RESIZE_SPRING } from "./index";

export const TileResizeHandle = props => {
	const resizeDragOffset = useMotionValue(0);
	resizeDragOffset.set(props.resizeOffset);
	let dragOffsetRange = [-TILE_SIZE_HALF, 0, TILE_SIZE_HALF];
	let xRange = [-TILE_SIZE_HALF - PAGE_MARGIN, 0, TILE_SIZE_HALF + PAGE_MARGIN];
	if (props.resizeHandleID === "right") {
		xRange = [0, TILE_SIZE_HALF + PAGE_MARGIN, TILE_SIZE_HALF + PAGE_MARGIN];
	}
	if (props.resizeHandleID === "left") {
		xRange = [-TILE_SIZE_HALF - PAGE_MARGIN, -TILE_SIZE_HALF - PAGE_MARGIN, 0];
	}
	let resizeXLinear = useTransform(resizeDragOffset, dragOffsetRange, xRange);
	const resizeX = useSpring(resizeXLinear, TILE_RESIZE_SPRING);

	const handleVariants = {
		show: {
			opacity: 1,
			transition: { duration: 0 },
		},
		hide: {
			opacity: 0,
			transition: { duration: 0.4 },
		},
	};

	return (
		<Handle
			style={{ x: resizeX }}
			width={PAGE_MARGIN}
			left={props.left}
			variants={handleVariants}
			animate={props.isResizeHovering ? "show" : "hide"}
			initial="hide"
		>
			<HandleMaterial />
		</Handle>
	);
};

const Handle = styled(motion.div)`
	width: ${props => props.width}px;
	height: 100%;
	position: absolute;
	top: 0;
	left: ${props => props.left}px;
	background-color: #141414;
	/* opacity: 0; */
	/* background-color: transparent; */
	/* background-color: red;  */
`;

const HandleMaterial = styled(motion.div)`
	position: absolute;
	width: 6px;
	left: calc(50% - 3px);
	top: calc(50% - 32px);
	opacity: 1;
	height: 64px;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(10px);
`;
