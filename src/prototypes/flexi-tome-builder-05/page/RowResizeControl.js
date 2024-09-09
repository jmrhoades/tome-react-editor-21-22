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
	pointer-events: auto;
	z-index: 9999;
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 50%;
	top: 50%;
`;

export const RowResizeHandle = props => {
	const { pageTop, pageMargin, minPageHeight, rowHeight, rowMargin, rowMinHeight, rowCount, scale } =
		useContext(MetricsContext).metrics;
	const { setTomeData, tomeData, setRowResizing, rowResizing, setSelectedTile, selectedTile } = useContext(TomeContext);

	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	const handleSize = metricConstants.cTileResizeHandleSize;

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
			}}
			onPointerDown={(event, info) => {
				setRowResizing(props.row);
				if (selectedTile) setSelectedTile(null);
			}}
			onPointerUp={(event, info) => {
				setRowResizing(null);
			}}
			onPanEnd={(event, info) => {
				document.body.style.cursor = "auto";
				setHandlePanning(false);
				setHandleHovered(false);
				setRowResizing(null);
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
						
					}
				}
			}}
			transition={{
				opacity: {
					delay: handleHovered ? 0 : 0,
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
				right: pageMargin,
				left: pageMargin,
			}}
			className={"handle"}
			initial={false}
		>
			<ResizeHandleMaterial
				style={{
					height: handleSize,
					width: "75%",
					borderRadius: handleSize/2,
					x: "-50%",
					y: "-50%",
					scale: scale,
				}}
				animate={{
					backgroundColor: rowResizing ? colors.white40 : colors.z5,
				}}
				transition={{
					duration: 0.1,
				}}
			/>
		</ResizeHandle>
	);
};
