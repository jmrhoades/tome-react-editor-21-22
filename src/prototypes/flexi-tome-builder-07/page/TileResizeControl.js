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
	top: 50%;
	left: 50%;
`;

export const TileResizeControl = props => {
	const {
		pageWidth,
		pageLeft,
		pageMargin,
		minPageHeight,
		columnCount,
		columnWidth,
		columnGutter,
		rowHeight,
		rowMargin,
		scale,
		columnMinWidth,
		columnMaxWidth,
	} = useContext(MetricsContext).metrics;
	const { tomeData, setTomeData, setRowResizing, rowResizing, setSelectedTile, selectedTile } =
		useContext(TomeContext);

	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	const handleWidth = pageMargin;

	//const offset = pageLeft - handleWidth / 2;
	// console.log(props.tiles[0].order, props.tiles[1].order)

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
	const handleSize = metricConstants.cTileResizeHandleSize;

	return (
		<ResizeHandle
			onHoverStart={(event, info) => {
				if (rowResizing === null) {
					document.body.style.cursor = "ew-resize";
					setHandleHovered(true);
				}
			}}
			onHoverEnd={(event, info) => {
				if (!handlePanning) document.body.style.cursor = "auto";
				setHandleHovered(false);
			}}
			onPointerDown={(event, info) => {
				setRowResizing(props.row);
				if (selectedTile) setSelectedTile(null);
			}}
			onPointerUp={(event, info) => {
				setRowResizing(null);
			}}
			onPanStart={(event, info) => {
				// sort tiles array by tile left position
				// currentPage.tiles.sort((a, b) => a.left - b.left);
				setHandlePanning(true);
			}}
			onPanEnd={(event, info) => {
				document.body.style.cursor = "auto";
				setHandlePanning(false);
				setRowResizing(null);
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
						if (gridPoint > columnMaxWidth) gridPoint = columnMaxWidth;
						

						// find left & right tiles
						const leftTile = props.tiles[0];
						const rightTile = props.tiles[1];
						// let lW = leftTile.width;
						// let rW = rightTile.width;

						//console.log("gridPoint", gridPoint, leftTile.width, rightTile.width)
						
						
						// update 1st tile width
						if (leftTile.width !== gridPoint) {
							leftTile.width = gridPoint;
							shouldUpdateWidths = true;
						}
						// update 2nd tile width
						if (rightTile.width !== columnCount - gridPoint) {
							rightTile.width = columnCount - gridPoint;
							shouldUpdateWidths = true;
						}
						
						

						/*
						if (gridPoint >= 10) {
							leftTile.width = columnCount;
							rightTile.width = 0;
						}
						if (gridPoint <= 2) {
							leftTile.width = 0;
							rightTile.width = columnCount;
						}
						if (leftTile.width !== lW) {
							leftTile.width = lW;
							shouldUpdateWidths = true;
						}
						if (rightTile.width !== rW) {
							rightTile.width = rW;
							shouldUpdateWidths = true;
						}
						*/

					}

					if (shouldUpdateWidths) {
						setTomeData({ ...tomeData });
						//console.log("SET DATA", gridPoint);
					}
				}
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: handleHovered || handlePanning ? 1 : 0,
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
				animate={{
					backgroundColor: rowResizing ? colors.white40 : colors.z5,
				}}
				transition={{
					duration: 0.1,
				}}
				style={{
					height: "75%",
					width: handleSize,
					borderRadius: handleSize / 2,
					x: "-50%",
					y: "-50%",
					scale: scale,
				}}
			/>
		</ResizeHandle>
	);
};
