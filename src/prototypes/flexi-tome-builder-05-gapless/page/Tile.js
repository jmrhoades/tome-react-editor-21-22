import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

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

const SelectedOutline = styled(motion.div)`
	position: absolute;
	pointer-events: none;
	border-style: solid;	
`;

const HoverOutline = styled(SelectedOutline)`
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const Tile = ({ tile, pageHeight, pageTop }) => {
	const {
		currentPage,
		selectedTile,
		setSelectedTile,
		setSelectedOutlinePage,
		tileResizing,
		setTomeData,
		tomeData,
		tileDropInfo,
		setTileDropInfo,
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
	} = useContext(MetricsContext).metrics;

	const { cRowMinHeight, cRowCount, cColumnCount } = metricConstants;

	// The states of a draggable, resizable tile:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING
	const isSelected = selectedTile && selectedTile.id === tile.id;
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isClicking, setIsClicking] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldSelectTile, setShouldSelectTile] = useState(false);

	// Use to set an offset for the scaled
	const [dragStartOffsetLeft, setDragStartOffsetLeft] = useState(0);
	const [dragStartOffsetTop, setDragStartOffsetTop] = useState(0);

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
	if (tile.order === 3) {
		const firstTile = tiles.filter(tile => {
			return tile.order === 1;
		})[0];
		const firstTileWidth = columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
		const secondTile = tiles.filter(tile => {
			return tile.order === 2;
		})[0];
		const secondTileWidth = columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
		tileLeft = pageMargin + firstTileWidth + columnGutter + secondTileWidth + columnGutter;
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

	/*
	tileHeight
	*/
	let tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);

	/*
	Z-INDEX
	*/
	const zIndex = useMotionValue(0);
	useEffect(() => {
		if (isDragging || isAnimating) {
			zIndex.set(3);
		} else if (isSelected) {
			zIndex.set(2);
		} else if (isHovering) {
			zIndex.set(1);
		} else {
			zIndex.set(0);
		}
	}, [isSelected, isDragging, isHovering, isAnimating, zIndex]);

	/* Border radius */
	const pageIsOneRow = rows.length === 1;
	const isInFirstRow = row.order === 1;
	const isInLastRow = row.order === rows.length;
	const isOnlyTileInRow = tiles.length === 1;
	const tileBorderSize = 3;
	const cornerR = tileCornerRadius;
	let borderRadius = cornerR;
	if (!isSelected && !isDragging) {
		if (tile.order === 1 && isInFirstRow && !isOnlyTileInRow) {
			borderRadius = pageIsOneRow ? `${cornerR}px 0 0 ${cornerR}px` : `${cornerR}px 0 0 0`;
		}

		if (isOnlyTileInRow && !pageIsOneRow) {
			borderRadius = `${cornerR}px ${cornerR}px 0 0`;
		} 

		if (tile.order === 2 && isInFirstRow) {
			borderRadius = pageIsOneRow ? `0 ${cornerR}px ${cornerR}px 0` : `0 ${cornerR}px 0 0`;
		}

		if (tile.order === 1 && isInLastRow && !isInFirstRow) {
			borderRadius = isOnlyTileInRow ? `0 0 ${cornerR}px ${cornerR}px` : `0 0 0 ${cornerR}px`;
		}

		if (tile.order === 2 && isInLastRow && !isInFirstRow) {
			borderRadius = `0 0 ${cornerR}px 0`;
		}
		
		if (!isInFirstRow && !isInLastRow) {
			borderRadius = 0;
		}
	}

	/*
	Drag Handler
	*/
	const onTileRearrangeDrag = (x, y, commit = false, offsetX, offsetY) => {
		// console.log("onTileRearrangeDrag", x, y, commit);

		// Use these bools to update the tome data and indicator data only if necessary
		let shouldUpdate = false;
		let shouldUpdateDropIndicator = false;

		// We have to pick an axis to show the indicator
		// The tile is being dragged above its row, below its row,
		// or to the left or right within its row

		// Since it is a 2D space and the axis are not mutually exclusive,
		// there needs to be a priority like y axis first, then x:
		// Above > Below > Left > Right

		// Adjust pointer x & y to account for page position and margins
		y = y - pageTop - pageMargin;
		x = x - pageLeft - pageMargin;

		// What row is being dragged over?
		// What row gap is being dragged over?
		// What's the hit area? Just the rowMargin itself?

		let rowMarginY = 0;
		let rowTargetAreaHeight = rowHeight;
		let rowTargetOffset = (rowMargin - rowTargetAreaHeight) / 2;
		let dropY = null;
		let rowOver = null;
		let rowOverY = null;
		let newRowOrder = null;

		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		rows.forEach((r, i) => {
			// console.log(y, rowMarginY)
			let rH = rowHeight * r.height + rowMargin * (r.height - 1);
			if (
				// Check if it's at the top of the row
				y >= rowMarginY + rowTargetOffset &&
				y <= rowMarginY - rowTargetOffset
			) {
				if (tiles.length === 1 && r.order !== row.order) {
					// If it's a single-tile row
					if (r.order > row.order) {
						if (r.order - 1 !== row.order) {
							dropY = rowMarginY ;
							newRowOrder = r.order - 1; // place before
						}
					}
					if (r.order < row.order) {
						dropY = rowMarginY ;
						newRowOrder = r.order; // replace order
					}
				} else if (tiles.length > 1) {
					// If it's a multi-tile row
					dropY = rowMarginY ;
					newRowOrder = r.order; // replace order
					// console.log("setting roworder here: ", newRowOrder)
				}
			} else if (
				// Check if it's at the bottom of the page
				Math.round(rowMarginY + rH + rowMargin) >= Math.round(pageHeight - pageMargin) &&
				y >= rowMarginY + rH + rowTargetOffset
			) {
				dropY = rowMarginY + rH + rowMargin ;
				if (tiles.length === 1) {
					newRowOrder = r.order; // replace order
				} else {
					newRowOrder = r.order + 1; // add after last row
				}
			} else if (y >= rowMarginY && y <= rowMarginY + rH) {
				// If not within either top or bottom drop zone
				// set the row the pointer is currently over for x zone logic checking
				rowOver = r;
				rowOverY = rowMarginY;
			}
			if (dropY !== null && !tileDropInfo.show) {
				tileDropInfo.show = true;
				shouldUpdateDropIndicator = true;
			}
			if (dropY !== null) {
				if (tileDropInfo.y !== dropY) {
					if (
						tileDropInfo.width !== pageWidth - pageMargin * 2 ||
						tileDropInfo.height !== rowMargin ||
						tileDropInfo.x !== pageMargin ||
						tileDropInfo.y !== dropY
					) {
						shouldUpdateDropIndicator = true;
					}
					tileDropInfo.width = pageWidth - pageMargin * 2;
					tileDropInfo.height = rowMargin;
					tileDropInfo.x = pageMargin;
					tileDropInfo.y = dropY;
				}
				// console.log(dropY)
				if (commit) {
					if (row.tiles.length === 1 && row.order !== newRowOrder) {
						// console.log("single tile row new order: ", newRowOrder);
						/*
							- Single tile rows
							- just move position
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
						commit = false;
					}
					/*
						- More than 1 tile rows
						- Creates a new row
						- Removes tile from existing row and adds to new row
						- Updates widths of affected tiles
						- Increments or decrements orders of the other rows 
					*/
					if (row.tiles.length > 1) {
						/*
						Set new row height
						- TODO: consolidate this logic, also exists in TomeContext
						- either set as the current row height or set as min height depending on number of rows
						- if there are less than three rows, update other row's heights if allowed to try to squeeze in the new row
						*/
						let newRowHeight = rows.length >= 3 ? row.height : cRowMinHeight;
						// console.log("default newRowHeight", newRowHeight)
						if (tomeData.rows.length < 3) {
							// If new row isn't the last
							// And flexHeight is on
							// Set height to min

							// If total rows heights do not exceed the min page height (rowCount = 6)
							// Collapse other rows to the min row height
							if (rows.length === 1) {
								if (rows[0].flexHeight) {
									if (newRowOrder === 1) {
										newRowHeight = cRowMinHeight;
										rows[0].height = cRowCount - cRowMinHeight;
									} else {
										newRowHeight = cRowCount - cRowMinHeight;
										rows[0].height = cRowMinHeight;
									}
								} else if (rows[0].height <= cRowCount - cRowMinHeight) {
									newRowHeight = cRowCount - rows[0].height;
								}
							}
							if (rows.length === 2) {
								rows[0].height = cRowMinHeight;
								rows[1].height = cRowMinHeight;
								newRowHeight = cRowMinHeight;
							}
						}

						//console.log("2 tiles newRowOrder:", newRowOrder, newRowHeight, dropY, tomeData.rows.length, rows.length);

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
						commit = false;
					}
				}
			}
			rowMarginY += rowHeight * r.height + rowMargin * r.height;
		});

		let colGutterX = 0;
		let dropX = null;
		if (dropY === null) {
			// Done checking the y drop zones
			// Now check the x drop zones
			if (rowOver) {
				// Given the pointer x position and the row the pointer is in
				// What tile is it over?
				// Is the pointer on the left side of the first tile?
				// Or the right side of the second tile?
				// console.log(rowOver.tiles)
				rowOver.tiles.forEach(t => {

					let tW = columnWidth * t.width + columnGutter * (t.width - 1);
					let xO = tileLeft + offsetX;
					let threshold = 2/3;
					if (tile.order === 1) {
						xO += tileWidth;
						threshold = 1/3;
					}
					if (xO < 0) xO = 0;
					if (xO > pageWidth-(pageMargin*2)) xO = pageWidth - (pageMargin*2);

					if (xO >= colGutterX && xO <= (colGutterX + tW) && t.id !== tile.id) {
						const side = xO > colGutterX + (tW * threshold) ? "right" : "left";
						const isSameRow = tile.rowId === t.rowId;
						let newOrder = 0;


						if (side === "right") {
							newOrder = tile.order > t.order ? t.order + 1 : t.order;
							if ((isSameRow && newOrder !== tile.order) || (!isSameRow && rowOver.tiles.length <= 1)) {
								dropX = colGutterX + tW + pageMargin;
							}
						}
						if (side === "left") {
							newOrder = tile.order > t.order ? t.order : t.order - 1;
							if ((isSameRow && newOrder !== tile.order) || (!isSameRow && rowOver.tiles.length <= 1)) {
								dropX = colGutterX;
							}
						}
						// console.log(side, isSameRow, dropX, newOrder);
						if (dropX !== null && !tileDropInfo.show) {
							tileDropInfo.show = true;
							shouldUpdateDropIndicator = true;
						}
						if (dropX !== null) {
							if (
								tileDropInfo.width !== pageMargin ||
								tileDropInfo.height !== rowOver.height * rowHeight + (rowOver.height - 1) * rowMargin ||
								tileDropInfo.x !== dropX ||
								tileDropInfo.y !== rowOverY + pageMargin
							) {
								shouldUpdateDropIndicator = true;
							}
							tileDropInfo.width = pageMargin;
							tileDropInfo.height = rowOver.height * rowHeight + (rowOver.height - 1) * rowMargin;
							tileDropInfo.x = dropX;
							tileDropInfo.y = rowOverY + pageMargin;
							if (commit) {
								if (isSameRow) {
									// Make this super dumb since we're limiting row to 2 tiles
									tiles[0].order = 2;
									tiles[1].order = 1;
									shouldUpdate = true;
									commit = false;
								} else {
									// remove from old row
									tiles.splice(tiles.indexOf(tile), 1);
									// if old row has no more tiles, remove old row
									if (tiles.length === 0) {
										tomeData.rows.splice(tomeData.rows.indexOf(row), 1);
									} else {
										// update width and order of remaining tile
										tiles[0].width = cColumnCount;
										tiles[0].order = 1;
									}
									// add to new row
									tile.rowId = rowOver.id;
									tile.width = 6;
									tile.order = side === "left" ? 1 : 2;
									// update widths of tiles in other row
									rowOver.tiles[0].width = 6;
									rowOver.tiles[0].order = side === "left" ? 2 : 1;

									// check if all rows are tall enough
									let newTotalRowHeight = 0;
									tomeData.rows.forEach(tR => {
										newTotalRowHeight += tR.height;
									});
									if (newTotalRowHeight < cRowCount) {
										tomeData.rows[tomeData.rows.length - 1].height += cRowCount - newTotalRowHeight;
									}

									// commit it
									shouldUpdate = true;
									commit = false;
								}
							}
						}
					}
					colGutterX += columnWidth * t.width + columnGutter * t.width;
				});
			}
		}

		// Hide the drop indicator if none of the conditions are true and it's still showing
		if (dropX === null && dropY === null && tileDropInfo.show) {
			tileDropInfo.show = false;
			shouldUpdateDropIndicator = true;
		}

		if (shouldUpdateDropIndicator) {
			// console.log("shouldUpdate tileDropIndicator", tileDropInfo);
			setTileDropInfo({ ...tileDropInfo });
		}

		// Make the change to the data!
		// Commit rearrange
		if (shouldUpdate) {
			setIsAnimating(true);
			// console.log("shouldUpdate tomeData", tomeData);
			setTomeData({ ...tomeData });
		}
	};

	const draggingShadow = `0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
		0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
		0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)`;

	const onTextTileContentSizeChange = (width, height) => {
		const thisRowHeight = rowHeight * row.height + rowMargin * (row.height - 1);
		// console.log(height, thisRowHeight);

		if (height > thisRowHeight) {
			const makeUpRows = Math.round((height - thisRowHeight) / (rowHeight + rowMargin));
			// console.log("onContentSizeChange", width, height, row.height, thisRowHeight, makeUpRows, rowHeight);
			row.height += makeUpRows;
			setTomeData({ ...tomeData });
		}
	};


	return (
		<Wrap
			transition={transitions.layoutTransition}
			initial={{
				y: tileTop,
				x: tileLeft,
				width: tileWidth,
				height: tileHeight,
			}}
			animate={{
				y: tileTop,
				x: tileLeft,
				width: tileWidth,
				height: tileHeight,
				scale: isDragging ? 0.75 : isClicking ? 1 : 1,
				backgroundColor: isDragging ? colors.z2 : colors.z1,
				originX: dragStartOffsetLeft,
				originY: dragStartOffsetTop,
			}}
			key={tile.id}
			id={tile.id}
			style={{
				zIndex: zIndex,
				borderRadius: borderRadius,
				boxShadow: isDragging ? draggingShadow : "none",
			}}
			onAnimationStart={() => {
				// console.log("Started animating");
			}}
			onAnimationComplete={definition => {
				//console.log("Completed animating", definition);
				if (definition.scale === 1) {
					setIsAnimating(false);
					console.log("Completed animating", isAnimating)
				}
			}}
			onHoverStart={() => {
				if (!tileResizing) setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onPointerDown={() => {
				setShouldSelectTile(true);
				setIsClicking(true);
				// setDragStartOffsetLeft(0.5);
				// setDragStartOffsetTop(0.5);
			}}
			onPointerUp={() => {
				setIsClicking(false);
				if (shouldSelectTile) {
					// setIsHovering(false);
					setSelectedOutlinePage(null);
					setSelectedTile(tile);
					setShouldSelectTile(false);
				}
			}}
			drag={isSelected ? true : true}
			dragConstraints={{ left: tileLeft, right: tileLeft, top: tileTop, bottom: tileTop }}
			dragElastic={1}
			onDragStart={(event, info) => {
				onTileRearrangeDrag(info.point.x, info.point.y, false, info.offset.x, info.offset.y);
				/*
                Update pointer state
                */
				setShouldSelectTile(false);
				document.body.style.cursor = "grabbing";
				setIsDragging(true);
				/*

                */
				const tilePointerCenterXOffset = info.point.x - pageLeft - tileLeft;
				const tilePointerCenterYOffset = info.point.y - pageTop - tileTop;
				setDragStartOffsetLeft(tilePointerCenterXOffset / tileWidth);
				setDragStartOffsetTop(tilePointerCenterYOffset / tileHeight);

				//
				setIsAnimating(true);
			}}
			onDragEnd={(event, info) => {
				onTileRearrangeDrag(info.point.x, info.point.y, true, info.offset.x, info.offset.y);
				/*	
                        Reset ghost tile offsets
                    */
				setDragStartOffsetLeft(0);
				setDragStartOffsetTop(0);

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
			}}
			onDrag={(event, info) => {
				onTileRearrangeDrag(info.point.x, info.point.y, false, info.offset.x, info.offset.y);
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
						onContentSizeChange={onTextTileContentSizeChange}
						scale={scale}
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
				{tile.type === tileNames.FIGMA.name && <TileFigma tileSize={tile.size} />}
				{tile.type === tileNames.COLOR.name && <TileColor tileSize={tile.size} color={tile.params.color} />}
			</TileContent>
			<HoverOutline
				style={{
					borderRadius: borderRadius,
					// borderWidth: tileBorderSize,	
				}}
				animate={{
					opacity: isHovering || tileResizing ? 1 : 0,
					backgroundColor: tileResizing ? colors.accent20 : colors.white04,
					// backgroundColor: isDragging ? colors.accent50 : colors.white04,
				}}
				transition={{
					type: "ease",
					duration: 0.5,
				}}
				initial={false}
			/>
			<SelectedOutline
				style={{
					borderWidth: tileBorderSize,
					borderRadius: borderRadius,
					borderColor: colors.accent,
					// boxShadow: `inset 0px 0px 0px 0.5px rgba(51, 20, 50, 0.5)`,
					opacity: isSelected && !isDragging ? 1 : 0,
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
		</Wrap>
	);
};
