import React, { useState } from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

import { TileImage } from "./TileImage";
import { TileText } from "./TileText";

import {
	PAGE_MARGIN,
	TILE_POSITION_LEFT,
	TILE_POSITION_RIGHT,
	TILE_SIZE_HALF,
	TILE_SIZE_FULL,
	TILE_REPOSITION_THRESHOLD_X_MIN,
	TILE_REPOSITION_THRESHOLD_X_MAX,
	TILE_REPOSITION_THRESHOLD_Y,
	TILE_REPOSITION_TRANSITION,
	TILE_RESIZE_SPRING,
} from "./index";

export const Tile = React.forwardRef((props, ref) => {
	const [isDragging, setIsDragging] = useState(false);

	const resizeDragOffset = useMotionValue(0);
	resizeDragOffset.set(props.resizeOffset);

	const resizeVariants = {
		left_hidden: {
			x: 0,
			width: 0,
			opacity: 0,
		},
		right_hidden: {
			x: TILE_SIZE_HALF + PAGE_MARGIN,
			width: -PAGE_MARGIN,
			opacity: 0,
		},
		left_half: {
			x: 0,
			width: TILE_SIZE_HALF,
			opacity: 1,
		},
		right_half: {
			x: 0,
			width: TILE_SIZE_HALF,
			opacity: 1,
		},
		left_full: {
			x: 0,
			width: TILE_SIZE_FULL,
			opacity: 1,
		},
		right_full: {
			x: -TILE_SIZE_HALF - PAGE_MARGIN,
			width: TILE_SIZE_FULL,
			opacity: 1,
		},
	};

	// Resize/position/opacity transforms
	// Based on resizeDragOffset

	const p = props.position;
	const s = props.size;
	const h = props.resizeHandleID;
	const o = resizeDragOffset;
	// console.log(props.id, t, p, s, h, o.get());

	let dragOffsetRange = [-TILE_SIZE_HALF, 0, TILE_SIZE_HALF];
	let resizeWidthRange = [-PAGE_MARGIN, TILE_SIZE_HALF, TILE_SIZE_FULL];
	let resizeOpacityRange = [0, 1, 1];
	let resizeXRange = [0, 0, 0];

	// 2 tile page, left tile updating from half size, center handle moving
	if (p === "left" && s === "half" && h === "center") {
		resizeWidthRange = [-PAGE_MARGIN, TILE_SIZE_HALF, TILE_SIZE_FULL];
		resizeOpacityRange = [0, 1, 1];
		resizeXRange = [0, 0, 0];
	}

  // 2 tile page, right tile updating from half size, center handle moving
	if (p === "right" && s === "half" && h === "center") {
		resizeWidthRange = [TILE_SIZE_FULL, TILE_SIZE_HALF, -PAGE_MARGIN];
		resizeOpacityRange = [1, 1, 0];
		resizeXRange = [-TILE_POSITION_RIGHT, 0, TILE_SIZE_HALF + PAGE_MARGIN];
	}

  // 1 tile page, left tile updating from full size, right handle moving
	if (p === "left" && s === "full" && h === "right") {
		resizeWidthRange = [TILE_SIZE_HALF, TILE_SIZE_FULL, TILE_SIZE_FULL];
		resizeOpacityRange = [1, 1, 1];
		resizeXRange = [0, 0, 0];
	}

  	// 1 tile page, right tile updating from hidden size, right handle moving
	if (p === "right" && s === "hidden" && h === "right") {
		resizeWidthRange = [TILE_SIZE_HALF, resizeVariants.right_hidden.width, resizeVariants.right_hidden.width];
		resizeOpacityRange = [1, 0, 0];
		resizeXRange = [0, resizeVariants.right_hidden.x, resizeVariants.right_hidden.x];
	}

  // 1 tile page, left tile updating from hidden size, left handle moving
	if (p === "left" && s === "hidden" && h === "left") {
		resizeWidthRange = [-PAGE_MARGIN, -PAGE_MARGIN, TILE_SIZE_HALF];
		resizeOpacityRange = [0, 0, 1];
		resizeXRange = [0, 0, 0];
	}

  // 1 tile page, right tile updating from full size, left handle moving
	if (p === "right" && s === "full" && h === "left") {
		resizeWidthRange = [TILE_SIZE_FULL, TILE_SIZE_FULL, TILE_SIZE_HALF];
		resizeOpacityRange = [1, 1, 1];
		resizeXRange = [-TILE_SIZE_HALF - PAGE_MARGIN, -TILE_SIZE_HALF - PAGE_MARGIN, 0];
	}

	let resizeWLinear = useTransform(o, dragOffsetRange, resizeWidthRange);
	let resizeXLinear = useTransform(o, dragOffsetRange, resizeXRange);
	let resizeOpacityLinear = useTransform(o, dragOffsetRange, resizeOpacityRange);
	let resizeX = useSpring(resizeXLinear, TILE_RESIZE_SPRING);
	let resizeW = useSpring(resizeWLinear, TILE_RESIZE_SPRING);
	let resizeOpacity = useSpring(resizeOpacityLinear, TILE_RESIZE_SPRING);

  const repositionDragConstraints = {
		top: 0,
		bottom: 0,
		left: props.position === "left" ? TILE_POSITION_LEFT : TILE_POSITION_LEFT,
		right: props.position === "left" ? TILE_POSITION_RIGHT : TILE_POSITION_RIGHT,
	};

	const positionVariants = {
		left: {
			x: TILE_POSITION_LEFT,
		},
		right: {
			x: TILE_POSITION_RIGHT,
		},
	};

	const shadowVariants = {
		hide: { opacity: 0 },
		show: { opacity: 1 },
	};

	const tileBackgroundVariants = {
		hide: { opacity: 0, transition: { duration: 0.4 } },
		show: { opacity: 1, transition: { duration: 0.1 } },
	};

	const hoverRingOpacity = useMotionValue(0);

	const onHoverStart = (event, info) => {
		hoverRingOpacity.set(1);
		document.body.style.cursor = "default";
	};

	const onHoverEnd = (event, info) => {
		hoverRingOpacity.set(0);
	};

	const onRepositionDragStart = (event, info) => {
		setIsDragging(true);
		props.setTileMoving(true);
		hoverRingOpacity.set(0);
	};

	const onRepositionDrag = (event, info) => {
		if (
			props.position === "left" &&
			info.offset.x > TILE_REPOSITION_THRESHOLD_X_MIN &&
			Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
			Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
		) {
			props.onTilePositionUpdate(props.id, props.position);
		} else if (
			props.position === "right" &&
			info.offset.x < -TILE_REPOSITION_THRESHOLD_X_MIN &&
			Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
			Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
		) {
			props.onTilePositionUpdate(props.id, props.position);
		} else {
			props.onTilePositionUpdate(props.id, props.position === "right" ? "left" : "right");
		}
	};

	const ononRepositionDragDragEnd = (event, info) => {
		// console.log("ononRepositionDragDragEnd", info.offset.x);
		setIsDragging(false);
		props.setTileMoving(false);
		const c = props.position;
		if (
			props.position === "left" &&
			info.offset.x > TILE_REPOSITION_THRESHOLD_X_MIN &&
			Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
			Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
		) {
			props.setPosition(c === "right" ? "left" : "right");
		} else if (
			props.position === "right" &&
			info.offset.x < -TILE_REPOSITION_THRESHOLD_X_MIN &&
			Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
			Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
		) {
			props.setPosition(c === "right" ? "left" : "right");
		} else {
			props.setPosition("");
			props.setPosition(c); // reset position
		}
	};

	return (
		<RearrangeContainer
			w={TILE_SIZE_HALF}
			h={TILE_SIZE_HALF}
			style={{
				zIndex: props.z,
			}}
			drag
			dragConstraints={repositionDragConstraints}
			dragElastic={0.2}
			dragMomentum={false}
			onHoverStart={isDragging || props.isResizeDragging || props.tileMoving ? null : onHoverStart}
			onHoverEnd={isDragging || props.isResizeDragging || props.tileMoving ? null : onHoverEnd}
			onMouseDown={props.onMouseDown}
			onMouseUp={props.onMouseUp}
			onDragStart={onRepositionDragStart}
			onDrag={onRepositionDrag}
			onDragEnd={ononRepositionDragDragEnd}
			initial={props.position}
			animate={props.position}
			variants={positionVariants}
			transition={TILE_REPOSITION_TRANSITION}
			ref={ref}
		>
			<ResizeContainer
				style={{
					x: resizeX,
					opacity: resizeOpacity,
					width: resizeW,
				}}
			>
				<Shadow variants={shadowVariants} initial={"hide"} animate={isDragging ? "show" : "hide"} />
				<HoverRing style={{ opacity: hoverRingOpacity }} />
				<SelectRing style={{ opacity: props.selected }} />
				<Background bg={props.bg} />
				<DragIndicatorBackground
					initial="hide"
					variants={tileBackgroundVariants}
					animate={isDragging ? "show" : "hide"}
				/>
				<SizeContainer>
					<TileContent minWidth={TILE_SIZE_HALF}>
						{props.tileType === "text" && <TileText resizeW={resizeW} position={props.position} />}
						{props.tileType === "image" && (
							<TileImage image={"./images/resize04/LiamWong_KabukichoNights_Tokyo_sm.jpg"} />
						)}
					</TileContent>
				</SizeContainer>
			</ResizeContainer>
		</RearrangeContainer>
	);
});

const RearrangeContainer = styled(motion.div)`
	position: absolute;
	width: ${props => props.w}px;
	height: ${props => props.h}px;
	top: 0;
	left: 0;
`;

const Background = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-radius: 12px;
	background-color: #141414;
	/* background-color: ${props => props.bg}; */
`;

const DragIndicatorBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-radius: 12px;
	background-color: #1f1f1f;
	/* background-color: rgba(255, 255, 255, 0.1); */
`;

const Shadow = styled(Background)`
	background-color: transparent;
	box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
`;

const HoverRing = styled(motion.div)`
	position: absolute;
	top: -2px;
	right: -2px;
	bottom: -2px;
	left: -2px;
	background-color: #292929;
	border-radius: 13px;
`;

const SelectRing = styled(HoverRing)`
	background-color: #ed00eb;
`;

const ResizeContainer = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const SizeContainer = styled(motion.div)`
	position: absolute;
	border-radius: 12px;
	overflow: hidden;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/* visibility: hidden; */
`;

const TileContent = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	min-width: ${props => props.minWidth}px;
	top: 0;
	left: 0;
`;
