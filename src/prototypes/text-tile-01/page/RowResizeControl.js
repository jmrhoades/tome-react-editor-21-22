import React, { useContext, useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import useSound from "use-sound";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";
import { tileNames } from "./TileConstants";

import tile_resize_sound from "../../../sounds/click_01.mp3";
import tile_resize_start_sound from "../../../sounds/action_01.mp3";

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

const Indicator = styled(motion.div)`
	position: absolute;
	/* left: 50%; */
	/* transform: translateX(-50%); */
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px;
	gap: 6px;
	border-radius: 8px;
	min-width: 40px;
	text-align: center;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
`;
const Separator = styled(motion.div)`
	width: 1px;
	height: 16px;
	border-radius: 2px;
`;

const IconLabelGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 4px;
`;

export const RowResizeHandle = props => {
	const { pageMargin, minPageHeight, rowHeight, rowMargin, rowMinHeight, rowCount, scale, tileCornerRadius } =
		useContext(MetricsContext).metrics;
	const {
		setTomeData,
		tomeData,
		setRowResizing,
		rowResizing,
		setSelectedTile,
		selectedTile,
		isTileAnimating,
		isPlayMode,
		setShowContextMenu,
		setContextMenuInfo,
	} = useContext(TomeContext);

	const [handleDown, setHandleDown] = useState(false);
	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);
	const handleRef = useRef(null);

	const handleSize = metricConstants.cTileResizeHandleSize * scale;

	const [playSound] = useSound(tile_resize_sound);
	const [playStartSound] = useSound(tile_resize_start_sound);

	const mouseY = useMotionValue(0);
	const indicatorX = useMotionValue(0);

	let handleTop = rowHeight * props.row.height + rowMargin * props.row.height + props.pageTop - 10;

	const indicatorRef = useRef(null);

	if (props.row.order !== 1) {
		props.rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < props.row.order) {
				handleTop += r.height === 0 ? minPageHeight - pageMargin * 1 : rowHeight * r.height + rowMargin * r.height;
			}
		});
	}

	const updateCursor = rowHeight => {
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
				isTileAnimating || isPlayMode || rowResizing
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
				document.body.classList.add("nocursor");
			}}
			onMouseDown={e => {
				setHandleDown(true);
				if (isPlayMode) return false;
				props.row.isResizingHeight = true;
				setRowResizing(props.row);
				playStartSound();
				const rect = handleRef.current.getBoundingClientRect();
				const newX = e.clientX - rect.x;
				indicatorX.set(newX);
				document.body.classList.add("nocursor");
				//if (selectedTile) setSelectedTile(null);
			}}
			onMouseUp={e => {
				setHandleDown(false);
				props.row.isResizingHeight = undefined;
				setRowResizing(null);
				document.body.classList.remove("nocursor");
			}}
			onPanEnd={(event, info) => {
				setHandleDown(false);
				document.body.style.cursor = "auto";
				props.row.isResizingHeight = undefined;
				setHandlePanning(false);
				setHandleHovered(false);
				setRowResizing(null);
				document.body.classList.remove("nocursor");
			}}
			onPan={(event, info) => {
				if (isPlayMode) return false;

				mouseY.set(info.point.y);
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
				if (totalRowHeights + gridPoint < rowCount) {
					return false;
				}

				if (props.row.height !== gridPoint) {
					// are there text tiles in the row
					// with content heights taller than the gridPoint?
					if (props.tiles[0]) {
						const leftTile = props.tiles[0];
						if (leftTile.type === tileNames.TEXT.name) {
							if (leftTile.contentHeight > gridPoint) {
								return false;
							}
						}
					}
					if (props.tiles[1]) {
						const rightTile = props.tiles[1];
						if (rightTile.type === tileNames.TEXT.name) {
							if (rightTile.contentHeight > gridPoint) {
								return false;
							}
						}
					}

					updateCursor(gridPoint);

					// it's safe to update the row height
					props.row.height = gridPoint;
					//props.row.flexHeight = false;
					setTomeData({ ...tomeData });
					playSound();
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
				height: rowMargin + 20,
				right: pageMargin,
				left: pageMargin,
				cursor: handleHovered || handlePanning ? "ns-resize" : "auto",
			}}
			className={"handle"}
			initial={false}
			onContextMenu={e => {
				//console.log("right click!", e);
				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
					items: ["Paste"],
				});
				setShowContextMenu(true);
				e.preventDefault();
			}}
		>
			<ResizeHandleMaterial
				ref={handleRef}
				style={{
					height: handleSize,
					//width: `calc(100% - ${tileCornerRadius * 2}px)`,
					width: "100%",
					borderRadius: handleSize / 2,
					x: "-50%",
					y: "-50%",
				}}
				animate={{
					backgroundColor: rowResizing
						? props.page.theme.colors.controls.resize.handleActive
						: props.page.theme.colors.controls.resize.handle,
				}}
				transition={handleDown ? transitions.layoutTransition : transitions.instant}
			/>

			{props.page.theme.colors.controls.resize.indicatorLarge &&
				props.page.theme.colors.controls.resize.indicatorShow && (
					<Indicator
						ref={indicatorRef}
						initial={false}
						animate={{
							opacity: handleDown ? 1 : 0,
							scale: handleDown ? 1 : 0,
							//y: ((rHeight - (rHeight - 120)) / 2) + ((rHeight - 120) / 2) - (32/2)
						}}
						transition={handleDown ? transitions.basic : transitions.instant}
						style={{
							background: props.page.theme.colors.controls.resize.indicatorBackground,
							color: props.page.theme.colors.controls.resize.indicatorForeground,
							boxShadow: props.page.theme.shadows.small,
							backdropFilter: "blur(50px)",
							top: "50%",
							y: -18,
							x: indicatorX,
							// x: "-50%",
						}}
					>
						<IconLabelGroup style={{ opacity: props.row.height > rowMinHeight ? 1 : 0.4 }}>
							{props.row.height}
						</IconLabelGroup>
					</Indicator>
				)}
		</ResizeHandle>
	);
};
