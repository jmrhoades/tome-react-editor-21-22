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

const ResizeHandleMaterialTargetArea = styled(motion.div)`
	position: absolute;
	top: 0;
	bottom: 0;

	transform: translate(-50%, 0%);
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
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
	const { tomeData, setTomeData, tileResizing, setTileResizing } = useContext(TomeContext);

	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

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
	const resizeWidthHandleWidth = metricConstants.cResizeWidthHandleWidth;

	return (
		<ResizeHandle
			onHoverStart={(event, info) => {
				if (!tileResizing) {
					document.body.style.cursor = "ew-resize";
					setHandleHovered(true);
				}
			}}
			onHoverEnd={(event, info) => {
				if (!handlePanning) document.body.style.cursor = "auto";
				setHandleHovered(false);
			}}
			onPanStart={(event, info) => {
				// sort tiles array by tile left position
				// currentPage.tiles.sort((a, b) => a.left - b.left);

				setHandlePanning(true);
				setTileResizing(true);
				// if (selectedTile) setSelectedTile(null);
			}}
			onPanEnd={(event, info) => {
				document.body.style.cursor = "auto";
				setHandlePanning(false);
				setTileResizing(false);
				setHandleHovered(false);
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
				opacity: handleHovered || handlePanning ? 0 : 0,
				left: handleLeft,
			}}
			transition={transitions.layoutTransition}
			style={{
				top: handleTop,
				height: handleHeight,
				width: handleWidth,
			}}
		>
			<ResizeHandleMaterialTargetArea
				style={{
					width: 24,
					backgroundColor: colors.z1,
					opacity: 1,
				}}
			/>
			<ResizeHandleMaterial
				animate={{
					backgroundColor: handlePanning ? colors.accent : colors.white,
				}}
				style={{
					width: resizeWidthHandleWidth,
					height: 60,
					borderRadius: 4,

					boxShadow: `0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
		0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
		0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)`,
				}}
			/>
		</ResizeHandle>
	);
};
