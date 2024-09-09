import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { colors } from "../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext, createRow } from "../tome/TomeContext";
import { AddTileButton } from "./AddTileButton";

import { tileNames } from "../page/TileConstants";

export const panels = {
	TILES: "tiles",
	OVERLAY: "overlay",
	ANNOTATIONS: "annotations",
};

const Wrap = styled(motion.div)`
	position: fixed;
	right: 64px;
	top: 0;
	height: 100%;
	pointer-events: none;
`;

const Content = styled(motion.div)`
	height: 100%;
	/* display: flex;
	align-items: center;
	justify-content: center; */
	position: relative;
`;

const PanelContainer = styled(motion.div)`
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
`;

const PanelImage = styled(motion.img)`
	display: block;
`;

const AddTileInput = styled(motion.div)`
	height: 48px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	& input {
		outline: none;
		border: none;
		background-image: none;
		background-color: transparent;
		box-shadow: none;
		font-size: 17px;
		line-height: 22px;
		color: white;
		padding: 14px 12px 12px;
	}
`;

const TileTypes = styled(motion.div)`
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, 102px);
	grid-template-rows: repeat(5, 102px);
	column-gap: 12px;
	row-gap: 12px;
	padding: 12px;
`;

export const Panel = props => {
	const {
		sidePanelOpen,
		panelName,
		setPanelName,
		tomeData,
		setTomeData,
		currentPage,
		tileDropInfo,
		setTileDropInfo,
		setSelectedTile,
		isPlayMode,
	} = useContext(TomeContext);
	const { 
		metrics,
		getTileY,
		scrollWindowToY,
		getTileHeight
	} = useContext(MetricsContext);
	const {
		pageLeft,
		pageWidth,
		pageTop,
		pageMargin,
		rowHeight,
		rowMargin,
		viewportHeight,
		minPageHeight,
		dropIndicatorSize,
	} = metrics;

	const panelWidth = metricConstants.cPanelWidth;
	const rowMinHeight = metricConstants.cRowMinHeight;
	const cRowDefaultHeight = metricConstants.cRowDefaultHeight;

	// console.log(panelName, tileNames.TEXT.name, sidePanelOpen);

	// "Text", "Image", "Video", "Table", "Code", "Web", "Twitter", "Giphy", "Airtable", "Figma"
	const availableTiles = [
		tileNames.TEXT,
		tileNames.IMAGE,
		tileNames.VIDEO,
		tileNames.TABLE,
		tileNames.CODE,
		tileNames.WEB,
		tileNames.TWITTER,
		tileNames.GIPHY,
		tileNames.AIRTABLE,
		tileNames.FIGMA,
	];

	// const [isAddTileDragging, setIsAddTileDragging] = useState(false);

	//
	// pageHeight and pageTop are needed for hit checking
	// TODO: move this code to metricsContext or somethings
	//

	// Find all the rows that belong to the current page
	const rows = tomeData.rows.filter(row => {
		return row.pageId === currentPage.id;
	});
	//rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	// Find the tiles for each row
	rows.forEach(row => {
		row.tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === row.id;
		});
		row.tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
	});

	const getPageTop = rows => {
		let dPageTop = pageTop;
		let pageHeight = pageMargin;
		rows.forEach(r => {
			pageHeight += rowHeight * r.height + rowMargin * r.height;
		});
		pageHeight -= rowMargin;
		pageHeight += pageMargin;
		// Find the page top
		if (pageHeight > minPageHeight) {
			const minY = metricConstants.cPageMinY;
			const minH = viewportHeight - minY - minY;
			if (pageHeight < minH) {
				dPageTop = (viewportHeight - pageHeight) / 2;
			} else {
				dPageTop = minY;
			}
		}
		return dPageTop;
	};
	// console.log(rows);
	// Find the page height
	let dPageTop = getPageTop(rows);

	const onAddTileDragStart = (tileName, x, y) => {
		// console.log("onAddTileDragStart", tileName, x, y);
		panelZIndex.set(999);
		// Make sure the rows are sorted by order
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	};

	const onAddTileDragEnd = () => {
		//console.log("onAddTileDragEnd");
		//panelZIndex.set(0);
	};

	const onAddTileDrag = (tileName, x, y, commit) => {
		// Use these bools to update the tome data and indicator data only when necessary
		let shouldUpdate = false;
		let shouldUpdateDropIndicator = false;

		// Adjust pointer x & y to be page-relative by
		// subtracting page position and margins
		x = x - pageLeft - pageMargin;
		y = y - dPageTop - pageMargin;

		// Is the pointer within the page x-bounds?
		// Exit if not
		const withinPageWidth = x >= 0 && x <= pageWidth;
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

		// New tile
		let newRowHeight = rowMinHeight;
		let newTile = {};
		let shouldSelectTile = false;

		// Rows must be sorted every time, y checking assumes sorted rows
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		rows.forEach((r, i) => {
			// Current row's height
			let rH = rowHeight * r.height + rowMargin * (r.height - 1);
			if (
				// Is the pointer within the top rowTargetOffset area of the first row?
				r.order === 1 &&
				y <= rowMarginY + rowTargetOffset
			) {
				dropY = rowMarginY + pageMargin;
				dropYTarget = true;
				newRowOrder = r.order;
				// console.log("pointer within top rowTargetOffset of row ", r.order);
			} else if (
				// Is the pointer within the bottom rowTargetOffset area of the last row?
				r.order === rows.length &&
				y >= rowMarginY + rH - rowTargetOffset
			) {
				dropY = rowMarginY + rH + rowMargin - dropIndicatorSize;
				dropYTarget = true;
				newRowOrder = r.order + 1;
				// console.log("pointer within bottom rowTargetOffset of row ", r.order);
			} else if (
				// Is the pointer within the top rowTargetOffset area of the current row?
				y >= rowMarginY - rowTargetOffset &&
				y <= rowMarginY + rowTargetOffset
			) {
				dropY = rowMarginY + pageMargin;
				dropYTarget = true;
				newRowOrder = r.order;
				// console.log("pointer within rowTargetOffset of row ", r.order);
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

		// Done checking the y drop zones
		// Now check the x drop zones
		if (!dropYTarget && rowOver) {
			dropXTarget = true;
			// which side of the tile is the dragging tile on?
			side = x <= pageWidth / 2 ? "left" : "right";
			dropX = side === "right" ? pageWidth - pageMargin : pageMargin;
			// What if there's two tiles?
			if (rowOver.tiles.length === 2) {
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
				}
			}
		}

		// Make sure the indicator shows if there's a valid target
		if ((dropYTarget || dropXTarget) && !tileDropInfo.show) {
			tileDropInfo.show = true;
			tileDropInfo.type = "add";
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
				tileDropInfo.dropX = dropXTarget ? true : false;
				tileDropInfo.newTileWidth = dropXTarget ? (pageWidth - pageMargin * 2 - rowMargin) / 2 : iW;
				tileDropInfo.newTileHeight = dropXTarget
					? rowOverHeight
					: rowHeight * rowMinHeight + rowMargin * (rowMinHeight - 1);

				tileDropInfo.draggableWidth = 72;
				tileDropInfo.draggableHeight = 72;

				/*
				let fixedSide = 72;
				let ratio = tileDropInfo.newTileWidth / tileDropInfo.newTileHeight;
				tileDropInfo.draggableWidth = fixedSide * ratio;
				if (tileDropInfo.draggableWidth > 240 ) tileDropInfo.draggableWidth = 240;
				tileDropInfo.draggableHeight = fixedSide;
				if (tileDropInfo.newTileHeight > tileDropInfo.newTileWidth) {
					ratio = tileDropInfo.newTileHeight / tileDropInfo.newTileWidth;
					tileDropInfo.draggableWidth = fixedSide;
					tileDropInfo.draggableHeight = fixedSide * ratio;
				}
				*/

				if (tileDropInfo.height < tileDropInfo.width) {
					tileDropInfo.draggableHeight = 72;
					tileDropInfo.draggableWidth = tileDropInfo.draggableHeight * 2.5;
				}

				shouldUpdateDropIndicator = true;
			}
		}

		if (commit) {
			if (dropYTarget || dropXTarget) {
				// Create new tile
				newTile = {
					id: "tile" + Math.round(Math.random() * 10000),
					pageId: currentPage.id,
					order: 1,
					width: 12,
					type: tileName,
					params: {},
				};
				let tileTypeInfo = { defaultHeight: cRowDefaultHeight };
				for (const prop in tileNames) {
					if (tileNames[prop].name && tileNames[prop].name === tileName) {
						tileTypeInfo = tileNames[prop];
						newRowHeight = tileTypeInfo.defaultHeight;
					}
				}
			}

			if (dropYTarget) {
				// Create a new row
				const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);
				// Update new tile
				newTile.rowId = newRow.id;
				// Update existing rows' orders
				rows.forEach((rO, j) => {
					const order = j + 1;
					if (newRowOrder <= rO.order) {
						rO.order = order + 1;
					}
				});
				// Add the new row to the tome data
				tomeData.rows.push(newRow);
				// Add the new tile to the tome data
				tomeData.tiles.push(newTile);
				// Select the new tile
				shouldSelectTile = true;
				// Add the new tile id to tomeData
				tomeData.newTileID = newTile.id;
				tomeData.newTileInfo = {
					dropX: x,
					dropY: y,
				};
				// Commit the change to the tome data
				shouldUpdate = true;
			}

			if (dropXTarget) {
				// Update new tile
				newTile.rowId = rowOver.id;
				newTile.order = side === "left" ? 1 : 2;
				newTile.width = 6;
				if (rowOver.tiles.length === 1) {
					// Update other tile
					rowOver.tiles[0].width = 6;
					rowOver.tiles[0].order = side === "left" ? 2 : 1;
				} else if (rowOver.tiles.length === 2) {
					if (side === "left") {
						console.log("push 2 out of the way!");
						// Move tile 1 to order 2
						rowOver.tiles[0].order = 2;
					}

					// Create a new row
					newRowOrder = rowOver.order + 1;
					newRowHeight = rowOver.height;
					const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);
					// Move right tile to new row
					rowOver.tiles[1].rowId = newRow.id;
					rowOver.tiles[1].width = 12;
					rowOver.tiles[1].order = 1;
					// Update existing rows' orders
					rows.forEach((rO, j) => {
						const order = j + 1;
						if (newRowOrder <= rO.order) {
							rO.order = order + 1;
						}
					});
					// Add the new row to the tome data
					tomeData.rows.push(newRow);
					// Update the new tile data with
				}

				// Add the new tile to the tome data
				tomeData.tiles.push(newTile);
				// Select the new tile
				shouldSelectTile = true;
				// Add the new tile id to tomeData
				tomeData.newTileID = newTile.id;
				tomeData.newTileInfo = {
					dropX: x,
					dropY: y,
					tileX: 0,
					tileY: 0,
				};
				// Commit the change to the tome data
				shouldUpdate = true;

				
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
			// Tell the button about the new page top and tile position

			tileDropInfo.dropButtonOffsetX = pageLeft + pageMargin;
			if (newTile.order === 2) {
				tileDropInfo.dropButtonOffsetX += (pageWidth - pageMargin * 2 - rowMargin) / 2 + rowMargin; // left edge of right tile
			}

			const uRows = tomeData.rows.filter(row => {
				return row.pageId === currentPage.id;
			});
			tileDropInfo.dropButtonOffsetY = getPageTop(uRows);
			let dropButtonTileTop = pageMargin;

			// the row the tile is in
			const uRow = tomeData.rows.filter(r => {
				return r.id === newTile.rowId;
			})[0];

			if (uRow.order !== 1) {
				uRows.forEach(r => {
					// Find all the rows with orders less than this row
					// add up their heights
					if (r.order < uRow.order) {
						dropButtonTileTop +=
							r.height === 0
								? minPageHeight - pageMargin * 2
								: rowHeight * r.height + rowMargin * (r.height - 1);
						dropButtonTileTop += rowMargin;
					}
				});
			}
			tileDropInfo.dropButtonTileTop = dropButtonTileTop;

			if (shouldSelectTile) {
				setSelectedTile(newTile);
				setPanelName(tileName);
				//tileDropInfo.newTile = newTile;
			}
			// Commit
			//console.log(tomeData);
			setTomeData({ ...tomeData });

			// Scroll to new tile
			const tileY = getTileY(newTile);
			const tileHeight = getTileHeight(newTile);
			console.log("tileY", tileY, "tileHeight", tileHeight);
			const sY = Math.round(tileY + tileHeight);
			scrollWindowToY(sY);
		}

		return shouldUpdate;
	};

	const panelZIndex = useMotionValue(0);

	return (
		<Wrap
		animate={{
			opacity: isPlayMode ? 0 : 1,
		}}
		initial={false}
		transition={transitions.playModeFade}
			style={{
				width: panelWidth,
				zIndex: panelZIndex,
				pointerEvents: "none",
			}}
		>
			<Content
				style={{
					width: panelWidth,
					transformOrigin: "100% 44%",
					pointerEvents: "none",
				}}
				transition={transitions.layoutTransition}
				animate={{
					scale: sidePanelOpen ? 1 : 0.9,
					x: sidePanelOpen ? 0 : 0,
					opacity: sidePanelOpen ? 1 : 0,
				}}
				initial={false}
			>
				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
						pointerEvents: panelName === panels.TILES ? "auto" : "none",
					}}
					animate={{
						opacity: panelName === panels.TILES ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<AddTileInput>
						<input
							placeholder={"Add something…"}
							style={{
								caretColor: colors.accent,
							}}
						/>
					</AddTileInput>

					<TileTypes>
						{availableTiles.map(tileType => (
							<AddTileButton
								tileName={tileType.name}
								tileIcon={tileType.icon}
								key={tileType.name}
								onAddTileDragStart={onAddTileDragStart}
								onAddTileDrag={onAddTileDrag}
								onAddTileDragEnd={onAddTileDragEnd}
							/>
						))}
					</TileTypes>
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === panels.OVERLAY ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="168" src="/images/panel-overlay-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === panels.ANNOTATIONS ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="144" src="/images/panel-annotations-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.TEXT.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="304" src="/images/panel-text-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.IMAGE.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="256" src="/images/panel-image-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.VIDEO.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="264" src="/images/panel-video-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.TABLE.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="180" src="/images/panel-table-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.CODE.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="152" src="/images/panel-code-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.WEB.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="119" src="/images/panel-web-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.TWITTER.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="119" src="/images/panel-twitter-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.GIPHY.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="282" src="/images/panel-giphy-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.AIRTABLE.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="119" src="/images/panel-airtable-a.png" />
				</PanelContainer>

				<PanelContainer
					style={{
						width: panelWidth,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
					animate={{
						opacity: panelName === tileNames.FIGMA.name ? 1 : 0,
					}}
					initial={{
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<PanelImage width="240" height="119" src="/images/panel-figma-a.png" />
				</PanelContainer>
			</Content>
		</Wrap>
	);
};
