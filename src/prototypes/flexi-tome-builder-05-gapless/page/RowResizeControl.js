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

const ResizeHandleMaterialTargetArea = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	transform: translate(0%, -50%);
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const RowResizeHandle = props => {
	const { pageTop, pageMargin, minPageHeight, rowHeight, rowMargin, rowMinHeight, rowCount } =
		useContext(MetricsContext).metrics;
	const { setTomeData, tomeData, setTileResizing } = useContext(TomeContext);

	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	const resizeHeightHandleHeight = metricConstants.cResizeHeightHandleHeight;

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
				// if (selectedTile) setSelectedTile(null);
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
				opacity: handleHovered || handlePanning ? 0 : 0,
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
			<ResizeHandleMaterialTargetArea 
				style={{
					height: 24,
					backgroundColor: colors.z1,
					opacity: 1,
				}}
			/>
			<ResizeHandleMaterial
				animate={{
					backgroundColor: handlePanning ? colors.accent : colors.white,
				}}
				style={{
					width: 60,
					height: resizeHeightHandleHeight,
					borderRadius: 4,
					boxShadow: `0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
		0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
		0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)`,
				}}
			/>
		</ResizeHandle>
	);
};
