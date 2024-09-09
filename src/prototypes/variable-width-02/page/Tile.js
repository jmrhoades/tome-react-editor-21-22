import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import useSound from "use-sound";

import { colors } from "../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext, createRow } from "../tome/TomeContext";
//import { TileWidthIndicatorStatic } from "./GridIndicator";

import { tileNames } from "./TileConstants";
import { TileText } from "./TileText";
import { TileImage } from "./TileImage";
import { TileVideo } from "./TileVideo";
import { TileTable } from "./TileTable";
import { TileCode } from "./TileCode";
import { TileWeb } from "./TileWeb";
import { TileTwitter } from "./TileTwitter";
import { TileGiphy } from "./TileGiphy";
import { TileAirtable } from "./TileAirtable";
import { TileFigma } from "./TileFigma";
import tile_select_sound from "../../../sounds/button_39.mp3";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
`;

const WrapInner = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const TileContent = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* overflow: hidden; */
`;

const TileDraggingBackground = styled(TileContent)`
	pointer-events: none;
`;

const SelectedOutline = styled(TileContent)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-style: solid;
	opacity: 0;
`;

const HoverOutline = styled(SelectedOutline)`
	transition: opacity 0.3s ease-out;
`;

const Scrim = styled(motion.div)`
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;

	background: linear-gradient(
		270deg,
		rgba(20, 20, 20, 0.95) 0%,
		rgba(20, 20, 20, 0.949719) 0.03%,
		rgba(20, 20, 20, 0.947748) 0.24%,
		rgba(20, 20, 20, 0.9424) 0.8%,
		rgba(20, 20, 20, 0.931985) 1.9%,
		rgba(20, 20, 20, 0.914815) 3.7%,
		rgba(20, 20, 20, 0.8892) 6.4%,
		rgba(20, 20, 20, 0.853452) 10.16%,
		rgba(20, 20, 20, 0.805882) 15.17%,
		rgba(20, 20, 20, 0.7448) 21.6%,
		rgba(20, 20, 20, 0.668518) 29.63%,
		rgba(20, 20, 20, 0.575348) 39.44%,
		rgba(20, 20, 20, 0.4636) 51.2%,
		rgba(20, 20, 20, 0.331585) 65.1%,
		rgba(20, 20, 20, 0.177615) 81.3%,
		rgba(20, 20, 20, 0) 100%
	);
`;

export const Tile = ({ tile, pageTop, page }) => {
	const {
		currentPage,
		selectedTile,
		rowResizing,
		setTileDragging,
		setTomeData,
		tomeData,
		//tileDropInfo,
		//setTileDropInfo,
		showTileDropTarget,
		//setPanelName,
		//isTileAnimating,
		setIsTileAnimating,
		isPlayMode,
		setShowContextMenu,
		setContextMenuInfo,
		selectTile,
		tileHoveringId,
		contentTileHeightsList,
	} = useContext(TomeContext);
	const { metrics } = useContext(MetricsContext);
	const {
		pageLeft,
		pageWidth,
		tileCornerRadius,
		minPageHeight,
		columnWidth,
		columnGutter,
		pageMargin,
		rowHeight,
		rowMargin,
		scale,
		columnCount,
		tileBorderSize,
		dropIndicatorSize,
	} = metrics;

	const [playTileSelectSound] = useSound(tile_select_sound);

	const { cRowCount, cColumnCount } = metricConstants;

	// console.log(tomeData.newTileID, tile.id);

	// The states of a draggable, resizable tile:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING
	const isSelected = selectedTile && selectedTile.id === tile.id;
	const [isDragging, setIsDragging] = useState(false);

	//const [isHovering, setIsHovering] = useState(false);
	const isHovering = useMotionValue(0);

	const [isAnimating, setIsAnimating] = useState(false);

	const [tempWidth, setTempWidth] = useState(0);
	const [tempHeight, setTempHeight] = useState(0);
	const [tempXOffset, setTempXOffset] = useState(0);
	const [tempYOffset, setTempYOffset] = useState(0);
	const oldTileWidth = useMotionValue(0);
	const oldTileHeight = useMotionValue(0);
	const tempLayoutData = useRef(null);

	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	// const [runFrameLoop, setRunFrameLoop] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldSelectTile, setShouldSelectTile] = useState(false);

	// Use to set an offset for the scaled dragging tile
	const [dragStartOffsetLeft, setDragStartOffsetLeft] = useState(0.5);
	const [dragStartOffsetTop, setDragStartOffsetTop] = useState(0.5);
	// const dragStartOffsetX = useMotionValue(0);
	// const dragStartOffsetY = useMotionValue(0);

	// The rate at which boundary checking when dragging occurs
	//const [checkBoundariesThreshold, setCheckBoundariesThreshold] = useState(50);
	const checkBoundariesThreshold = 50;
	// Keep track of amount of time since last mouse move
	const timeSinceLastMove = useMotionValue(0);

	// The number of times a boundary condition must true
	// to warrant a change to the layout data
	// const boundarySuccess = 4;
	// const [boundarySuccessCount, setBoundarySuccessCount] = useState(0);

	// Explicit animations for the tile movement
	const tileAnimation = useAnimation();

	// Tile corner radius
	const borderRadius = tileCornerRadius;

	// other tiles in the same row & page
	const tiles = tomeData.tiles.filter(t => {
		return t.pageId === tile.pageId && t.rowId === tile.rowId;
	});
	tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

	// the row the tile is in
	let row = tomeData.rows.filter(r => {
		return r.id === tile.rowId;
	})[0];
	if (!row && tile.oldRow) row = tile.oldRow[0];

	// all the rows sorted by order
	let rows = tomeData.rows.filter(r => {
		return r.pageId === currentPage.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	if (tile.oldRows) rows = tile.oldRows;

	/*
	tileWidth
	*/
	let tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);
	if (tempWidth > 0) {
		tileWidth = columnWidth * tempWidth + columnGutter * (tempWidth - 1);
	}
	if (tileWidth <= 0) {
		console.log("OMG IM ZERO", tileWidth);
		tileWidth = columnWidth * 2 + columnGutter * (2 - 1);
	}

	/*
	tileLeft
	*/
	let tileLeft = pageMargin;
	// Set based on order
	if (tile.order === 1) {
		tileLeft = pageMargin;
	}
	if (tile.order === 2) {
		// const firstTile = tiles[0];
		const firstTile = tiles.filter(tile => {
			return tile.order === 1;
		})[0];
		const firstTileWidth = columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
		tileLeft = pageMargin + firstTileWidth + columnGutter;
		//tileLeft = pageWidth - pageMargin - tileWidth;
	}
	if (tile.order === 3) {
		// const firstTile = tiles[0];
		const firstTile = tiles.filter(tile => {
			return tile.order === 1;
		})[0];
		const secondTile = tiles.filter(tile => {
			return tile.order === 2;
		})[0];
		const firstTileWidth = columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
		const secondTileWidth = columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
		tileLeft = pageMargin + firstTileWidth + columnGutter + secondTileWidth + columnGutter;
		//tileLeft = pageWidth - pageMargin - tileWidth;
	}

	/*
	TileTop
	TODO = centralize this functions so other components can use them
	*/
	let tileTop = pageMargin + pageTop;
	if (row.order !== 1) {
		rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < row.order) {
				tileTop +=
					r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
				tileTop += rowMargin;
			}
		});
	}

	/*
	tileHeight
	*/
	let tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);
	if (tempHeight > 0) {
		tileHeight = rowHeight * tempHeight + rowMargin * (tempHeight - 1);
	}

	//console.log("Rendering", tile.id, tileWidth, tileHeight, row.height, row.id)

	/*
	Z-INDEX
	*/

	const zIndex = useMotionValue(0);
	useEffect(() => {
		if (isSelected) {
			zIndex.set(3);
		} else if (isDragging || isAnimating) {
			zIndex.set(2);
		} else if (isHovering) {
			zIndex.set(0);
		} else {
			zIndex.set(0);
		}
	}, [isSelected, isDragging, isHovering, isAnimating, zIndex]);

	/*
	Animate visual changes to tile when tome data changes
	*/
	useEffect(() => {
		const reset = () => {
			// console.log("DONE");
			setIsAnimating(false);
			tomeData.isTileAnimating = false;
		};
		const update = async () => {
			if (!isDragging) {
				await tileAnimation.start({
					y: tileTop,
					x: tileLeft,
					scaleX: 1,
					scaleY: 1,
					opacity: 1,
				});
				return await reset();
			} else {
				tileAnimation.start({
					//scaleX: 0.75,
					//scaleY: 0.75,
					//opacity: 0.75,
				});
			}
		};
		update();
		//console.log("UPDATE!!!")
	}, [tomeData, tileAnimation, tileTop, tileLeft, tileWidth, tileHeight, isDragging, setIsTileAnimating]);

	// useEffect(() => {
	// 	if (!rowResizing) {
	// 		isHovering.set(0);
	// 	}
	// }, [rowResizing, isHovering]);

	/*
		Frame loop handler for
		responding dragging tile position changes
		at just the right time
	*/

	/*
	const requestIdRef = useRef(null);
	const tick = () => {
		if (!runFrameLoop) return;
		//console.log(pointerX.get(), pointerY.get(), runFrameLoop);
		requestAnimationFrame(tick);
	};
	useEffect(() => {
		let timerId = 0;
		if (runFrameLoop) {
			timerId = setInterval(() => {
				// console.log("Setting up a new interval")
				onTileRearrangeDrag(pointerX.get(), pointerY.get(), true);
			}, 250);
		} else {
			clearInterval(timerId);
		}
		return () => clearInterval(timerId);
	}, [runFrameLoop]);
	*/
	/*
	Drag Handler
	*/
	const onTileRearrangeDrag = (x, y, commit = false, isDragEnd = false) => {
		// Adjust pointer x & y to be page-relative by
		// console.log(x, y);

		// Justin's dumb throttle:
		// Instead of doing this in a setTimeout or a requestAnimationFrame
		// Keep track of the time and only do the boundary checking after
		// a fixed amount of time has passed
		const now = Date.now();
		const elapsed = now - timeSinceLastMove.get();
		if (elapsed < checkBoundariesThreshold) {
			return false;
		}
		timeSinceLastMove.set(now);
		// console.log("elapsed ", elapsed);

		// If there's a layout animation in progress, ignore drag events
		if (tomeData.isTileAnimating) {
			// console.log("ANIMATION IN PROGRESS!!!");
			return false;
		}

		// Use these bools to update the tome data and indicator data only when necessary
		let shouldUpdate = false;
		let shouldUpdateDropIndicator = false;

		// Adjust pointer x & y to be page-relative by
		// subtracting page position and margins
		x = x - pageLeft - pageMargin;
		y = y - pageTop - pageMargin;

		// Is the pointer within the page x-bounds?
		// Exit if not
		const pageWidthSlop = 80;
		const withinPageWidth = x >= -pageWidthSlop && x <= pageWidth + pageWidthSlop;
		if (!withinPageWidth) {
			if (showTileDropTarget.get()) {
				console.log("out of bounds, hiding indicator");
				showTileDropTarget.set(false);
			}
			// Must be out of bounds
			// Restore layout to pre-drag state
			if (tempLayoutData.current && tomeData.isDirty) {
				console.log("reverting layout");
				const d = JSON.parse(JSON.stringify(tempLayoutData.current));
				tomeData.isDirty = false;
				setTomeData(d);
			}
			return false;
		}

		// What row is being dragged over?
		let rowMarginY = 0; // Used to tally-up the row heights
		let rowOver = null; // row object the pointer is over
		let rowOverY = 0; // y position of the row object the pointer is over
		let rowOverHeight = 0; // height of row pointer is over

		// Row drop target sizing
		let rowTargetAreaHeight = 64; // Could be based on row margin too
		let rowTargetOffset = rowTargetAreaHeight / 2; // Applied to y position

		// Drop indicator placement
		let dropY = 0;
		let dropX = 0;
		let dropYTarget = false;
		let dropXTarget = false;

		// For row adding/removing
		let newRowOrder = null;
		let side = null;

		// Rows must be sorted every time, y checking assumes sorted rows
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		rows.forEach((r, i) => {
			// Current row's height
			let rH = rowHeight * r.height + rowMargin * (r.height - 1);

			// console.log(r.order, rows.length, y, rowMarginY + rH - rowTargetOffset)

			if (
				// Is the pointer within the top rowTargetOffset area of the first row?
				r.order === 1 &&
				y <= rowMarginY + rowTargetOffset
			) {
				dropY = rowMarginY + pageMargin;
				dropYTarget = true;
				newRowOrder = r.order;
				// console.log("pointer within top of first row ", r.order, newRowOrder);
			} else if (
				// Is the pointer within the bottom rowTargetOffset area of the last row?
				r.order === rows.length &&
				y >= rowMarginY + rH - rowTargetOffset
			) {
				dropY = rowMarginY + rH + rowMargin - dropIndicatorSize;
				dropYTarget = true;
				newRowOrder = r.order;
				if (row.tiles.length === 2) {
					newRowOrder = r.order + 1;
				}
				// console.log("pointer within bottom of last row ", r.order, newRowOrder);
			} else if (
				// Is the pointer within the top rowTargetOffset area of the current row?
				y >= rowMarginY - rowTargetOffset &&
				y <= rowMarginY + rowTargetOffset
			) {
				if (row.tiles.length === 1 && row.order + 1 === r.order && row.order === 1) {
					// console.log("don't do it");
				} else if (row.tiles.length === 1 && row.order === r.order) {
					// console.log("don't do it");
				} else {
					dropY = rowMarginY + pageMargin;
					dropYTarget = true;
					newRowOrder = r.order;
					// console.log("pointer within top drop zone of row over ", r.order, newRowOrder);
					if (r.order > row.order) {
						// console.log("fixing new row order");
						newRowOrder -= 1;
					}
				}
			}
			// Always capture which row the pointer is over for later X position checking
			if (y >= rowMarginY && y <= rowMarginY + rH) {
				rowOver = r;
				rowOverY = rowMarginY;
				rowOverHeight = rH;
			}
			// calculate next row y position
			rowMarginY += rowHeight * r.height + rowMargin * r.height;
		});

		// console.log("rowOver", rowOver.id, row.id, row.tiles, tile)

		// Cancel any y drop zones that don't change the layout
		if (dropYTarget) {
			const isSameRow = row.order === newRowOrder && row.tiles.length === 1;
			if (isSameRow) {
				dropYTarget = false;
				//tileDropInfo.show = false;
				// console.log("same layout");
			}
		}

		// Done checking the y drop zones
		// Now check the x drop zones
		if (!dropYTarget && rowOver) {
			dropXTarget = true;
			// which side of the tile is the dragging tile on?
			side = x <= pageWidth / 2 ? "left" : "right";
			//dropX = side === "right" ? pageWidth - pageMargin - tileWidth : pageMargin;
			const isSameRow = tile.rowId === rowOver.id;
			// What if there's two tiles?
			if (rowOver.tiles && rowOver.tiles.length === 2 && !isSameRow) {
				if (x >= pageWidth * (1 / 3) && x <= pageWidth * (2 / 3)) {
					side = "center";
					//dropX = pageMargin + (pageWidth - pageMargin * 2 - rowMargin) / 2 + rowMargin; // left edge of right tile
				}
				if (side === "right") {
					dropXTarget = false;
					dropYTarget = true;
					//dropY = rowOverY + rowOverHeight + rowMargin - dropIndicatorSize;
					//if (rowOver.order !== rows.length) dropY += rowMargin + dropIndicatorSize;
					newRowOrder = rowOver.order + 1;
					// Cancel this if it doesn't change the layout
					const isSameRow = row.order === newRowOrder;
					if (isSameRow) {
						dropYTarget = false;
						showTileDropTarget.set(false);
					}
				}
			}
			// Cancel any drop zones that don't make a change to the layout
			if (isSameRow) {
				const newTileOrder = side === "left" ? 1 : 2;
				if (tiles.length === 1 || newTileOrder === tile.order) {
					dropXTarget = false;
					dropYTarget = false;
					//showTileDropTarget.set(false);
				}
			}
		}

		// Make sure the indicator shows if there's a valid target
		if (dropYTarget || dropXTarget) {
			showTileDropTarget.set(true);
		}
		// Actually move some tiles around
		if (commit) {
			if (dropYTarget) {
				if (row.tiles.length === 1 && row.order !== newRowOrder) {
					/*
					- 1 tile rows moving up or down
					- just update tile's row's order
					- Increment or decrement order for the other rows
					- Based on row index count to prevent index drift
					*/
					rows.sort((a, b) => (a.order > b.order ? 1 : -1));
					rows.forEach((rO, j) => {
						const order = j + 1;
						if (rO.id !== row.id) {
							if (rO.order < row.order && newRowOrder <= rO.order) {
								rO.order = order + 1;
							}
							if (rO.order > row.order && newRowOrder >= rO.order) {
								rO.order = order - 1;
							}
						}
					});
					row.order = newRowOrder;
					rows.sort((a, b) => (a.order > b.order ? 1 : -1));
					shouldUpdate = true;
				}
				if (row.tiles.length === 2) {
					/*
					- 2 tile rows, tile moving to new row
					- Creates a new row
					- Removes tile from existing row and adds to new row
					- Updates widths of affected tiles
					- Increments or decrements orders of the other rows 
					*/
					// Create new row
					let newRowHeight = row.height;
					if (tile.contentUnitHeights) {
						newRowHeight = tile.contentUnitHeights[columnCount];
					}
					const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);
					// Update moving tile
					row.tiles.splice(row.tiles.indexOf(tile), 1); // remove tile from old row
					tile.width = 12;
					tile.order = 1;
					tile.rowId = newRow.id;
					newRow.tiles = [tile];
					// Update old row
					const remainingTile = row.tiles[0];
					remainingTile.width = 12;
					remainingTile.order = 1;
					if (remainingTile.contentUnitHeights) {
						row.height = remainingTile.contentUnitHeights[columnCount];
					}
					// Update row orders
					rows.sort((a, b) => (a.order > b.order ? 1 : -1));
					rows.forEach((rO, j) => {
						const order = j + 1;
						rO.order = order;
						if (rO.order >= newRowOrder) {
							rO.order = order + 1;
						}
					});
					// Commit the change
					tomeData.rows.push(newRow);
					rows.sort((a, b) => (a.order > b.order ? 1 : -1));
					shouldUpdate = true;
				}
			}
			if (dropXTarget) {
				const isSameRow = tile.rowId === rowOver.id;
				if (tiles.length === 2) {
					/*
					- 2 tile row, tile moving to within same row
					- Swap orders if there's a change to the tile's position
					*/
					const newTileOrder = side === "left" ? 1 : 2;
					if (isSameRow && newTileOrder !== tile.order) {
						const otherTile = tiles[0].id === tile.id ? tiles[1] : tiles[0];
						// Make this super dumb since we're limiting row to 2 tiles
						tile.order = newTileOrder;
						otherTile.order = newTileOrder === 1 ? 2 : 1;
						shouldUpdate = true;
					}
				}

				if (!isSameRow) {
					// remove from old row
					tiles.splice(tiles.indexOf(tile), 1);
					// if old row has no more tiles, remove old row
					if (tiles.length === 0) {
						tomeData.rows.splice(tomeData.rows.indexOf(row), 1);
						//rows.splice(rows.indexOf(row), 1);
					} else {
						// update width and order of remaining tile
						tiles[0].width = cColumnCount;
						tiles[0].order = 1;
					}
					// add to new row
					tile.rowId = rowOver.id;
					//oldTileWidth.set(tile.width);
					//oldTileHeight.set(row.height);
					//tile.width = 6;
					tile.width = oldTileWidth.get();
					tile.order = side === "left" ? 1 : 2;

					// update widths of other tile in new row
					if (rowOver.tiles[0]) {
						rowOver.tiles[0].width = cColumnCount - oldTileWidth.get();
						rowOver.tiles[0].order = side === "left" ? 2 : 1;
					}

					// Adjust height of row over if a tile needs it to be taller
					let newRowHeight = rowOver.height;
					if (rowOver.tiles[0] && rowOver.tiles[0].contentUnitHeights && rowOver.tiles[0].contentUnitHeights[columnCount/2] > rowOver.height) {
						rowOver.height = rowOver.tiles[0].contentUnitHeights[columnCount/2];
					}
					if (tile.contentUnitHeights && tile.contentUnitHeights[columnCount/2] > rowOver.height) {
						rowOver.height = tile.contentUnitHeights[columnCount/2];
					}
					
					

					if (rowOver.tiles.length === 2) {
						const remainingRows = tomeData.rows.filter(r => {
							return r.pageId === currentPage.id;
						});
						remainingRows.sort((a, b) => (a.order > b.order ? 1 : -1));

						if (side === "left") {
							// console.log("push 2 out of the way!");
							// Move tile 1 to order 2
							rowOver.tiles[0].order = 2;
						}
						
						// If both tiles in current row have contentUnitHeights, set row height to the larger of the two
						if(rowOver.tiles[0].contentUnitHeights && tile.contentUnitHeights) {
							rowOver.height = rowOver.tiles[0].contentUnitHeights[rowOver.tiles[0].width];
							if (rowOver.height < tile.contentUnitHeights[tile.width]) {
								rowOver.height = tile.contentUnitHeights[tile.width];
							}
						}

						// Create a new row
						newRowOrder = rowOver.order + 1;
						if (rowOver.tiles[1].contentUnitHeights) {
							newRowHeight = rowOver.tiles[1].contentUnitHeights[columnCount];
						}
						const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);
						// Move right tile to new row
						rowOver.tiles[1].rowId = newRow.id;
						rowOver.tiles[1].width = 12;
						rowOver.tiles[1].order = 1;
						// Update existing rows' orders
						remainingRows.forEach((rO, j) => {
							const order = j + 1;
							if (newRowOrder <= rO.order) {
								rO.order = order + 1;
							}
						});
						// Add the new row to the tome data
						tomeData.rows.push(newRow);
						remainingRows.push(newRow);

						// check if all rows are tall enough
						let newTotalRowHeight = 0;
						remainingRows.forEach(tR => {
							newTotalRowHeight += tR.height;
						});
						// if not, make the last row tall enough for a page height
						if (newTotalRowHeight < cRowCount) {
							const lastRow = remainingRows[remainingRows.length - 1];
							lastRow.height =
								remainingRows.length === 1 ? cRowCount : cRowCount - (newTotalRowHeight - lastRow.height);
						}
					}

					// commit it
					shouldUpdate = true;
				}
			}
		}

		if (shouldUpdateDropIndicator) {
			//console.log("shouldUpdate tileDropIndicator", tileDropInfo, "dropX", dropX, "dropY", dropY);
			if (showTileDropTarget.get()) {
				/*

				let tW = 12;
				if (dropY === 0) tW = 6;
				// let nWOffset = dragStartOffsetX.get() * (columnWidth * tW + columnGutter * (tW - 1));
				// console.log("dragStartOffsetX.get()", dragStartOffsetX.get(), "tW", tW, "tempWidth", tempWidth, "tile.width", tile.width );

				let nW = (oldTileWidth.get() - tile.width);
				let nWOffset = (columnWidth * nW + columnGutter * (nW - 1)) / 2;

				//console.log("nWOffset", nWOffset, "oldTileWidth", oldTileWidth.get(), "tile.width", tile.width);

				//setTempXOffset(nWOffset);

				if (tW === 12 && tile.height12) {
					// let nHOffset = dragStartOffsetY.get() * (rowHeight * tile.height12 + rowMargin * (tile.height12 - 1));
					//setTempYOffset(nHOffset * 0.75);
					//setTempHeight(tile.height12);

					let nH = (tile.height12 - oldTileHeight.get());
					let nHOffset = (rowHeight * nH + rowMargin * (nH - 1)) / 2;
					console.log("nHOffset", nHOffset, "oldTileHeight", oldTileHeight.get(), "tile.height12", tile.height12);

					//setTempYOffset(nHOffset);
				}
				if (tW === 6 && tile.height6 && rowOver.height < tile.height6) {
					//setTempHeight(tile.height6);
				}
				*/
			} else {
				//setTempWidth(0);
				//setTempHeight(0);
				//setTempXOffset(0);
				//setTempYOffset(0);
			}
		}

		// Commit the new tile change
		if (shouldUpdate) {
			/*
				If the tile changes size
				move the tile such that the relative 
				cursor position does not change
			*/
			let tW = oldTileWidth.get() - tile.width;
			let nWOffset = dragStartOffsetLeft * (columnWidth * tW + columnGutter * (tW - 1));
			if (tW !== 0) {
				setTempXOffset(nWOffset);
			}

			let tH = oldTileHeight.get() - row.height;
			let nHOffset = dragStartOffsetTop * (rowHeight * tH + rowMargin * (tH - 1));
			if (tH !== 0) {
				setTempYOffset(nHOffset);
			}

			//console.log("oldTileHeight", oldTileHeight.get(), "row.height", row.height, dragStartOffsetTop, nHOffset);
			//console.log("oldTileWidth", oldTileWidth.get(), "tile.width", tile.width, dragStartOffsetLeft, nWOffset);
			//oldTileWidth.set(tile.width);
			//oldTileHeight.set(row.height);

			tomeData.tileDropInfo = {};
			tomeData.isDirty = true;

			if (isDragEnd) {
				console.log("hide");
				tomeData.tileDropInfo.show = false;
				showTileDropTarget.set(false);
				setTempXOffset(0);
			} else {
				tomeData.tileDropInfo.show = true;
				showTileDropTarget.set(false);
				showTileDropTarget.set(true);
				tomeData.tileDropInfo.tile = tile;
			}

			// Redistribute heights?
			const rows = tomeData.rows.filter(r => {
				return r.pageId === currentPage.id;
			});
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));

			if (rows.length === 1 && rows[0].height < cRowCount) {
				rows[0].height = cRowCount;
			} else {
				let totalHeight = 0;
				rows.forEach((r, i) => {
					totalHeight += r.height;
				});
				if (totalHeight < cRowCount) {
					rows[0].height += cRowCount - totalHeight;
				}
			}

			// Make sure other controls like row resize
			// don't appear when animating the page layout

			tomeData.isTileAnimating = true;

			//console.log("setting new tomedata");
			//console.log(tomeData);
			setTomeData({ ...tomeData });
		}

		return shouldUpdate;
	};

	const onContentSizeChange = (width, height) => {
		// This should be sent to a function on tome data

		// If this tile is a text tile and is in a row
		// with another text tile
		// wait for 2 occurances of the size change update
		// and act on the largest value

		//updateRowHeightOnTileWidthChange(height)
		let newHeight = Math.ceil(height / (rowHeight + rowMargin));
		tile.contentHeight = newHeight;
		let allTilesAreText = true;
		row.tiles.forEach(t => {
			if (t.type !== tileNames.TEXT.name) allTilesAreText = false;
		});
		if (row.tiles.length > 1 && allTilesAreText) {
			contentTileHeightsList.current.push(newHeight);
			if (contentTileHeightsList.current.length === row.tiles.length) {
				//
				newHeight = Math.max(...contentTileHeightsList.current);
				//console.log("onContentSizeChange", row.height, newHeight);
				contentTileHeightsList.current = [];
				//row.height  = newHeight;
				//setTomeData({ ...tomeData });
			}
		}

		if (newHeight > row.height && !row.autoHeight) row.autoHeight = true; // this necessary?

		if (rows.length === 1 && newHeight < cRowCount) {
			row.height = cRowCount;
			setTomeData({ ...tomeData });
			console.log("onContentSizeChange", row.height, newHeight, height);
		} else if (newHeight !== row.height) {
			row.height = newHeight;
			setTomeData({ ...tomeData });
			console.log("onContentSizeChange", row.height, newHeight, height);
		}
	};

	let iX = tileLeft;
	let iY = tileTop;
	let iWidth = tileWidth;
	let iHeight = tileHeight;
	let iScaleX = 1;
	let iScaleY = 1;
	let iOpacity = 1;
	let isNewTile = false;
	if (tomeData.newTileID === tile.id) {
		isNewTile = true;
		iScaleX = 0;
		iScaleY = 0;
		iOpacity = 0;
		if (tomeData.newTileInfo) {
			// iWidth = tileDropInfo.draggableWidth;
			// iHeight = tileDropInfo.draggableHeight;
			iX = tomeData.newTileInfo.dropX - iWidth / 2 - tomeData.draggableOffsetX;
			iY = tomeData.newTileInfo.dropY - iHeight / 2 - tomeData.draggableOffsetY + pageMargin + window.scrollY;
			iScaleX = tomeData.draggableWidth / tileWidth;
			iScaleY = tomeData.draggableHeight / tileHeight;
		}
		tomeData.newTileID = null;
		tomeData.newTileInfo = null;
	}

	return (
		<motion.div
			exit={{
				opacity: 0,
			}}
			// transition={{
			// 	duration: 0.35,
			// }}
			key={tile.id + "_wrap"}
		>
			<Wrap
				style={{
					width: tileWidth,
					height: tileHeight,
					zIndex: zIndex,
					originX: dragStartOffsetLeft,
					originY: dragStartOffsetTop,
					cursor: isSelected ? (tile.type === tileNames.TEXT.name ? "text" : "unset") : "unset",
				}}
				initial={{
					x: iX,
					y: iY,
					opacity: iOpacity,
					scaleX: iScaleX,
					scaleY: iScaleY,
					originX: dragStartOffsetLeft,
					originY: dragStartOffsetTop,
				}}
				animate={tileAnimation}
				transition={isNewTile ? transitions.newTileTransition : transitions.layoutTransition}
				key={tile.id}
				id={tile.id}
				onAnimationStart={() => {
					// console.log("Started animating");
				}}
				onHoverStart={() => {
					//if (rowResizing === null && isPlayMode === false) setIsHovering(true);
					if (rowResizing === null && isPlayMode === false) isHovering.set(1);
					//if (isPlayMode === false) isHovering.set(1);
					tileHoveringId.set(tile.id);
				}}
				onHoverEnd={() => {
					//setIsHovering(false);
					if (rowResizing === null) {
						tileHoveringId.set(null);
						isHovering.set(0);
					}
				}}
				onMouseMove={e => {
					//console.log("move", e)
				}}
				onMouseDown={
					isPlayMode || isSelected
						? null
						: () => {
								setShouldSelectTile(true);
								//document.body.classList.add("grabbing");
						  }
				}
				onMouseUp={
					isPlayMode || isSelected
						? null
						: () => {
								if (shouldSelectTile) {
									selectTile(tile);
									setShouldSelectTile(false);
									playTileSelectSound();
									//document.body.classList.remove("grabbing");
								}
						  }
				}
				drag={isPlayMode || isAnimating || isSelected ? false : true}
				onDragStart={
					isPlayMode
						? null
						: (event, info) => {
								/*
                Update pointer state
                */
								document.body.classList.add("grabbing");
								setShouldSelectTile(false);

								setIsDragging(true);
								isHovering.set(0);
								/*
				Find the pointer position relative to the tile's center point
                */
								const tilePointerCenterXOffset = info.point.x - pageLeft - tileLeft;
								const tilePointerCenterYOffset = info.point.y - pageTop - tileTop;
								setDragStartOffsetLeft(tilePointerCenterXOffset / tileWidth);
								setDragStartOffsetTop(tilePointerCenterYOffset / tileHeight);
								//console.log("drag start", "offset x: ", tilePointerCenterXOffset, dragStartOffsetLeft);
								// console.log("offset y: ", tilePointerCenterYOffset, dragStartOffsetY.get());
								/*
				Record pointer coordinates
				*/
								pointerX.set(info.point.x);
								pointerY.set(info.point.y);

								oldTileWidth.set(tile.width);
								oldTileHeight.set(row.height);

								tempLayoutData.current = JSON.parse(JSON.stringify(tomeData));

								if (selectedTile && selectedTile.id !== tile.id) {
									// Steal selection!
									//setSelectedTile(tile);
									//setPanelName(tile.type);
									selectTile(tile);
								}

								setTileDragging(true);
						  }
				}
				onDragEnd={(event, info) => {
					/*	
                        Reset ghost tile offsets
                    */
					//setDragStartOffsetLeft(0);
					//setDragStartOffsetTop(0);

					/*	
                        Reset pointer state
                    */
					document.body.classList.remove("grabbing");
					setIsDragging(false);
					// setRunFrameLoop(false);
					setTempWidth(0);
					setTempHeight(0);
					setTempXOffset(0);
					setTempYOffset(0);

					setIsAnimating(true);
					setTileDragging(false);

					//onTileRearrangeDrag(info.point.x, info.point.y, true, true);
					showTileDropTarget.set(false);

					tempLayoutData.current = false;
				}}
				onDrag={(event, info) => {
					// console.log(info.velocity.x, info.velocity.y);
					let commit = false;
					const thresh = 100;
					if (Math.abs(info.velocity.x) > thresh || Math.abs(info.velocity.y) > thresh) {
						commit = true;
					}
					// newFunc(info.point.x, info.point.y, false)
					/*
				Record pointer coordinates
				*/
					pointerX.set(info.point.x);
					pointerY.set(info.point.y);
					if (!isAnimating) {
						onTileRearrangeDrag(info.point.x, info.point.y, commit);
					}
				}}
				onContextMenu={e => {
					//console.log("right click!", e);
					setContextMenuInfo({
						x: e.clientX,
						y: e.clientY,
						items: ["Cut", "Copy", "Paste", "Replace", "Duplicate", "Delete"],
					});
					if (!isSelected) selectTile(tile);
					setShowContextMenu(true);

					e.preventDefault();
				}}
			>
				{/* <HoverBackground
					className="hover"
					style={{
						background: page.theme.colors.t1,
						borderRadius: borderRadius,
						opacity: isHovering,
					}}
				/> */}
				<WrapInner
					animate={{
						width: tileWidth,
						height: tileHeight,
						x: tempXOffset,
						y: tempYOffset,
					}}
					initial={{
						width: iWidth,
						height: iHeight,
					}}
					transition={transitions.layoutTransition}
				>
					<TileDraggingBackground
						style={{
							backgroundColor: page.theme.colors.backgrounds.tile.dragging,
							borderRadius: borderRadius,
						}}
						animate={{
							opacity: isDragging ? 0.75 : 0,
						}}
						initial={{
							opacity: 0,
						}}
						transition={transitions.layoutTransition}
					/>
					<TileContent
						style={{
							borderRadius: borderRadius,
							WebkitMaskImage: "-webkit-radial-gradient(white, black)",
						}}
					>
						{tile.type === tileNames.TEXT.name && (
							<TileText
								id={tile.id}
								blocks={tile.params.blocks}
								// htmlBlob={tile.params.htmlBlob}

								columnCount={columnCount}
								isSelected={isSelected}
								//onContentSizeChange={onContentSizeChange}
								scale={scale}
								alignmentX={tile.params.alignmentX}
								alignmentY={tile.params.alignmentY}
								theme={page.theme}
								backgroundColor={tile.params.backgroundColor}
								tileWidth={tileWidth}
								tileUnitWidth={tile.width}
								tile={tile}
							/>
						)}
						{tile.type === tileNames.IMAGE.name && (
							<TileImage
								image={tile.params.image}
								imageSize={tile.params.imageSize}
								imagePosition={tile.params.imagePosition}
								backgroundColor={tile.params.backgroundColor}
								rowHeight={row.height}
								tileWidth={tileWidth}
								tileUnitWidth={tile.width}
								theme={page.theme}
								caption={tile.params.caption}
								paddingY={tile.params.paddingY}
								isSelected={isSelected}
							/>
						)}
						{tile.type === tileNames.VIDEO.name && (
							<TileVideo
								video={tile.params.video}
								autoPlay={tile.params.autoPlay}
								image={tile.params.image}
								rowHeight={row.height}
								tileUnitWidth={tile.width}
								theme={page.theme}
								caption={tile.params.caption}
								isSelected={isSelected}
							/>
						)}
						{tile.type === tileNames.TABLE.name && (
							<TileTable
								rowHeight={row.height}
								tileWidth={tileWidth}
								tileUnitWidth={tile.width}
								title={tile.params.title}
								header={tile.params.header}
								rows={tile.params.rows}
								columns={tile.params.columns}
								theme={page.theme}
								isSelected={isSelected}
							/>
						)}
						{tile.type === tileNames.TABLE.name && (
							<Scrim
								layout
								transition={transitions.layoutTransition}
								style={{
									width: 58 * scale,
									// right: props.tileWidth,
								}}
							/>
						)}
						{tile.type === tileNames.CODE.name && (
							<TileCode
								rowHeight={row.height}
								tileWidth={tile.width}
								tileSize={tile.width}
								columnCount={columnCount}
								theme={page.theme}
							/>
						)}
						{tile.type === tileNames.WEB.name && (
							<TileWeb
								rowHeight={row.height}
								tileWidth={tile.width}
								theme={page.theme}
								isSelected={isSelected}
							/>
						)}
						{tile.type === tileNames.TWITTER.name && (
							<TileTwitter
								rowHeight={row.height}
								tileWidth={tileWidth}
								tileUnitWidth={tile.width}
								data={tile.params}
								theme={page.theme}
								isSelected={isSelected}
								onContentSizeChange={onContentSizeChange}
							/>
						)}

						{tile.type === tileNames.GIPHY.name && (
							<TileGiphy
								rowHeight={row.height}
								tileWidth={tile.width}
								theme={page.theme}
								isSelected={isSelected}
							/>
						)}
						{tile.type === tileNames.AIRTABLE.name && (
							<TileAirtable
								rowHeight={row.height}
								tileWidth={tile.width}
								theme={page.theme}
								isSelected={isSelected}
							/>
						)}
						{tile.type === tileNames.FIGMA.name && (
							<TileFigma
								rowHeight={row.height}
								tileWidth={tile.width}
								isSelected={isSelected}
								theme={page.theme}
								src={tile.params.src}
							/>
						)}

						{/* <TileWidthIndicatorStatic
							row={row}
							rows={rows}
							tiles={row.tiles}
							key={row.id + "_resize_3"}
							pageTop={pageTop}
							page={page}
						/> */}
					</TileContent>
					<HoverOutline
						className="hover"
						style={{
							boxShadow: `0 0 0 ${tileBorderSize}px ${page.theme.colors.t2}`,
							borderRadius: borderRadius,
							opacity: 0, //isHovering,
						}}
					/>
					{/* <ResizeCover
						style={{
							boxShadow: `0 0 0 ${tileBorderSize}px ${page.theme.colors.t2}`,
							borderRadius: borderRadius,
						}}
						animate={{
							opacity: rowResizing && rowResizing.id === row.id ? 1 : 0,
						}}
						transition={{
							duration: 0.2,
						}}
						initial={false}
					/> */}
					<SelectedOutline
						style={{
							boxShadow: `0 0 0 ${tileBorderSize}px ${page.theme.colors.accent}`,
							borderRadius: borderRadius,
						}}
						animate={{
							//opacity: (isSelected || (rowResizing && rowResizing.id === row.id)) && !isDragging ? 1 : 0,
							//opacity: isSelected && !rowResizing ? 1 : 0,
							opacity: isSelected && !isDragging ? 1 : 0,
						}}
						transition={{ duration: 0.1 }}
						initial={false}
					/>
				</WrapInner>
			</Wrap>
		</motion.div>
	);
};
