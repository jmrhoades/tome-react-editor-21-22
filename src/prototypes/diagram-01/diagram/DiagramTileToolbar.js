import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext, colors } from "../metrics/MetricsContext";
import { TomeContext, transitions } from "../tome/TomeContext";
import { Button } from "../../../ds/Button";
import {
	DiagramContext,
	diagramToolbarStates,
	diagramShapeOptions,
	diagramConnectorOptions,
	diagramTools,
} from "./DiagramContext";
import { tiles } from "../tile/Tile";

const Wrap = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	pointer-events: none;
	transform-origin: center;
	z-index: 10;
`;

const Toolbar = styled(motion.div)`
	display: flex;
	align-items: flex-start;

	border-radius: 8px;
	filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.25));

	pointer-events: auto;
`;

// const Spacer = styled(motion.div)`
// 	width: 8px;
// `;

const LineSpacer = styled(motion.div)`
	background: rgba(255, 255, 255, 0.08);
	width: 1px;
	border-radius: 1px;
	height: 18px;
	margin: 12px 8px 0;
`;


export const DiagramTileToolbar = props => {
	const { viewportWidth, pageWidth, pagePadding, viewportHeight, pageHeight, tileHalfSize, tileMargin } =
		useContext(MetricsContext).metrics;

	const { selectedTile } = useContext(TomeContext);

	const buttonWidth = "48px";

	const {
		activeDiagramTool,
		setActiveDiagramTool,
		diagramToolbarState,
		setDiagramToolbarState,
		lastSelectedDiagramShapeTool,
		setLastSelectedDiagramShapeTool,
		lastSelectedDiagramConnectorTool,
		lastSelectedDiagramConnectorStartCap,
		setLastSelectedDiagramConnectorStartCap,
		lastSelectedDiagramConnectorEndCap,
		setLastSelectedDiagramConnectorEndCap,
		lastSelectedDiagramConnectorLineStyle,
		setLastSelectedDiagramConnectorLineStyle,
		diagramExpanded,
	} = useContext(DiagramContext);

	// const shapesContect = [
	// 	diagramShapeOptions.RECTANGLE,
	// 	"spacer",
	// 	diagramShapeOptions.CIRCLE,
	// 	"spacer",
	// 	diagramShapeOptions.SQUARE,
	// 	"spacer",
	// 	diagramShapeOptions.DIAMOND,
	// 	"spacer",
	// 	diagramShapeOptions.PARALLELOGRAM,
	// 	"spacer",
	// 	diagramShapeOptions.CYLINDER,
	// 	"spacer",
	// 	diagramShapeOptions.CLOUD,
	// ];

	// Reset toolbar each time the tile is re-selected
	useEffect(() => {
		if (selectedTile && selectedTile.type === tiles.DIAGRAM) {
			setActiveDiagramTool(null);
			setDiagramToolbarState(diagramToolbarStates.CHOOSE_TOOL);
		}
		if (!selectedTile || selectedTile.type !== tiles.DIAGRAM) {
			setActiveDiagramTool(null);
		}
	}, [selectedTile, setActiveDiagramTool, setDiagramToolbarState]);

	let toolbarWidth = tileHalfSize;
	let toolbarLeft = (viewportWidth - pageWidth) / 2 + pagePadding + tileMargin + tileHalfSize;
	let toolbarBottom = ((viewportHeight - pageHeight) / 2) - 44;

	if (diagramExpanded) {
		toolbarWidth = "100%";
		toolbarLeft = 0;
		toolbarBottom = 20;
	}

	return (
		<Wrap
			layout
			transition={transitions.layoutTransition}
			style={{
				width: toolbarWidth,
				left: toolbarLeft,
				bottom: toolbarBottom,
				opacity: selectedTile && selectedTile.type === tiles.DIAGRAM ? 1 : 0,
			}}
		>
			{diagramToolbarState === diagramToolbarStates.CHOOSE_TOOL && (
				<Toolbar
					layout
					transition={transitions.layoutTransition}
					style={{
						backgroundColor: colors.z2,
					}}
				>
					<Button
						key={"toggle-pan-canvas-tool"}
						kind="icon"
						icon="DiagramPan"
						onMouseUp={e => {
							if (activeDiagramTool === diagramTools.PAN) {
								setActiveDiagramTool(null);
							} else {
								setActiveDiagramTool(diagramTools.PAN);
							}
						}}
						selected={activeDiagramTool === diagramTools.PAN}
						selectedBackgroundColor={"transparent"}
						width={buttonWidth}
						minWidth={buttonWidth}
					/>

					<Button
						key={"select-shape-tool-and-show-shape-options"}
						kind="icon"
						icon={lastSelectedDiagramShapeTool}
						onMouseUp={e => {
							setActiveDiagramTool(diagramTools.ADD_SHAPE);
							setDiagramToolbarState(diagramToolbarStates.CHOOSE_SHAPE);
						}}
						selected={activeDiagramTool === diagramTools.ADD_SHAPE}
						selectedBackgroundColor={"transparent"}
						width={buttonWidth}
						minWidth={buttonWidth}
					/>

					<Button
						key={"select-connector-tool-and-show-connector-options"}
						kind="icon"
						icon={lastSelectedDiagramConnectorTool}
						onMouseUp={e => {
							// setActiveDiagramTool(diagramTools.ADD_CONNECTOR);
							// setDiagramToolbarState(diagramToolbarStates.CHOOSE_CONNECTOR);
							
							if (activeDiagramTool === diagramTools.ADD_CONNECTOR) {
								setActiveDiagramTool(null);
							} else {
								setActiveDiagramTool(diagramTools.ADD_CONNECTOR);
							}
							
						}}
						selected={activeDiagramTool === diagramTools.ADD_CONNECTOR}
						selectedBackgroundColor={"transparent"}
						width={buttonWidth}
						minWidth={buttonWidth}
					/>
				</Toolbar>
			)}

			{diagramToolbarState === diagramToolbarStates.CHOOSE_SHAPE && (
				<Toolbar
					layout
					transition={transitions.layoutTransition}
					style={{
						backgroundColor: colors.z2,
					}}
				>
					{/* Cancel / Close */}

					{/* <Button
						kind="icon"
						icon={"Close"}
						customIconSize={20}
						onMouseUp={e => {
							setDiagramToolbarState(diagramToolbarStates.CHOOSE_TOOL);
							setActiveDiagramTool(null);
						}}
					/>

					<LineSpacer /> */}

					{Object.keys(diagramShapeOptions).map(key => (
						<Button
							kind="icon"
							key={key}
							icon={diagramShapeOptions[key]}
							onMouseUp={e => {
								if (lastSelectedDiagramShapeTool === diagramShapeOptions[key]) {
									setActiveDiagramTool(null);
								} else {
									setLastSelectedDiagramShapeTool(diagramShapeOptions[key]);
									setActiveDiagramTool(diagramTools.ADD_SHAPE);
								}
								setDiagramToolbarState(diagramToolbarStates.CHOOSE_TOOL);
							}}
							selected={lastSelectedDiagramShapeTool === diagramShapeOptions[key]}
							selectedBackgroundColor={"transparent"}
						/>
					))}
				</Toolbar>
			)}

			{diagramToolbarState === diagramToolbarStates.CHOOSE_CONNECTOR && (
				<Toolbar
					layout
					transition={transitions.layoutTransition}
					style={{
						backgroundColor: colors.z2,
					}}
				>
					{/* Cancel / Close */}
					{/* <Button
						kind="icon"
						icon={"Close"}
						customIconSize={20}
						onMouseUp={e => {
							setDiagramToolbarState(diagramToolbarStates.CHOOSE_TOOL);
							setActiveDiagramTool(null);
						}}
					/>

					<LineSpacer /> */}

					<Button
						kind="icon"
						icon={diagramConnectorOptions.START_CAP_ARROW}
						width={"32px"}
						minWidth={"32px"}
						onMouseUp={e => {
							setLastSelectedDiagramConnectorStartCap(diagramConnectorOptions.START_CAP_ARROW);
							setActiveDiagramTool(diagramTools.ADD_SHAPE);
						}}
						selected={lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_ARROW}
						selectedBackgroundColor={"transparent"}
					/>
					<Button
						kind="icon"
						icon={diagramConnectorOptions.START_CAP_DOT}
						width={"32px"}
						minWidth={"32px"}
						onMouseUp={e => {
							setLastSelectedDiagramConnectorStartCap(diagramConnectorOptions.START_CAP_DOT);
							setActiveDiagramTool(diagramTools.ADD_SHAPE);
						}}
						selected={lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_DOT}
						selectedBackgroundColor={"transparent"}
					/>

					<LineSpacer />

					<Button
						kind="icon"
						icon={diagramConnectorOptions.END_CAP_DOT}
						width={"32px"}
						minWidth={"32px"}
						onMouseUp={e => {
							setLastSelectedDiagramConnectorEndCap(diagramConnectorOptions.END_CAP_DOT);
							setActiveDiagramTool(diagramTools.ADD_SHAPE);
						}}
						selected={lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_DOT}
						selectedBackgroundColor={"transparent"}
					/>
					<Button
						kind="icon"
						icon={diagramConnectorOptions.END_CAP_ARROW}
						width={"32px"}
						minWidth={"32px"}
						onMouseUp={e => {
							setLastSelectedDiagramConnectorEndCap(diagramConnectorOptions.END_CAP_ARROW);
							setActiveDiagramTool(diagramTools.ADD_SHAPE);
						}}
						selected={lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_ARROW}
						selectedBackgroundColor={"transparent"}
					/>

					<LineSpacer />

					<Button
						kind="icon"
						icon={diagramConnectorOptions.LINE_SOLID}
						width={"32px"}
						minWidth={"32px"}
						onMouseUp={e => {
							setLastSelectedDiagramConnectorLineStyle(diagramConnectorOptions.LINE_SOLID);
							setActiveDiagramTool(diagramTools.ADD_SHAPE);
						}}
						selected={lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_SOLID}
						selectedBackgroundColor={"transparent"}
					/>
					<Button
						kind="icon"
						icon={diagramConnectorOptions.LINE_DOTTED}
						width={"32px"}
						minWidth={"32px"}
						onMouseUp={e => {
							setLastSelectedDiagramConnectorLineStyle(diagramConnectorOptions.LINE_DOTTED);
							setActiveDiagramTool(diagramTools.ADD_SHAPE);
						}}
						selected={lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_DOTTED}
						selectedBackgroundColor={"transparent"}
					/>
				</Toolbar>
			)}
		</Wrap>
	);
};
