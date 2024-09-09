import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "../../../ds/Icon";
import { DiagramContext } from "./DiagramContext";

const Wrap = styled(motion.div)`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	pointer-events: none;
`;

const ButtonGroup = styled(motion.div)`
	display: flex;
	line-height: 1;
	position: absolute;
	bottom: 12px;
	backdrop-filter: blur(20px);
	border-radius: 6px;
	overflow: hidden;
`;

const Button = styled(motion.div)`
	line-height: 1;
	padding: 8px 12px;
	background: rgba(9, 9, 9, 0.2);
	& svg {
		display: block;
	}
`;

const IconWrap = styled(motion.div)`
	width: 16px;
	height: 16px;
	transform-origin: 50% 50%;
`;

const ButtonVariants = {
	default: {
		background: "rgba(9, 9, 9, 0.2)",
	},
	hover: {
		background: "rgba(9, 9, 9, 0.5)",
	},
	active: {
		background: "rgba(9, 9, 9, 0.9)",
	},
};

const IconVariants = {
	default: {
		scale: 1,
	},
	hover: {
		scale: 1.1,
	},
	active: {
		scale: 0.95,
	},
};

export const DiagramTileButtons = props => {
	const iconColor = "rgba(255,255,255,0.6)";
	const iconSize = 16;
	const { canvasScale, isDragSelecting, setSelectedShapeData, setDiagramExpanded, diagramExpanded } = useContext(DiagramContext);
	const zoomIncrement = 1 / 3;

	return (
		<Wrap>
			<ButtonGroup
				style={{
					right: "12px",
					flexDirection: "row",
					pointerEvents: isDragSelecting ? "none" : "auto",
				}}
				animate={{
					opacity: props.showExpand && !diagramExpanded ? 1 : 0,
				}}
			>
				<Button
					variants={ButtonVariants}
					initial={"default"}
					whileHover={"hover"}
					whileTap={"active"}
					onMouseUp={e => {
						setDiagramExpanded(!diagramExpanded)
						// e.stopPropagation();
					}}
					style={{
						pointerEvents: isDragSelecting ? "none" : "auto",
					}}
				>
					<IconWrap variants={IconVariants}>
						<Icon
							size={iconSize}
							name={diagramExpanded ? "CollapseTile" : "ExpandTile"}
							color={iconColor}
							opacity={1}
						/>
					</IconWrap>
				</Button>
			</ButtonGroup>

			<ButtonGroup
				style={{
					left: "12px",
					flexDirection: "row-reverse",
				}}
				animate={{
					opacity: props.showZoom ? 1 : 0,
				}}
			>
				<Button
					variants={ButtonVariants}
					initial={"default"}
					whileHover={"hover"}
					whileTap={"active"}
					onMouseUp={e => {
						const maxScale = 2;
						const s = canvasScale.get();
						const nS = s + zoomIncrement;
						canvasScale.set(nS <= maxScale ? nS : maxScale);
						setSelectedShapeData(null); // TEMP: deselect shape when zooming
						e.stopPropagation();
					}}
					style={{
						pointerEvents: isDragSelecting ? "none" : "auto",
					}}
				>
					<IconWrap variants={IconVariants}>
						<Icon size={iconSize} name={"Add"} color={iconColor} opacity={1} />
					</IconWrap>
				</Button>

				<Button
					variants={ButtonVariants}
					initial={"default"}
					whileHover={"hover"}
					whileTap={"active"}
					onMouseUp={e => {
						const minScale = 0.25;
						const s = canvasScale.get();
						const nS = s - zoomIncrement;
						canvasScale.set(nS >= minScale ? nS : minScale);
						setSelectedShapeData(null); // TEMP: deselect shape when zooming
						e.stopPropagation();
					}}
					style={{
						pointerEvents: isDragSelecting ? "none" : "auto",
					}}
				>
					<IconWrap variants={IconVariants}>
						<Icon size={iconSize} name={"Subtract"} color={iconColor} opacity={1} />
					</IconWrap>
				</Button>
				{/* 
				<Spacer />
				<CanvasButton>
					<Icon size={iconSize} name={"FitCanvasToContent"} color={iconColor} opacity={1} />
				</CanvasButton> */}
			</ButtonGroup>
		</Wrap>
	);
};
