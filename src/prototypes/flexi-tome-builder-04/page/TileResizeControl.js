import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../../../ds/Transitions";

const ResizeHandle = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	z-index: 9999;
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	top: 7.5%;
	bottom: 7.5%;
	left: 50%;
	transform: translateX(-50%);
	width: 4px;
	border-radius: 2px;
`;

export const TileResizeControl = props => {
	const {
		pageWidth,
		pageLeft,
		pageMargin,
		minPageHeight,
		columnMinWidth,
		columnCount,
		columnWidth,
		columnGutter,
		rowHeight,
		rowMargin,
	} = useContext(MetricsContext).metrics;
	const { tomeData, setTomeData, tileResizing, setTileResizing, setSelectedTile, selectedTile } = useContext(TomeContext);

	const [handle1Hovered, setHandle1Hovered] = useState(false);
	const [handle1Panning, setHandle1Panning] = useState(false);

	const handleWidth = pageMargin;

	//const offset = pageLeft - handleWidth / 2;
	const firstTile = props.tiles[0];
	let handleLeft = pageMargin + columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
	if (props.order === 2) {
		const secondTile = props.tiles[1];
		handleLeft += columnGutter + columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
	}

	let handleTop = pageMargin;
	if (props.row.order !== 1) {
		props.rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < props.row.order) {
				handleTop +=
					r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
				handleTop += rowMargin;
			}
		});
	}

	/*
	tileHeight
	*/
	let handleHeight = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	const handleSize = metricConstants.cInsertTileHandleSize;

	return (
		<ResizeHandle
			onHoverStart={(event, info) => {
				if (!tileResizing) {
					document.body.style.cursor = "ew-resize";
					setHandle1Hovered(true);
				}
			}}
			onHoverEnd={(event, info) => {
				if (!handle1Panning) document.body.style.cursor = "auto";
				setHandle1Hovered(false);
			}}
			onPanStart={(event, info) => {
				// sort tiles array by tile left position
				// currentPage.tiles.sort((a, b) => a.left - b.left);

				setHandle1Panning(true);
				setTileResizing(true);
				if (selectedTile) setSelectedTile(null);
			}}
			onPanEnd={(event, info) => {
				document.body.style.cursor = "auto";
				setHandle1Panning(false);
				setTileResizing(false);
				setHandle1Hovered(false);
			}}
			onPan={(event, info) => {
				// console.log(info.point.x)
				const x = info.point.x;
				if (x >= pageLeft && x <= pageLeft + pageWidth) {
					let shouldUpdateWidths = false;

					// what 12-col grid point is the pointer closest to?
					let gridPoint = Math.round((x - pageLeft - pageMargin) / (columnWidth + columnGutter));

					if (props.tiles.length === 2) {
						if (gridPoint < columnMinWidth) gridPoint = columnMinWidth;
						if (gridPoint > 10) gridPoint = 10;
					}

					if (props.tiles.length === 3 && props.order === 1) {
						if (gridPoint < columnMinWidth) gridPoint = columnMinWidth;
						let maxGridX = columnCount - props.tiles[2].width - columnMinWidth;
						if (gridPoint > maxGridX) gridPoint = maxGridX;
					}

					if (props.tiles.length === 3 && props.order === 2) {
						let minGridX = props.tiles[0].width + columnMinWidth;
						if (gridPoint < minGridX) gridPoint = minGridX;
						if (gridPoint > 10) gridPoint = 10;
					}

					const leftTile = props.tiles[0];

					if (props.tiles.length === 2) {
						// find left & right tiles
						const rightTile = props.tiles[1];
						// update 1st tile width
						if (leftTile.width !== gridPoint) {
							shouldUpdateWidths = true;
							leftTile.width = gridPoint;
						}

						// update 2nd tile width
						if (rightTile.width !== columnCount - gridPoint) {
							shouldUpdateWidths = true;
							rightTile.width = columnCount - gridPoint;
						}
					}

					if (props.tiles.length === 3 && props.order === 1) {
						if (props.tiles[0].width !== gridPoint) {
							props.tiles[0].width = gridPoint;
							shouldUpdateWidths = true;
						}
						if (props.tiles[1].width !== columnCount - props.tiles[0].width - props.tiles[2].width) {
							props.tiles[1].width = columnCount - props.tiles[0].width - props.tiles[2].width;
							shouldUpdateWidths = true;
						}
					}

					if (props.tiles.length === 3 && props.order === 2) {
						if (props.tiles[1].width !== gridPoint - props.tiles[0].width) {
							props.tiles[1].width = gridPoint - props.tiles[0].width;
							shouldUpdateWidths = true;
						}
						if (props.tiles[2].width !== columnCount - props.tiles[0].width - props.tiles[1].width) {
							props.tiles[2].width = columnCount - props.tiles[0].width - props.tiles[1].width;
							shouldUpdateWidths = true;
						}
					}

					if (shouldUpdateWidths) {
						setTomeData({ ...tomeData });
						// console.log(gridPoint, newHandleX);
					}
				}
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: handle1Hovered || handle1Panning ? 1 : 0,
				left: handleLeft,
			}}
			transition={transitions.layoutTransition}
			style={{
				top: handleTop,
				height: handleHeight,
				width: handleWidth,
			}}
		>
			<ResizeHandleMaterial
				style={{
					width: handleSize,
					backgroundColor: colors.z5,
				}}
			/>
		</ResizeHandle>
	);
};
