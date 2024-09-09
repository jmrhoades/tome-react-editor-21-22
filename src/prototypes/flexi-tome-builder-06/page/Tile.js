import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useAnimation } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext, createRow } from "../tome/TomeContext";

import { tileNames } from "../page/TileConstants";
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
import { TileColor } from "./TileColor";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: auto;
`;

const TileContent = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
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

const HoverOutline = styled(SelectedOutline)``;
const ResizeCover = styled(SelectedOutline)``;

export const Tile = ({ tile, pageHeight, pageTop }) => {
	const {
		currentPage,
		selectedTile,
		setSelectedTile,
		setSelectedOutlinePage,
		rowResizing,
		setTomeData,
		tomeData,
		tileDropInfo,
		setTileDropInfo,
		setPanelName,
		setSidePanelOpen,
		setIsTileAnimating,
	} = useContext(TomeContext);
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
	} = useContext(MetricsContext).metrics;

	const { cRowCount, cColumnCount, cRowMinHeight } = metricConstants;

	// console.log(tomeData.newTileID, tile.id);

	// The states of a draggable, resizable tile:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING
	const isSelected = selectedTile && selectedTile.id === tile.id;
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldSelectTile, setShouldSelectTile] = useState(false);

	// Use to set an offset for the scaled dragging tile
	const [dragStartOffsetLeft, setDragStartOffsetLeft] = useState(0.5);
	const [dragStartOffsetTop, setDragStartOffsetTop] = useState(0.5);

	// Try using animation for the tile movement?
	const tileAnimation = useAnimation();

	const borderRadius = tileCornerRadius;

	// other tiles in the same row & page
	const tiles = tomeData.tiles.filter(t => {
		return t.pageId === tile.pageId && t.rowId === tile.rowId;
	});
	tiles.sort((a, b) => (a.order > b.order ? 1 : -1));

	// the row the tile is in
	const row = tomeData.rows.filter(r => {
		return r.id === tile.rowId;
	})[0];

	// all the rows sorted by order
	const rows = tomeData.rows.filter(r => {
		return r.pageId === currentPage.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));

	/*
	tileWidth
	*/
	const tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);

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
	}

	/*
	tileTop
	*/
	let tileTop = pageMargin;
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
	// tileTop = getTileY(tomeData, tile, pageMargin, minPageHeight, rowHeight, rowMargin);

	/*
	tileHeight
	*/
	let tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);

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
			setIsTileAnimating(false);
		}
		const update = async () => {
			await tileAnimation.start({
				y: tileTop,
				x: tileLeft,
				width: tileWidth,
				height: tileHeight,
				scaleX: isDragging ? 0.75 : 1,
				scaleY: isDragging ? 0.75 : 1,
				backgroundColor: isDragging ? colors.z2 : colors.z1,
				opacity: isDragging ? 0.75 : 1,
			});
			return await reset();
		};
		update();
	}, [tomeData, tileAnimation, tileTop, tileLeft, tileWidth, tileHeight, isDragging, setIsTileAnimating]);

	/*
	Drag Handler
	*/
	const onTileRearrangeDrag = (x, y, commit = false) => {
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
			if (tileDropInfo.show) {
				tileDropInfo.show = false;
				setTileDropInfo({ ...tileDropInfo });
			}
			return false;
		}
		// console.log("onAddTileDrag", x, y);

		// What row is being dragged over?
		let rowMarginY = 0; // Used to tally-up the row heights
		let rowOver = null; // row object the pointer is over
		let rowOverY = 0; // y position of the row object the pointer is over
		let rowOverHeight = 0; // height of row pointer is over

		// Row drop target sizing
		let rowTargetAreaHeight = rowHeight; // Could be based on row margin too
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

		// Cancel any y drop zones that don't change the layout
		if (dropYTarget) {
			const isSameRow = row.order === newRowOrder && row.tiles.length === 1;
			if (isSameRow) {
				dropYTarget = false;
				tileDropInfo.show = false;
				// console.log("same layout");
			}
		}

		// Done checking the y drop zones
		// Now check the x drop zones
		if (!dropYTarget && rowOver) {
			dropXTarget = true;
			// which side of the tile is the dragging tile on?
			side = x <= pageWidth / 2 ? "left" : "right";
			dropX = side === "right" ? pageWidth - pageMargin : pageMargin;
			const isSameRow = tile.rowId === rowOver.id;
			// What if there's two tiles?
			if (rowOver.tiles.length === 2 && !isSameRow) {
				if (x >= pageWidth * (1 / 3) && x <= pageWidth * (2 / 3)) {
					side = "center";
					dropX = pageMargin + (pageWidth - pageMargin * 2 - rowMargin) / 2 + rowMargin; // left edge of right tile
				}
				if (side === "right") {
					dropXTarget = false;
					dropYTarget = true;
					dropY = rowOverY + rowOverHeight + rowMargin - dropIndicatorSize;
					if (rowOver.order !== rows.length) dropY += rowMargin + dropIndicatorSize;
					newRowOrder = rowOver.order + 1;
					// Cancel this if it doesn't change the layout
					const isSameRow = row.order === newRowOrder;
					if (isSameRow) {
						dropYTarget = false;
						// console.log("cancel drop");
						if (tileDropInfo.show) {
							tileDropInfo.show = false;
							shouldUpdateDropIndicator = true;
						}
					}
				}
			}
			// Cancel any drop zones that don't make a change to the layout
			if (isSameRow) {
				const newTileOrder = side === "left" ? 1 : 2;
				if (tiles.length === 1 || newTileOrder === tile.order) {
					dropXTarget = false;
					dropYTarget = false;

					if (tileDropInfo.show) {
						tileDropInfo.show = false;
						shouldUpdateDropIndicator = true;
					}
				}
			}
		}

		// Make sure the indicator shows if there's a valid target
		if ((dropYTarget || dropXTarget) && !tileDropInfo.show) {
			tileDropInfo.show = true;
			tileDropInfo.type = "rearrange";
			shouldUpdateDropIndicator = true;
		}

		// Update the drop indicator position and dimensions
		if (dropYTarget || dropXTarget) {
			// Assume y target
			let iX = pageMargin;
			let iY = dropY;
			let iW = pageWidth - pageMargin * 2;
			let iH = dropIndicatorSize;
			if (dropXTarget) {
				iX = dropX;
				iY = rowOverY + pageMargin;
				iH = rowOverHeight;
				iW = dropIndicatorSize;
			}
			if (
				iX !== tileDropInfo.x ||
				iY !== tileDropInfo.y ||
				iW !== tileDropInfo.width ||
				iH !== tileDropInfo.height
			) {
				tileDropInfo.width = iW;
				tileDropInfo.height = iH;
				tileDropInfo.x = iX;
				tileDropInfo.y = iY;
				shouldUpdateDropIndicator = true;
			}
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
					let newRowHeight = row.height;
					const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);
					row.tiles.splice(row.tiles.indexOf(tile), 1);
					row.tiles.forEach((otherTiles, k) => {
						otherTiles.width = 12 / row.tiles.length;
						otherTiles.order = k + 1;
					});
					tile.width = 12;
					tile.order = 1;
					tile.rowId = newRow.id;
					newRow.tiles = [tile];
					rows.sort((a, b) => (a.order > b.order ? 1 : -1));
					rows.forEach((rO, j) => {
						const order = j + 1;
						rO.order = order;
						if (rO.order >= newRowOrder) {
							rO.order = order + 1;
						}
					});
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
					tile.width = 6;
					tile.order = side === "left" ? 1 : 2;

					// update widths of other tile in new row
					rowOver.tiles[0].width = 6;
					rowOver.tiles[0].order = side === "left" ? 2 : 1;

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

						// Create a new row
						newRowOrder = rowOver.order + 1;
						const newRowHeight = rowOver.height;
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

		// Hide the drop indicator if none of the conditions are true and it's still showing
		if ((!dropYTarget && !dropXTarget && tileDropInfo.show) || commit) {
			tileDropInfo.show = false;
			shouldUpdateDropIndicator = true;
		}

		if (shouldUpdateDropIndicator) {
			// console.log("shouldUpdate tileDropIndicator", tileDropInfo);
			setTileDropInfo({ ...tileDropInfo });
		}

		// Commit the new tile change
		if (shouldUpdate) {
			// Redistribute heights?
			const rows = tomeData.rows.filter(r => {
				return r.pageId === currentPage.id;
			});
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));
			if (rows.length === 1 && rows[0].flexHeight) {
				rows[0].height = cRowCount;
			}
			if (rows.length === 2 && rows[0].flexHeight && rows[1].flexHeight) {
				rows[0].height = cRowMinHeight;
				rows[1].height = cRowCount - cRowMinHeight;
			}
			if (rows.length === 3 && rows[0].flexHeight && rows[1].flexHeight && rows[2].flexHeight) {
				rows[0].height = cRowMinHeight;
				rows[1].height = cRowMinHeight;
				// rows[2].height = cRowCount - cRowMinHeight - cRowMinHeight;
				rows[2].height = cRowMinHeight;
			}

			console.log(tomeData);
			setTomeData({ ...tomeData });
		}

		return shouldUpdate;
	};

	const draggingShadow = `0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
		0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
		0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)`;

	const onContentSizeChange = (width, height) => {
		const thisRowHeight = rowHeight * row.height + rowMargin * (row.height - 1);
		// console.log(height, thisRowHeight);

		if (height > thisRowHeight) {
			const makeUpRows = Math.round((height - thisRowHeight) / (rowHeight + rowMargin));
			// console.log("onContentSizeChange", width, height, row.height, thisRowHeight, makeUpRows, rowHeight);
			row.height += makeUpRows;
			row.autoHeight = false;
			setTomeData({ ...tomeData });
		}
	};

	let iX = tileLeft;
	let iY = tileTop;
	let iWidth = tileWidth;
	let iHeight = tileHeight;
	let iScaleX = 1;
	let iScaleY = 1;
	let iOpacity = 1;
	if (tomeData.newTileID === tile.id) {
		iScaleX = 0;
		iScaleY = 0;
		iOpacity = 0;
		if (tomeData.newTileInfo) {
			// iWidth = tileDropInfo.draggableWidth;
			// iHeight = tileDropInfo.draggableHeight;
			iX = tomeData.newTileInfo.dropX - iWidth / 2 - tileDropInfo.draggableOffsetX;
			iY = tomeData.newTileInfo.dropY - iHeight / 2 - tileDropInfo.draggableOffsetY + pageMargin + window.scrollY;
			iScaleX = tileDropInfo.draggableWidth / tileWidth;
			iScaleY = tileDropInfo.draggableHeight / tileHeight;
		}
	}

	return (
		<Wrap
			transition={transitions.layoutTransition}
			// transition={{
			// 	...transitions.layoutTransition,
			// 	onComplete: () => {
			// 		console.log("isAnimating false");
			// 		setIsAnimating(false);
			// 		setIsTileAnimating(false);
			// 	},
			// }}
			initial={{
				x: iX,
				y: iY,
				width: iWidth,
				height: iHeight,
				backgroundColor: colors.z1,
				opacity: iOpacity,
				scaleX: iScaleX,
				scaleY: iScaleY,
				originX: 0.5,
				originY: 0.5,
			}}
			// animate={{
			// 	y: tileTop,
			// 	x: tileLeft,
			// 	width: tileWidth,
			// 	height: tileHeight,
			// 	scale: isDragging ? 0.75 : 1,
			// 	backgroundColor: isDragging ? colors.z2 : colors.z1,
			// 	opacity: isDragging ? 0.75 : 1,
			// }}
			animate={tileAnimation}
			key={tile.id}
			id={tile.id}
			style={{
				zIndex: zIndex,
				borderRadius: borderRadius,
				boxShadow: isDragging ? draggingShadow : "none",
				originX: dragStartOffsetLeft,
				originY: dragStartOffsetTop,
			}}
			onAnimationStart={() => {
				// console.log("Started animating");
			}}
			onHoverStart={() => {
				if (rowResizing === null) setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onPointerDown={() => {
				setShouldSelectTile(true);
			}}
			onPointerUp={() => {
				if (shouldSelectTile) {
					// setIsHovering(false);
					setSelectedOutlinePage(null);
					setSelectedTile(tile);
					setShouldSelectTile(false);

					// update property panel
					setPanelName(tile.type);
					setSidePanelOpen(true);
				}
			}}
			drag={isSelected ? true : true}
			// dragConstraints={{ left: tileLeft, right: tileLeft, top: tileTop, bottom: tileTop }} // snaps back to top left
			// dragElastic={1} // allows full movement
			// dragTransition={{ type: "inertia", velocity: 0 }}
			// dragMomentum={false}
			onDragStart={(event, info) => {
				onTileRearrangeDrag(info.point.x, info.point.y, false, info.offset.x, info.offset.y);
				/*
                Update pointer state
                */
				setShouldSelectTile(false);
				document.body.style.cursor = "grabbing";
				setIsDragging(true);

				/*
				Find the pointer position relative to the tile's center point
                */
				const tilePointerCenterXOffset = info.point.x - pageLeft - tileLeft;
				const tilePointerCenterYOffset = info.point.y - pageTop - tileTop;
				setDragStartOffsetLeft(tilePointerCenterXOffset / tileWidth);
				setDragStartOffsetTop(tilePointerCenterYOffset / tileHeight);
				// console.log("offset x: ", tilePointerCenterXOffset, dragStartOffsetLeft);
				// console.log("offset y: ", tilePointerCenterYOffset, dragStartOffsetTop);

				if (selectedTile && selectedTile.id !== tile.id) {
					// Steal selection!
					setSelectedTile(tile);
					setPanelName(tile.type);
				}
			}}
			onDragEnd={(event, info) => {
				onTileRearrangeDrag(info.point.x, info.point.y, true, info.offset.x, info.offset.y);
				/*	
                        Reset ghost tile offsets
                    */
				//setDragStartOffsetLeft(0);
				//setDragStartOffsetTop(0);

				/*	
                        Reset pointer state
                    */
				document.body.style.cursor = "auto";
				setIsDragging(false);

				/*	
                        Hide drop indicator
                    */
				if (tileDropInfo.show === true) {
					tileDropInfo.show = false;
					setTileDropInfo({ ...tileDropInfo });
				}

				setIsAnimating(true);
				// Make sure other controls like row resize
				// don't appear when animating the tile
				setIsTileAnimating(true);
			}}
			onDrag={(event, info) => {
				onTileRearrangeDrag(info.point.x, info.point.y, false, info.offset.x, info.offset.y);
				//debounce((info)=>{onTileRearrangeDrag(info.point.x, info.point.y, false, info.offset.x, info.offset.y)}, 0);
			}}
		>
			<TileContent
				style={{
					borderRadius: borderRadius,
				}}
			>
				{tile.type === tileNames.TEXT.name && (
					<TileText
						blocks={tile.params.blocks}
						tileSize={tile.width}
						columnCount={columnCount}
						isSelected={isSelected}
						onContentSizeChange={onContentSizeChange}
						scale={scale}
						centerVertical={tile.params.centerVertical}
						textAlign={tile.params.textAlign}
					/>
				)}
				{tile.type === tileNames.IMAGE.name && (
					<TileImage
						image={tile.params.image}
						imageSize={tile.params.imageSize}
						imagePosition={tile.params.imagePosition}
						tileSize={tile.size}
						backgroundColor={tile.params.backgroundColor}
					/>
				)}
				{tile.type === tileNames.VIDEO.name && <TileVideo video={tile.params.video} tileSize={tile.size} />}
				{tile.type === tileNames.TABLE.name && <TileTable tileSize={tile.size} />}
				{tile.type === tileNames.CODE.name && <TileCode tileSize={tile.size} />}
				{tile.type === tileNames.WEB.name && <TileWeb tileSize={tile.size} />}
				{tile.type === tileNames.TWITTER.name && <TileTwitter tileSize={tile.size} />}

				{tile.type === tileNames.GIPHY.name && <TileGiphy tileSize={tile.size} />}
				{tile.type === tileNames.AIRTABLE.name && <TileAirtable tileSize={tile.size} />}
				{tile.type === tileNames.FIGMA.name && <TileFigma tileSize={tile.size} isSelected={isSelected} />}
				{tile.type === tileNames.COLOR.name && <TileColor tileSize={tile.size} color={tile.params.color} />}
			</TileContent>
			<HoverOutline
				style={{
					borderRadius: borderRadius,
					backgroundColor: colors.white04,
					// borderWidth: tileBorderSize,
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				transition={transitions.slowEase}
				initial={{
					opacity: 1,
				}}
			/>
			<ResizeCover
				style={{
					borderRadius: borderRadius,
					backgroundColor: colors.white04,
					// borderWidth: tileBorderSize,
				}}
				animate={{
					opacity: rowResizing && rowResizing.id === row.id ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				initial={false}
			/>
			<SelectedOutline
				style={{
					borderWidth: tileBorderSize,
					borderRadius: borderRadius,
					borderColor: colors.accent,
					// boxShadow: `inset 0px 0px 0px 1px rgba(51, 20, 50, 0.25)`,
				}}
				animate={{
					opacity: isSelected && !isDragging ? 1 : 0,
				}}
				transition={transitions.layoutTransition}
			/>
		</Wrap>
	);
};
