import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../../../ds/Transitions";

const ResizeHandle = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
	z-index: 9999;
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 7.5%;
	right: 7.5%;
	top: 50%;
	transform: translateY(-50%);
	border-radius: 2px;
`;

export const RowResizeHandle = props => {
	const { pageTop, pageWidth, pageMargin, minPageHeight, rowHeight, rowMargin, rowMinHeight, rowCount } =
		useContext(MetricsContext).metrics;
	const { setTomeData, tomeData, setTileResizing, setSelectedTile, selectedTile } = useContext(TomeContext);

	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	const handleSize = metricConstants.cInsertTileHandleSize;

	let handleTop = rowHeight * props.row.height + rowMargin * props.row.height;

	if (props.row.order !== 1) {
		props.rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < props.row.order) {
				handleTop += r.height === 0 ? minPageHeight - pageMargin * 1 : rowHeight * r.height + rowMargin * r.height;
			}
		});
	}

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
				setHandlePanning(true);
				setTileResizing(true);
				if (selectedTile) setSelectedTile(null);
			}}
			onPanEnd={(event, info) => {
				document.body.style.cursor = "auto";
				setHandlePanning(false);
				setHandleHovered(false);
				setTileResizing(false);
			}}
			onPan={(event, info) => {
				// for this row, find the gridpoint of the pointer position
				let y = info.point.y - pageTop;
				let totalRowHeights = 0;
				props.rows.forEach(r => {
					if (r.order < props.row.order) {
						y -= rowHeight * r.height + rowMargin * r.height;
					}
				});
				props.rows.forEach(r => {
					if (r.id !== props.row.id) {
					totalRowHeights += r.height;
					}
				});
				let gridPoint = Math.round(y / (rowHeight + rowMargin));
				// console.log(totalRowHeights, gridPoint, totalRowHeights + gridPoint);
				if (gridPoint < rowMinHeight) gridPoint = rowMinHeight;
				if (totalRowHeights + gridPoint >= rowCount) {
					if (props.row.height !== gridPoint) {
						props.row.height = gridPoint;
						props.row.flexHeight = false;
						setTomeData({ ...tomeData });
						// console.log(gridPoint);
					}
				}
			}}
			transition={{
				opacity: {
					delay: handleHovered ? 0.3 : 0,
					duration: 0.2,
					type: "tween",
				},
				default: transitions.layoutTransition,
			}}
			animate={{
				opacity: handleHovered || handlePanning ? 1 : 0,
				y: handleTop,
			}}
			style={{
				height: rowMargin,
				width: pageWidth,
			}}
			className={"handle"}
		>
			<ResizeHandleMaterial
				style={{
					height: handleSize,
				}}
				animate={{
					backgroundColor: colors.z5,
				}}
			/>
		</ResizeHandle>
	);
};
