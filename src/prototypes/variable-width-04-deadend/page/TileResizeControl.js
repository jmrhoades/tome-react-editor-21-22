import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
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
`;

export const TileResizeControl = props => {
	const { metrics } = useContext(MetricsContext);

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
	} = metrics;
	const { tomeData, setTomeData, setRowResizing, rowResizing, isPlayMode } = useContext(TomeContext);

	const [handleDown, setHandleDown] = useState(false);
	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	
	const handleRef = useRef(null);
	const handleMatrialRef = useRef(null);


	const indicatorY = useMotionValue(0);
	const mouseDownY = useMotionValue(0);
	const clientY = useMotionValue(0);
	const handleYPercent = useMotionValue(0);
	const saveRowHeight = useMotionValue(0);


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
	
	const leftTile = props.tiles[0];
	const rightTile = props.tiles[1];
	let cachedHeight = 0;
	if (saveRowHeight.get() > 0) {
		cachedHeight = rowHeight * saveRowHeight.get() + rowMargin * (saveRowHeight.get() - 1);
	}

	

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
		indicatorY.set(rect.height / 2);
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

		handleColor.set(colors.handleActive);

		const rect = handleRef.current.getBoundingClientRect();
		const materialRect = handleMatrialRef.current.getBoundingClientRect();

		
		clientY.set(e.clientY);
		indicatorY.set(e.clientY);
		mouseDownY.set(e.clientY - rect.y + handleTop);
		//console.log("e.clientY", e.clientY, rect.y, pageScrollY.get() );

		let per = (e.clientY - materialRect.y) / materialRect.height;
		//per = e.clientY / window.innerHeight;
		if (per < 0) per = 0;
		if (per > 1) per = 1;
		handleYPercent.set(per);
		saveRowHeight.set(props.row.height);

		props.row.isResizingWidth = true;
		
		props.row.tempPageHeight = props.row.height + "";
		console.log(props.row.tempPageHeight)

		props.row.handleYPercent = handleYPercent.get();
		props.row.indicatorY =  indicatorY.get();
		props.row.indicatorX = handleLeft + (columnGutter * scale) / 2;
		props.row.warningMinWidthColor = warningMinWidthColor;
		props.row.warningMaxWidthColor = warningMaxWidthColor;
		props.row.cachedScrollY = props.pageScrollY;

		// cache current row height if flexHeight = true
		if (props.row.flexHeight) props.row.cacheHeight = props.row.height;

		setRowResizing(props.row);

		playStartSound();
		
		console.log(rect.y, e.clientY, handleYPercent.get());

		document.body.classList.add("nocursor");

	};

	const mouseUp = e => {
		onEnd();
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

				// If any in tile the row has contentUnitHeights
				// Use the bigger height value for the new row height
				let newHeight = 0;
				props.tiles.forEach(t => {
					if (t.contentUnitHeights && t.contentUnitHeights[t.width] && t.contentUnitHeights[t.width] > newHeight) {
						newHeight = t.contentUnitHeights[t.width];
					}
				});
				/*
				// If the new height is smaller the flexHeight, ignore
				if (props.row.flexHeight && props.row.cacheHeight > newHeight) {
					props.row.height = props.row.cacheHeight;
					newHeight = 0;
				}
				*/

				// If there's been a change in row height
				// Make sure new heights add up to at least 12u
				if (newHeight > 0) {
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

				const sHeight = rowHeight * saveRowHeight.get() + rowMargin * (saveRowHeight.get() - 1);
				const nHeight = rowHeight * props.row.height + rowMargin * (props.row.height - 1);

				//props.animatePageYForWidthChange(sHeight-nHeight, handleYPercent.get());	


				const newScrollY = rowResizing.cachedScrollY + ((sHeight-nHeight) * handleYPercent.get());
				props.setPageScrollY(newScrollY)


				console.log("SET DATA", saveRowHeight.get(), sHeight, props.row.height, nHeight, cachedHeight, rHeight);
				//console.log("SET DATA", gridPoint, props.row.height);
			}
		}
	};

	const panEnd = e => {
		setHandlePanning(false);
		onEnd();
	};

	const onEnd = () => {
		//console.log("onEnd");

		//pageScrollY.set(getPageTop(props.page));

		props.row.isResizingWidth = undefined;
		if (props.row.height > props.row.cacheHeight) props.row.flexHeight = false;
		props.row.cacheHeight = undefined;
		props.row.cachedScrollY = undefined;
		setHandleDown(false);
		setRowResizing(null);
		handleColor.set(colors.handle);

		document.body.classList.remove("nocursor");
	};

	const checkIndicatorPosition = () => {
		//const rect = handleRef.current.getBoundingClientRect();
		//let newY = clientY.get() - rect.y;
		//mouseDownY.set(newY);
		//indicatorY.set(newY);

		//const h = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
		//console.log("window.pageYOffset", window.pageYOffset);

		//let pageHeight = getPageHeight(props.page);
		//const heightDifference = pageHeight - rowResizing.tempPageHeight;
		//animate(indicatorY, mouseDownY.get() + heightDifference, transitions.layoutTransition);
		//indicatorY.set(mouseDownY.get() + heightDifference * rowResizing.handleYPercent);
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
				y: handleTop,
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
				ref={handleMatrialRef}
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
		</ResizeHandle>
	);
};
