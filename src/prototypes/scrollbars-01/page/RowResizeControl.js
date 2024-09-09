import React, { useContext, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";


import { colors } from "../ds/Colors";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../../../ds/Transitions";
import { tileNames } from "./TileConstants";

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
	const { pageMargin, minPageHeight, rowHeight, rowMargin, rowMinHeight, rowCount, scale } =
		useContext(MetricsContext).metrics;
	const { setTomeData, tomeData, setRowResizing, rowResizing, setSelectedTile, selectedTile, isTileAnimating, isPlayMode } =
		useContext(TomeContext);

	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	const handleSize = metricConstants.cTileResizeHandleSize;

	const mouseY = useMotionValue(0);

	let handleTop = rowHeight * props.row.height + rowMargin * props.row.height + props.pageTop;

	if (props.row.order !== 1) {
		props.rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < props.row.order) {
				handleTop += r.height === 0 ? minPageHeight - pageMargin * 1 : rowHeight * r.height + rowMargin * r.height;
			}
		});
	}

	const updateCursor = (rowHeight) => {
		if (props.tiles.length === 1) {
			if (rowHeight === props.tiles[0].height12) {
				document.body.style.cursor = "s-resize";
			} else {
				document.body.style.cursor = "ns-resize";
			}
		}

		if (props.tiles.length === 2) {
			if (rowHeight === props.tiles[0].height6 || rowHeight === props.tiles[1].height6) {
				document.body.style.cursor = "s-resize";
			} else {
				document.body.style.cursor = "ns-resize";
			}
		}
	};

	useLayoutEffect(() => {
		/*
		if (handlePanning) {

			const yFromBottom = window.innerHeight - (mouseY.get() - document.body.scrollTop);
			// console.log("scroll!!!", yFromBottom, mouseY.get(), window.innerHeight)
			//window.innerHeight
			if (yFromBottom < 120) {
				// console.log("scroll!!!", yFromBottom, mouseY.get())
				window.scroll({
					top: document.body.scrollHeight,
					behavior: "smooth", // 👈
				});
			}
			
		}
		*/
		
	}, [rowResizing, tomeData]);

	return (
		<ResizeHandle
			onHoverStart={
				isTileAnimating || isPlayMode
					? null
					: (event, info) => {
							updateCursor(props.row.height);
							setHandleHovered(true);
					  }
			}
			onHoverEnd={(event, info) => {
				if (!handlePanning) document.body.style.cursor = "auto";
				setHandleHovered(false);
			}}
			onPanStart={(event, info) => {
				if (isPlayMode) return false;
				setHandlePanning(true);
			}}
			onPointerDown={(event, info) => {
				if (isPlayMode) return false;
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
				if (isPlayMode) return false;

				mouseY.set(info.point.y)
				// for this row, find the gridpoint of the pointer position
				let y = info.point.y - props.pageTop;
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
				//console.log(totalRowHeights, gridPoint, totalRowHeights + gridPoint);
				if (gridPoint < rowMinHeight) gridPoint = rowMinHeight;
				if (totalRowHeights + gridPoint <= rowCount) {
					return false;
				}
				if (props.row.height !== gridPoint) {
					// are there text tiles in the row
					// with content heights taller than the gridPoint?
					if (props.tiles[0]) {
						const leftTile = props.tiles[0];
						if (leftTile.type === tileNames.TEXT.name) {
							if (leftTile.width === 6) {
								if (leftTile.height6) {
									if (leftTile.height6 > gridPoint) {
										return false;
									}
								}
							}
							if (leftTile.width === 12) {
								if (leftTile.height12) {
									if (leftTile.height12 > gridPoint) {
										return false;
									}
								}
							}
						}
					}
					if (props.tiles[1]) {
						const rightTile = props.tiles[1];
						if (rightTile.type === tileNames.TEXT.name) {
							if (rightTile.width === 6) {
								if (rightTile.height6) {
									if (rightTile.height6 > gridPoint) {
										return false;
									}
								}
							}
							if (rightTile.width === 12) {
								if (rightTile.height12) {
									if (rightTile.height12 > gridPoint) {
										return false;
									}
								}
							}
						}
					}

					updateCursor(gridPoint);

					// it's safe to update the row height
					props.row.height = gridPoint;
					props.row.flexHeight = false;
					setTomeData({ ...tomeData });
				}
				//}
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
					borderRadius: handleSize / 2,
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
