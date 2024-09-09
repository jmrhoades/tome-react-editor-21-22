import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DiagramContext, diagramShapeOptions } from "./DiagramContext";
import { roundCorners } from "svg-path-round-corners";
import { serialize, parse } from "./svg-crap";

import { colors } from "../metrics/MetricsContext";

const Wrap = styled(motion.div)`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Geometry = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;

const Label = styled(motion.div)`
	position: relative;
	font-weight: 600;
	font-size: 15px;
	line-height: 16px;
`;

const Selection = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const SelectionRect = styled(motion.div)`
	position: absolute;
	top: -1px;
	left: -1px;
	width: calc(100% + 2px);
	height: calc(100% + 2px);
	border: 2px solid #ed00eb;
	box-shadow: inset 0px 0px 0px 1px #141414;
`;

const ControlPoint = styled(motion.div)`
	position: absolute;
	& svg {
		display: block;
	}
`;

const Input = styled(motion.div)``;

const controlPoint = (size, left, top) => {
	const innerSize = 4;
	return (
		<ControlPoint
			style={{
				left: left,
				top: top,
				x: -size / 2,
				y: -size / 2,
			}}
		>
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<rect width={size} height={size} rx="2" fill={colors.accent} />
				<rect
					x={innerSize / 2}
					y={innerSize / 2}
					width={size - innerSize}
					height={size - innerSize}
					rx="1"
					fill="white"
				/>
			</svg>
		</ControlPoint>
	);
};

const cloneButtonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		scale: 1.05,
	},
	active: {
		scale: 0.95,
	},
};

const cloneButtonBackgroundVariants = {
	default: {
		opacity: 0.08,
	},
	hover: {
		opacity: 0.08,
	},
	active: {
		opacity: 0.12,
	},
};

const cloneButtonIconVariants = {
	default: {
		opacity: 0.6,
	},
	hover: {
		opacity: 0.7,
	},
	active: {
		opacity: 0.8,
	},
};

const CloneButtons = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CloneButton = props => {
	if (props.location === "bottom") {
	}
	if (props.location === "left") {
	}

	return (
		<motion.svg
			viewBox="0 0 24 24"
			style={{
				width: 24,
				height: 24,
				position: "absolute",
				x: props.x,
				y: props.y,
			}}
			whileTap="active"
			whileHover="hover"
			initial="default"
			variants={cloneButtonVariants}
		>
			<motion.rect
				x="0"
				y="0"
				width="24"
				height="24"
				rx="12"
				fill="white"
				variants={cloneButtonBackgroundVariants}
				transition={{ duration: 0.1 }}
			/>
			<motion.path
				d="M12 8V16M8 12H16"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				variants={cloneButtonIconVariants}
				transition={{ duration: 0.1 }}
			/>
		</motion.svg>
	);
};

export const DiagramShape = ({ tileSelected = false, shapeData }) => {
	const {
		id,
		geometry,
		label,
		labelVisible,
		color,
		x,
		y,
		width,
		height,
		connectorLeft,
		connectorRight,
		connectorBottom,
	} = shapeData;

	const shapeRef = useRef(null);
	const cloneButtonOffset = 24;
	const controlPointSize = 10;
	const { selectedShapeData, setSelectedShapeData, isDragSelecting } = useContext(DiagramContext);

	const diamondPath = `M ${0} ${height / 2}
		L ${width / 2} ${height}
		L ${width} ${height / 2}
		L ${width / 2} ${0}
		Z
	`;
	const diamondPathRounded = serialize(roundCorners(parse(diamondPath), 8));

	const paraOffset = width * 0.1666666667;
	const paraPath = `M ${paraOffset} ${0}
	L ${0} ${height}
	L ${width - paraOffset} ${height}
	L ${width} ${0}
	Z`;
	const paraPathRounded = serialize(roundCorners(parse(paraPath), 12));

	let svgWidth = width;
	let svgHeight = height;
	if (geometry === diagramShapeOptions.CYLINDER || geometry === diagramShapeOptions.CLOUD) {
		svgWidth = 120;
		svgHeight = 120;
	}

	return (
		<Wrap
			ref={shapeRef}
			style={{
				width: width,
				height: height,
				x: x,
				y: y,
				pointerEvents: isDragSelecting ? "none" : "auto",
			}}
			onTap={
				tileSelected
					? () => {
							setSelectedShapeData(shapeData);
							if (shapeRef.current) {
								//console.log(shapeRef.current.getBoundingClientRect());
								setSelectedShapeData({ ...shapeData, rect: shapeRef.current.getBoundingClientRect() });
								setSelectedShapeData({ ...shapeData, shapeRef: shapeRef });
							}
					  }
					: null
			}
		>
			<Geometry
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
				fill={color.value}
				width={width}
				height={height}
				preserveAspectRatio="none"
			>
				{geometry === diagramShapeOptions.RECTANGLE && <rect width={width} height={height} rx="12" />}
				{geometry === diagramShapeOptions.CIRCLE && (
					<ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} />
				)}
				{geometry === diagramShapeOptions.SQUARE && <rect width={width} height={height} />}
				{geometry === diagramShapeOptions.DIAMOND && <path d={diamondPathRounded} />}
				{geometry === diagramShapeOptions.PARALLELOGRAM && <path d={paraPathRounded} />}
				{geometry === diagramShapeOptions.CYLINDER && (
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M114.641 9.70989C117.384 11.4284 119.441 13.5329 119.901 16.0041C119.964 16.1699 119.998 16.3474 119.998 16.532V17.0369L119.999 17.0551L119.998 17.0732V102.819C119.999 102.841 120 102.863 120 102.886C120 105.872 117.772 108.367 114.622 110.352C111.431 112.361 106.941 114.083 101.577 115.493C90.8239 118.318 76.1195 120 60.0666 120C44.0138 120 29.2932 118.318 18.5244 115.493C13.1521 114.083 8.65405 112.361 5.45744 110.353C2.30127 108.369 0.0671309 105.874 0.0671309 102.886V17.9295C0.0228395 17.6429 0 17.3514 0 17.0551C0 14.125 2.23313 11.6671 5.35777 9.70989C8.5316 7.72191 13.0028 5.99927 18.3595 4.58012C29.0967 1.7355 43.8181 0 59.9993 0C76.1804 0 90.9018 1.7355 101.639 4.58012C106.996 5.99927 111.467 7.72191 114.641 9.70989ZM3.80676 16.4668C4.07116 15.2705 5.15858 13.8901 7.51938 12.4114C10.2285 10.7145 14.2701 9.11872 19.4326 7.751C29.7338 5.02189 44.0768 3.30998 59.9993 3.30998C75.9217 3.30998 90.2647 5.02189 100.566 7.751C105.728 9.11872 109.77 10.7145 112.479 12.4114C115.228 14.1332 116.25 15.7217 116.257 17.0415V17.0686C116.25 18.3885 115.228 19.9769 112.479 21.6987C109.77 23.3956 105.728 24.9914 100.566 26.3592C90.2647 29.0883 75.9217 30.8002 59.9993 30.8002C44.0768 30.8002 29.7338 29.0883 19.4326 26.3592C14.2701 24.9914 10.2285 23.3956 7.51938 21.6987C5.16281 20.2227 4.07506 18.8446 3.80819 17.6497V16.532C3.80819 16.5102 3.80771 16.4884 3.80676 16.4668Z"
					/>
				)}
				{geometry === diagramShapeOptions.CLOUD && (
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M114.47 79.1804C114.817 80.7315 115 82.3444 115 84C115 96.1503 105.15 106 93 106C91.5646 106 90.1613 105.863 88.8026 105.6C82.2347 114.344 71.7779 120 60 120C48.2221 120 37.7653 114.344 31.1974 105.6C29.8387 105.863 28.4354 106 27 106C14.8497 106 5 96.1503 5 84C5 82.3444 5.18288 80.7315 5.52954 79.1804C2.0268 73.6276 0 67.0505 0 60C0 52.4469 2.3261 45.437 6.30101 39.6477C6.10303 38.4613 6 37.2427 6 36C6 23.8497 15.8497 14 28 14C29.1259 14 30.232 14.0846 31.3124 14.2477C37.887 5.59037 48.2906 0 60 0C71.7094 0 82.113 5.59037 88.6876 14.2477C89.768 14.0846 90.8741 14 92 14C104.15 14 114 23.8497 114 36C114 37.2427 113.897 38.4613 113.699 39.6477C117.674 45.437 120 52.4469 120 60C120 67.0505 117.973 73.6276 114.47 79.1804Z"
					/>
				)}
			</Geometry>

			{selectedShapeData && selectedShapeData.id === id && (
				<CloneButtons>
					{!connectorBottom && <CloneButton location={"bottom"} x={0} y={height / 2 + cloneButtonOffset} />}
					{!connectorLeft && <CloneButton location={"left"} x={width / 2 + cloneButtonOffset} y={0} />}
					{!connectorRight && <CloneButton location={"right"} x={-(width / 2 + cloneButtonOffset)} y={0} />}
				</CloneButtons>
			)}

			{labelVisible && (
				<Label
					style={{
						color: color.label,
					}}
				>
					<Input>{label}</Input>
				</Label>
			)}

			<Selection
				style={{
					opacity: tileSelected && selectedShapeData && selectedShapeData.id === id ? 1 : 0,
				}}
			>
				<SelectionRect
					style={{
						borderColor: colors.accent,
					}}
				/>
				{controlPoint(controlPointSize, "0%", "0%")}
				{controlPoint(controlPointSize, "100%", "0%")}
				{controlPoint(controlPointSize, "100%", "100%")}
				{controlPoint(controlPointSize, "0%", "100%")}
			</Selection>
		</Wrap>
	);
};
