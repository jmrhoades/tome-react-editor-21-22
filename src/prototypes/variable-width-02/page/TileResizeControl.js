import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue, animate } from "framer-motion";
import useSound from "use-sound";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

import tile_resize_sound from "../../../sounds/click_01.mp3";
import tile_resize_start_sound from "../../../sounds/action_01.mp3";

const ResizeHandle = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	z-index: 9999;
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	overflow: hidden;
	transition: background-color 0.2s linear;
`;

const Indicator = styled(motion.div)`
	position: absolute;
`;

const IndicatorGroup = styled(motion.div)`
	position: absolute;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 0;
	gap: 6px;
	border-radius: 8px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
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
	gap: 4px;
	&.left {
		padding-left: 8px;
	}
	&.right {
		padding-right: 8px;
	}
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
		tileCornerRadius,
	} = useContext(MetricsContext).metrics;
	const { tomeData, setTomeData, setRowResizing, rowResizing, isPlayMode } = useContext(TomeContext);

	const [handleDown, setHandleDown] = useState(false);
	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	/*
	Colors
	*/
	const colors = {};
	colors.handle = props.page.theme.colors.controls.resize.handle;
	colors.handleActive = props.page.theme.colors.controls.resize.handleActive;
	colors.handleWarning = props.page.theme.colors.controls.resize.handleWarning;
	colors.indicatorForeground = props.page.theme.colors.controls.resize.indicatorForeground;
	colors.indicatorWarning = props.page.theme.colors.controls.resize.indicatorWarning;
	const handleColor = useMotionValue(colors.handle);
	const warningMinWidthColor = useMotionValue(colors.indicatorForeground);
	const warningMaxWidthColor = useMotionValue(colors.indicatorForeground);

	/*
	Sound Effects
	*/
	const [playSound] = useSound(tile_resize_sound);
	const [playStartSound] = useSound(tile_resize_start_sound);

	/*
	Tiles
	*/
	const firstTile = props.tiles[0];
	let handleLeft = pageMargin + columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
	if (props.order === 2) {
		const secondTile = props.tiles[1];
		handleLeft += columnGutter + columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
	}

	/*
	Handle Y
	*/
	let handleTop = pageMargin + props.pageTop;
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
	Handle Width & X
	*/
	const handleWidth = columnGutter + 20 * scale;
	const handleOffset = -10 * scale;

	/*
	Handle Height
	*/
	const handleSize = metricConstants.cTileResizeHandleSize * scale;
	const rHeight = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	const handleRef = useRef(null);
	const leftTile = props.tiles[0];
	const rightTile = props.tiles[1];

	const indicatorY = useMotionValue(0);
	const mouseDownY = useMotionValue(0);
	const clientY = useMotionValue(0);
	//const indicatorYPercent = useMotionValue(0);
	const saveRowHeight = useMotionValue(0);

	/*
	Matching size
	*/
	let matchingSize = false;
	if (
		rowResizing &&
		rowResizing.id !== props.row.id &&
		rowResizing.tiles[0].width === props.row.tiles[0].width &&
		rowResizing.isResizingWidth
	) {
		matchingSize = true;
		const rect = handleRef.current.getBoundingClientRect();
		indicatorY.set(rect.height/2)
		warningMinWidthColor.set(colors.indicatorForeground);
		warningMaxWidthColor.set(colors.indicatorForeground);
	}

	/*
	Event Handlers
	*/
	const mouseDown = e => {
		//console.log("onMouseDown");
		setHandleDown(true);
		if (isPlayMode) return false;
		props.row.isResizingWidth = true;
		setRowResizing(props.row);
		handleColor.set(colors.handleActive);

		const rect = handleRef.current.getBoundingClientRect();
		let newY = e.clientY - rect.y;
		clientY.set(e.clientY);
		indicatorY.set(newY);
		mouseDownY.set(newY);
		console.log("e.clientY", e.clientY);
		//indicatorYPercent.set(newY / rect.height);
		saveRowHeight.set(rHeight);

		playStartSound();
		//console.log(rect.y, e.clientY, newY, newY / rect.height);

		document.body.classList.add("nocursor");
		document.body.classList.add("noscroll");
		document.documentElement.classList.add("noscroll");
	};

	const mouseUp = e => {
		//console.log("onMouseUp");
		props.row.isResizingWidth = undefined;
		setHandleDown(false);
		setRowResizing(null);
		handleColor.set(colors.handle);

		document.body.classList.remove("nocursor");
		document.body.classList.remove("noscroll");
		document.documentElement.classList.remove("noscroll");
	};

	const hoverStart = e => {
		if (rowResizing === null && isPlayMode === false) {
			document.body.style.cursor = "ew-resize";
			setHandleHovered(true);
		}
	};

	const hoverEnd = e => {
		if (!handlePanning) document.body.style.cursor = "auto";
		setHandleHovered(false);
	};

	const panStart = e => {
		setHandlePanning(true);
	};

	const pan = (event, info) => {
		// console.log(info.point.x)
		const x = info.point.x;
		if (x >= pageLeft && x <= pageLeft + pageWidth) {
			let shouldUpdateWidths = false;
			// what 12-col grid point is the pointer closest to?
			let gridPoint = Math.round((x - pageLeft - pageMargin) / (columnWidth + columnGutter));

			if (props.tiles.length === 2) {
				if (gridPoint < columnMinWidth) {
					gridPoint = columnMinWidth;
					//
					handleColor.set(colors.handleWarning);
					warningMinWidthColor.set(colors.indicatorWarning);
					warningMaxWidthColor.set(colors.indicatorForeground);
				} else if (gridPoint > columnMaxWidth) {
					gridPoint = columnMaxWidth;
					//
					handleColor.set(colors.handleWarning);
					warningMinWidthColor.set(colors.indicatorForeground);
					warningMaxWidthColor.set(colors.indicatorWarning);
				} else {
					handleColor.set(colors.handleActive);
					warningMinWidthColor.set(colors.indicatorForeground);
					warningMaxWidthColor.set(colors.indicatorForeground);
				}

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

				let newHeight = false;
				if (leftTile.contentUnitHeights && leftTile.contentUnitHeights[leftTile.width]) {
					newHeight = leftTile.contentUnitHeights[leftTile.width];
				}
				if (rightTile.contentUnitHeights) {
					if (newHeight && newHeight < rightTile.contentUnitHeights[rightTile.width]) {
						newHeight = rightTile.contentUnitHeights[rightTile.width];
					} else if (newHeight === false) {
						newHeight = rightTile.contentUnitHeights[rightTile.width];
					}
				}
				if (newHeight) {
					let totalRowHeights = 0;
					props.rows.forEach(r => {
						if (r.id !== props.row.id) {
							totalRowHeights += r.height;
						}
					});
					//console.log(totalRowHeights, newHeight, rowMinHeight);
					if (totalRowHeights + newHeight < metricConstants.cRowCount) {
						props.row.height = metricConstants.cRowCount - totalRowHeights;
					} else {
						props.row.height = newHeight;
					}
				}
			}

			if (shouldUpdateWidths) {
				// See if indicator is going to go off the handle
				checkIndicatorPosition();
				playSound();
				setTomeData({ ...tomeData });
				//console.log("SET DATA", gridPoint);
			}
		}
	};

	const panEnd = e => {
		setHandlePanning(false);
		setRowResizing(null);
		setHandleDown(false);

		props.row.isResizingWidth = undefined;
		handleColor.set(colors.handle);

		document.body.classList.remove("nocursor");
		document.body.classList.remove("noscroll");
		document.documentElement.classList.remove("noscroll");
	};

	const checkIndicatorPosition = () => {

		const rect = handleRef.current.getBoundingClientRect();
		let newY = clientY.get() - rect.y;
		mouseDownY.set(newY);
		//indicatorY.set(newY);

		const h = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
		console.log("window.pageYOffset", window.pageYOffset);

		if (mouseDownY.get() > h) {
			console.log("too far down");
			animate(indicatorY, h, transitions.layoutTransition);
			//indicatorY.set(h);
		} else {
			console.log("revert");
			animate(indicatorY, mouseDownY.get(), transitions.layoutTransition);
			//indicatorY.set(mouseDownY.get());
		}
	};

	return (
		<ResizeHandle
			ref={handleRef}
			style={{
				height: rHeight,
				width: handleWidth,
			}}
			animate={{
				x: handleLeft + handleOffset,
				top: handleTop,
			}}
			transition={transitions.layoutTransition}
			onMouseDown={mouseDown}
			onMouseUp={mouseUp}
			onHoverStart={hoverStart}
			onHoverEnd={hoverEnd}
			onPanStart={panStart}
			onPanEnd={panEnd}
			onPan={pan}
		>
			<ResizeHandleMaterial
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: handleHovered || handlePanning || handleDown || matchingSize ? 1 : 0,
					height: rHeight - tileCornerRadius * 2,
					y: tileCornerRadius,
				}}
				transition={transitions.layoutTransition}
				style={{
					backgroundColor: handleColor,
					width: handleSize,
					borderRadius: handleSize / 2,
					x: (handleWidth - handleSize) / 2,
				}}
			/>
			<Indicator
				style={{
					width: handleWidth,
					y: indicatorY,
				}}
			>
				<IndicatorGroup
					initial={false}
					animate={{
						opacity: handleDown ? 1 : 0,
						scale: handleDown ? 1 : 0,
					}}
					transition={handleDown ? transitions.basic : transitions.instant}
					style={{
						background: props.page.theme.colors.controls.resize.indicatorBackground,
						boxShadow: props.page.theme.shadows.small,
						// backdropFilter: "blur(50px)",
						left: "50%",
						x: "-50%",
						y: "-50%",
						paddingLeft: 4,
						paddingRight: 4,
					}}
				>
					<IconLabelGroup
						className="left"
						style={{
							color: warningMinWidthColor,
							//opacity: matchingSize ? 0.4 : 1,
						}}
					>
						{leftTile.width}
					</IconLabelGroup>
					<Separator
						style={{
							backgroundColor: props.page.theme.colors.t2,
						}}
					/>
					<IconLabelGroup
						className="right"
						style={{
							color: warningMaxWidthColor,
							//opacity: matchingSize ? 0.4 : 1,
						}}
					>
						{rightTile.width}
					</IconLabelGroup>
				</IndicatorGroup>
			</Indicator>
		</ResizeHandle>
	);
};
