import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
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
`;

const Content = styled(motion.div)`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PanelContainer = styled(motion.div)``;

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
	} = useContext(TomeContext);
	const { pageLeft, pageWidth, pageTop, pageMargin, rowHeight, rowMargin, viewportHeight, minPageHeight, dropIndicatorSize } =
		useContext(MetricsContext).metrics;

	const panelWidth = metricConstants.cPanelWidth;

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
	// console.log(rows);
	// Find the page height
	let dPageTop = pageTop;
	let pageHeight = pageMargin;
	rows.forEach(r => {
		pageHeight += rowHeight * r.height + rowMargin * r.height;
	});
	pageHeight -= rowMargin;
	pageHeight += pageMargin;
	// Find the page top
	if (pageHeight > minPageHeight) {
		const minY = metricConstants.cPageMinMarginY;
		const minH = viewportHeight - minY - minY;
		if (pageHeight < minH) {
			dPageTop = (viewportHeight - pageHeight) / 2;
		} else {
			dPageTop = minY;
		}
	}

	const onAddTileDragEnd = (tileName, x, y) => {
		/*	
		Hide drop indicator
        
		if (tileDropInfo.show === true) {
			tileDropInfo.show = false;
			setTileDropInfo({ ...tileDropInfo });
		}
		*/

		// Adjust pointer x & y to be tile-relative by
		// subtracting page position and margins
		x = x - pageLeft - pageMargin;
		y = y - dPageTop - pageMargin;

		console.log("onAddTileDragEnd", tileName, x, y);
	};

	const onAddTileDrag = (tileName, x, y, commit = false) => {
		// Use these bools to update the tome data and indicator data only when necessary
		let shouldUpdate = false;
		let shouldUpdateDropIndicator = false;

		// Adjust pointer x & y to be tile-relative by
		// subtracting page position and margins
		x = x - pageLeft - pageMargin;
		y = y - dPageTop - pageMargin;

		// console.log("onAddTileDrag", tileName, x, y, commit);

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
		let dropX = null;
		let side = "";
		const withinPageWidth = x >= 0 && x <= pageWidth;

		// Loop through all the rows on the current page
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		rows.forEach((r, i) => {
			// find the current row's height
			let rH = rowHeight * r.height + rowMargin * (r.height - 1);
			// console.log(y, rowMarginY, rH);
			// check the coordinates of the dragging object
			// against the current row's y position and height
			
			// which row is y over?
			if (
				// Check if it's at the top of the current row
				withinPageWidth &&
				y >= rowMarginY &&
				y <= rowMarginY + rH
			) {
				rowOver = r;
			}

			 if (
				// Check if it's at the top of the current row
				withinPageWidth &&
				y >= rowMarginY + rowTargetOffset &&
				y <= rowMarginY - rowTargetOffset
			) {
				dropY = rowMarginY + pageMargin;
				//rowOver = r;
				newRowOrder = r.order;
			} else if (
				// Check if it's at the bottom of the last row
				withinPageWidth &&
				Math.round(rowMarginY + rH + rowMargin) >= Math.round(pageHeight - pageMargin) &&
				y >= rowMarginY + rH + rowTargetOffset &&
				y <= rowMarginY + rH - rowTargetOffset
			) {
				dropY = rowMarginY + rH + rowMargin - dropIndicatorSize;
				//rowOver = r;
				newRowOrder = r.order + 1;
			} else if (y >= rowMarginY && y <= rowMarginY + rH && withinPageWidth) {
				// If not within either top or bottom drop zone
				// set the row the pointer is currently over for x zone logic checking
				//rowOver = r;
				rowOverY = rowMarginY;
			}

			// calculate next row y position
			rowMarginY += rowHeight * r.height + rowMargin * r.height;
		});

		// Done checking the y drop zones
		// Now check the x drop zones
		if (dropY === null && rowOver) {
			// which side of the tile is the dragging tile on?
			side = x >= pageWidth / 2 ? "right" : "left";
			if (rowOver.tiles.length === 1) {
				dropX = side === "left" ? pageMargin : pageWidth - pageMargin - dropIndicatorSize;
			}
			if (rowOver.tiles.length === 2) {
				dropY = rowMarginY - dropIndicatorSize;
				newRowOrder = rowOver.order + 1;
				console.log(tileDropInfo)
			}
		}

		// Update the drop Y indicator
		if (dropY !== null && !tileDropInfo.show) {
			tileDropInfo.show = true;
			shouldUpdateDropIndicator = true;
		}
		if (dropY !== null) {
			if (tileDropInfo.y !== dropY) {
				if (
					tileDropInfo.width !== pageWidth - pageMargin * 2 ||
					tileDropInfo.height !== dropIndicatorSize ||
					tileDropInfo.x !== pageMargin ||
					tileDropInfo.y !== dropY
				) {
					shouldUpdateDropIndicator = true;
				}
				tileDropInfo.width = pageWidth - pageMargin * 2;
				tileDropInfo.height = dropIndicatorSize;
				tileDropInfo.x = pageMargin;
				tileDropInfo.y = dropY;
				tileDropInfo.type = "add";
			}
			if (commit) {
				let newRowHeight = 4;

				// Create a new row
				const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);

				// Create new tile
				const tile = {
					id: "tile" + Math.round(Math.random() * 10000),
					pageId: currentPage.id,
					rowId: newRow.id,
					order: 1,
					width: 12,
					type: tileName,
					params: {},
				};

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
				tomeData.tiles.push(tile);
				// Commit the change to the tome data
				shouldUpdate = true;

				// Hide the drop indicator
				shouldUpdateDropIndicator = true;
				tileDropInfo.show = false;

				// Select the new tile
				setSelectedTile(tile);
				setPanelName(tileName);

				// Add the new tile id to tomeData
				tomeData.newTileID = tile.id;
			}
		}

		// Update the drop X indicator
		if (dropX !== null && !tileDropInfo.show) {
			tileDropInfo.show = true;
			shouldUpdateDropIndicator = true;
		}
		if (dropX !== null) {
			if (
				tileDropInfo.width !== dropIndicatorSize ||
				tileDropInfo.height !== rowOver.height * rowHeight + (rowOver.height - 1) * rowMargin ||
				tileDropInfo.x !== dropX ||
				tileDropInfo.y !== rowOverY + pageMargin
			) {
				shouldUpdateDropIndicator = true;
			}
			tileDropInfo.width = dropIndicatorSize;
			tileDropInfo.height = rowOver.height * rowHeight + (rowOver.height - 1) * rowMargin;
			tileDropInfo.x = dropX;
			tileDropInfo.y = rowOverY + pageMargin;
			tileDropInfo.type = "add";
			if (commit) {
				// Create new tile
				const tile = {
					id: "tile" + Math.round(Math.random() * 10000),
					pageId: currentPage.id,
					rowId: rowOver.id,
					order: side === "left" ? 1 : 2,
					width: 6,
					type: tileName,
					params: {},
				};

				// Update other tile
				rowOver.tiles[0].width = 6;
				rowOver.tiles[0].order = side === "left" ? 2 : 1;

				// Add the new tile to the tome data
				tomeData.tiles.push(tile);
				// Commit the change to the tome data
				shouldUpdate = true;

				// Hide the drop indicator
				shouldUpdateDropIndicator = true;
				tileDropInfo.show = false;

				// Select the new tile
				setSelectedTile(tile);
				setPanelName(tileName);

				// Add the new tile id to tomeData
				tomeData.newTileID = tile.id;
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

		// Commit the new tile change
		if (shouldUpdate) {
			console.log(tomeData);
			setTomeData({ ...tomeData });
		}

		return shouldUpdate;
	};

	return (
		<Wrap
			style={{
				width: panelWidth,
				pointerEvents: sidePanelOpen ? "auto" : "none",
				zIndex: 999,
			}}
		>
			<Content
				style={{
					width: panelWidth,
					transformOrigin: "100% 44%",
				}}
				transition={sidePanelOpen ? transitions.layoutTransition : transitions.quickEase}
				animate={{
					scale: sidePanelOpen ? 1 : 0.9,
					x: sidePanelOpen ? 0 : 0,
					opacity: sidePanelOpen ? 1 : 0,
				}}
				initial={false}
			>
				{panelName === panels.TILES && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
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
									onAddTileDrag={onAddTileDrag}
									onAddTileDragEnd={onAddTileDragEnd}
								/>
							))}
						</TileTypes>
					</PanelContainer>
				)}
				{panelName === panels.OVERLAY && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
						
					>
						<PanelImage width="240" height="168" src="/images/panel-overlay-a.png" />
					</PanelContainer>
				)}
				{panelName === panels.ANNOTATIONS && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="144" src="/images/panel-annotations-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.TEXT.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="304" src="/images/panel-text-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.IMAGE.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="256" src="/images/panel-image-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.VIDEO.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="264" src="/images/panel-video-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.TABLE.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="180" src="/images/panel-table-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.CODE.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="152" src="/images/panel-code-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.WEB.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="119" src="/images/panel-web-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.TWITTER.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="119" src="/images/panel-twitter-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.GIPHY.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="282" src="/images/panel-giphy-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.AIRTABLE.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="119" src="/images/panel-airtable-a.png" />
					</PanelContainer>
				)}
				{panelName === tileNames.FIGMA.name && (
					<PanelContainer
						style={{
							width: panelWidth,
							backgroundColor: colors.z1,
							borderRadius: 16,
						}}
					>
						<PanelImage width="240" height="119" src="/images/panel-figma-a.png" />
					</PanelContainer>
				)}
			</Content>
		</Wrap>
	);
};
