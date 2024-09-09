import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { MetricsContext } from "../metrics/MetricsContext";
import { TomeContext, transitions } from "../tome/TomeContext";
import { DiagramTileButtons } from "./DiagramTileButtons";
import { tiles } from "../tile/Tile";
import { DiagramContext, diagramTools } from "./DiagramContext";
import { DiagramShape } from "./DiagramShape";
// import { DiagramConnector } from "./DiagramConnector";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
	pointer-events: none;
`;

const ScalingView = styled(motion.div)`
	position: relative;
`;

const Canvas = styled(motion.div)`
	pointer-events: auto;
	position: relative;
`;

const DotGrid = styled(motion.div)`
	position: absolute;
	width: 1920px;
	height: 1920px;
	top: 0;
	left: 0;
	overflow: hidden;
	background-image: url("/images/dot-grid-1922.png");
	background-repeat: no-repeat;
	background-size: 1920px 1920px;
	background-position: 0 0;
	opacity: 0.15;
`;

const ExampleDiagram01 = styled(motion.img)`
	display: block;
	position: absolute;
	width: 408px;
	height: 396px;
	pointer-events: none;
`;

const SelectionRect = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 300px;
	height: 300px;
	background: rgba(255, 50, 50, 0.5);
	pointer-events: none;
	border-width: 1px;
	border-style: solid;
`;

export const DiagramTile = props => {
	const { tileCornerRadius, colors, tileHalfSize, scale, viewportWidth, viewportHeight } =
		useContext(MetricsContext).metrics;
	const { selectedTile } = useContext(TomeContext);

	const tileRef = useRef();
	const canvasSize = 1920;
	const canvasTransform = useAnimation();

	const {
		activeDiagramTool,
		canvasScale,
		setSelectedShapeData,
		isDragSelecting,
		setIsDragSelecting,
		diagramShape1Data,
		diagramShape2Data,
		diagramShape3Data,
		diagramShape4Data,
		panX,
		panY,
		diagramExpanded,
	} = useContext(DiagramContext);

	const diagramShapeData = [diagramShape1Data, diagramShape2Data, diagramShape3Data, diagramShape4Data];

	const canvasIsPanning = useMotionValue(0);

	const selectionRectStartX = useMotionValue(0);
	const selectionRectStartY = useMotionValue(0);
	const selectionRectOpacity = useMotionValue(0);
	const selectionRectWidth = useMotionValue(0);
	const selectionRectHeight = useMotionValue(0);
	const selectionRectX = useMotionValue(0);
	const selectionRectY = useMotionValue(0);

	// Zoom-to-fit when canvas is blurred
	useEffect(() => {
		if (!selectedTile || selectedTile.type !== tiles.DIAGRAM) {
			canvasTransform.start({
				x: 0,
				y: 0,
				scale: 1,
			});
			canvasScale.set(1);
			panX.set(0);
			panY.set(0);

			// De-select shape
			setSelectedShapeData(null);
		}
	}, [selectedTile, canvasTransform, canvasScale, setSelectedShapeData, panX, panY]);

	// useEffect(() => {
	// 	canvasTransform.start({
	// 		x: 0,
	// 		y: 0,
	// 		scale: 1,
	// 	});
	// 	panX.set(0);
	// 	panY.set(0);
	// }, [diagramExpanded]);

	// Respond to zoom in/out changes
	useEffect(() => {
		canvasScale.onChange(latest => {
			canvasTransform.start({
				scale: latest,
			});
		});
	});

	// Handle mouse wheel events
	useEffect(() => {
		const handleWheel = event => {
			event.preventDefault();
			//console.log(event);
			if (!props.selected) return false;
			const { deltaX, deltaY, ctrlKey, metaKey } = event;
			if (ctrlKey || metaKey) {
				//setCamera((camera) =>
				//zoomCamera(camera, { x: clientX, y: clientY }, deltaY / 100)
				//);
				let newScale = canvasScale.get() + deltaY / 100;
				// if (newScale < 0.1) newScale = 0.1;
				canvasScale.set(newScale);
			} else {
				panX.set(panX.get() - deltaX);
				panY.set(panY.get() - deltaY);
			}
		};
		const elm = tileRef.current;
		if (!elm) return;
		elm.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			elm.removeEventListener("wheel", handleWheel);
		};
	}, [tileRef, props.selected, canvasScale, panX, panY]);

	const updateCursor = eventName => {
		if (activeDiagramTool === diagramTools.PAN) {
			document.body.style.cursor = canvasIsPanning.get() === 1 || eventName === "mousedown" ? "grabbing" : "grab";
		} else if (activeDiagramTool === diagramTools.ADD_SHAPE) {
			document.body.style.cursor = "crosshair";
		} else if (activeDiagramTool === diagramTools.ADD_CONNECTOR) {
			document.body.style.cursor = "crosshair";
		} else {
			document.body.style.cursor = "auto";
		}
	};

	// Reset toolbar each time the tile is re-selected
	useEffect(() => {
		if (activeDiagramTool === diagramTools.PAN) {
			document.body.style.cursor = "grab";
		} else if (activeDiagramTool === diagramTools.ADD_SHAPE) {
			document.body.style.cursor = "crosshair";
		} else if (activeDiagramTool === diagramTools.ADD_CONNECTOR) {
			document.body.style.cursor = "crosshair";
		} else {
			document.body.style.cursor = "auto";
		}
	}, [activeDiagramTool]);

	let canvasOffsetX = (tileHalfSize - canvasSize) / 2;
	let canvasOffsetY = (tileHalfSize - canvasSize) / 2;
	let tileBorderRadius = tileCornerRadius;

	if (diagramExpanded) {
		canvasOffsetX = (viewportWidth - canvasSize) / 2;
		canvasOffsetY = (viewportHeight - canvasSize) / 2;
		tileBorderRadius = 0;
	}

	return (
		<Wrap
			ref={tileRef}
			layout
			transition={transitions.layoutTransition}
			style={{
				borderRadius: tileBorderRadius,
				backgroundColor: colors.diagramBackground,
			}}
			onMouseEnter={updateCursor}
			onMouseMove={updateCursor}
			onMouseLeave={() => (document.body.style.cursor = "auto")}
		>
			<ScalingView
				layout
				transition={transitions.layoutTransition}
				style={{
					left: canvasOffsetX,
					top: canvasOffsetY,
					scale: scale,
					width: canvasSize,
					height: canvasSize,
				}}
			>
				<Canvas
					drag={activeDiagramTool === diagramTools.PAN}
					dragTransition={{ power: 0.1, timeConstant: 100 }}
					onMouseDown={() => {
						if (activeDiagramTool === diagramTools.PAN) {
							canvasIsPanning.set(1);
							updateCursor("mousedown");
						}
					}}
					onMouseUp={() => {
						if (activeDiagramTool === diagramTools.PAN) {
							canvasIsPanning.set(0);
							updateCursor("mouseup");
						}
					}}
					onMouseLeave={() => {}}
					animate={canvasTransform}
					transition={transitions.layoutTransition}
					style={{
						width: canvasSize,
						height: canvasSize,
						x: panX,
						y: panY,
					}}
				>
					<DotGrid
						onTapStart={(event, info) => {
							if (activeDiagramTool === null && props.selected) {
								// De-select shape
								setSelectedShapeData(null);
								// Start selection rect
								const x = event.offsetX;
								const y = event.offsetY;
								setIsDragSelecting(true);
								selectionRectStartX.set(x);
								selectionRectStartY.set(y);
								selectionRectX.set(x);
								selectionRectY.set(y);
								selectionRectWidth.set(0);
								selectionRectHeight.set(0);
								selectionRectOpacity.set(1);
							}
						}}
						onTap={() => {
							if (activeDiagramTool === null) {
								selectionRectOpacity.set(0);
								setIsDragSelecting(false);
							}
						}}
						onTapCancel={() => {
							if (activeDiagramTool === null) {
								selectionRectOpacity.set(0);
								setIsDragSelecting(false);
							}
						}}
						onPan={(event, info) => {
							// console.log(event.offsetX, event.clientX)
							if (isDragSelecting && props.tileHoverOpacity === 1) {
								const startX = selectionRectStartX.get();
								const startY = selectionRectStartY.get();
								const pointerX = event.offsetX;
								const pointerY = event.offsetY;

								if (pointerX > startX) {
									selectionRectWidth.set(pointerX - startX);
								} else {
									selectionRectX.set(pointerX);
									selectionRectWidth.set(startX - pointerX);
								}
								if (pointerY > startY) {
									selectionRectHeight.set(pointerY - startY);
								} else {
									selectionRectY.set(pointerY);
									selectionRectHeight.set(startY - pointerY);
								}

								// Check if select rect intersects with canvas shapes
								const minAx = selectionRectX.get();
								const maxAx = selectionRectX.get() + selectionRectWidth.get();
								const minAy = selectionRectY.get();
								const maxAy = selectionRectY.get() + selectionRectHeight.get();
								const minBx = 900;
								const maxBx = minBx + 120;
								const minBy = 762;
								const maxBy = minBx + 72;
								if (maxAx >= minBx && minAx <= maxBx && minAy <= maxBy && maxAy >= minBy) {
									setSelectedShapeData(diagramShape1Data);
								} else {
									setSelectedShapeData(null);
								}
							}
						}}
					/>

					<SelectionRect
						style={{
							x: selectionRectX,
							y: selectionRectY,
							width: selectionRectWidth,
							height: selectionRectHeight,
							opacity: selectionRectOpacity,
							backgroundColor: colors.selectionRectBackground,
							borderColor: colors.accent,
						}}
					/>

					<ExampleDiagram01
						src="/images/example-diagram-02.svg"
						style={{
							top: (canvasSize - 396) / 2,
							left: (canvasSize - 408) / 2,
						}}
					/>

					{diagramShapeData.map(obj => (
						<DiagramShape tileSelected={props.selected} shapeData={obj} key={obj.id} />
					))}
				</Canvas>
			</ScalingView>

			<DiagramTileButtons
				showExpand={props.tileHoverOpacity === 1 || props.selected}
				showZoom={props.selected}
				tileSelected={props.selected}
			/>
		</Wrap>
	);
};
