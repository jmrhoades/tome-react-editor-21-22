import React, { useState, createContext } from "react";

// import { TestTomeNullStates } from "./TestTomeNullStates";

import { TestTomeA } from "./TestTomeA";
import { panels } from "../panel/Panel";
import { metricConstants } from "./MetricsContext";

import { tileNames } from "../page/TileConstants";

export const BlankTome = {
	pages: [
		{
			id: "page1",
			order: 1,
		},
	],
	rows: [
		{
			id: "row1",
			pageId: "page1",
			order: 1,
			height: 6,
			flexHeight: true,
		},
	],
	tiles: [
		{
			id: "tile1",
			pageId: "page1",
			rowId: "row1",
			order: 1,
			width: 12,
			type: tileNames.TEXT.name,
			params: {},
		},
	],
};

export const permissions = {
	COMMENT_ONLY: "Comment only",
	EDITOR: "Editor",
};

export const newPage = (order = 1) => {
	const pageId = "page" + Math.round(Math.random() * 10000);
	return {
		id: pageId,
		order: order,
	};
};

export const newRowForPage = pageId => {
	const rowId = "row" + Math.round(Math.random() * 10000);
	return {
		id: rowId,
		pageId: pageId,
		order: 1,
		height: metricConstants.cRowCount,
		flexHeight: true,
	};
};

export const newTileForNewPageAndRow = (pageId, rowId) => {
	const tileId = "tile" + Math.round(Math.random() * 10000);
	return {
		id: tileId,
		pageId: pageId,
		rowId: rowId,
		order: 1,
		width: 12,
		type: tileNames.TEXT.name,
		params: {},
	};
};

export const createRow = (pageId, order, height) => {
	const newRow = {
		id: "row" + Math.round(Math.random() * 10000),
		pageId: pageId,
		order: order,
		height: height,
		flexHeight: true,
	};
	return newRow;
};

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	/*
	Property panel state
	*/
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	const [panelName, setPanelName] = useState(panels.TILES);

	/* 
	Editor state
	*/
	const [editorState, setEditorState] = useState("editing");

	/* 
	Permissions
	*/
	const [permission, setPermission] = useState(permissions.EDITOR);

	/*
	Tome Data
	*/
	const [tomeData, setTomeData] = useState(TestTomeA);
	tomeData.pages.sort((a, b) => (a.order > b.order ? 1 : -1));

	/* 
	Tile State
	*/
	const [selectedTile, setSelectedTile] = useState(null);
	const [rowResizing, setRowResizing] = useState(null);
	const [tileDropInfo, setTileDropInfo] = useState({ show: false, x: -1, y: -1, height: 0, width: 0 });
	const [isTileAnimating, setIsTileAnimating] = useState(false);

	/*
	Pages
	*/
	const [currentPage, setCurrentPage] = useState(tomeData.pages[0]);
	const [previousPage, setPreviousPage] = useState(null);
	const [selectedOutlinePage, setSelectedOutlinePage] = useState("");

	const addPage = () => {
		// Find the current page
		const cPage = tomeData.pages.find(({ id }) => id === currentPage.id);
		// console.log("addPage", tomeData.pages, cPage);

		// Make new page, insert it after current page
		const nPage = newPage(cPage.order + 1);
		const nRow = newRowForPage(nPage.id);
		const nTile = newTileForNewPageAndRow(nPage.id, nRow.id);

		const index = tomeData.pages.indexOf(cPage);
		tomeData.pages.splice(index + 1, 0, nPage);
		tomeData.rows.push(nRow);
		tomeData.tiles.push(nTile);
		// Increment order value for every page after new page
		for (let i = 0; i < tomeData.pages.length; i++) {
			if (index + 1 < i) {
				tomeData.pages[i].order++;
			}
		}
		// Sort array by order
		tomeData.pages.sort(function (a, b) {
			return a.order - b.order;
		});

		// Update tome data
		setTomeData({ ...tomeData });
		// console.log("addPage", tomeData);

		// Set current page to new page
		showPage(nPage, true);

		// deselect stuff
		// setSelectedTile(null);
		// setPanelOpen(false);
		// setPanelName("");
	};

	const goToNextPage = () => {
		const nextPage = tomeData.pages.find(page => page.order === currentPage.order + 1);
		if (nextPage) {
			showPage(nextPage);
			if (selectedOutlinePage) setSelectedOutlinePage(nextPage);
		}
	};

	const goToPreviousPage = () => {
		const previousPage = tomeData.pages.find(page => page.order === currentPage.order - 1);
		if (previousPage) {
			showPage(previousPage);
			if (selectedOutlinePage) setSelectedOutlinePage(previousPage);
		}
	};

	const showPage = (page, isNew = false) => {
		if (page.id === currentPage.id) return;
		if (currentPage) {
			setPreviousPage(currentPage);
		}
		setCurrentPage(page);

		// window.scrollTo({top:0, left:0});

		// deselect stuff
		setSidePanelOpen(false);
		setPanelName("");
		setSelectedTile(null);

		// Remove new page ID
		if (tomeData.newTileID) {
			tomeData.newTileID = null;
			tomeData.newTileInfo = null;
			setTomeData({ ...tomeData });
		}
	};

	const selectOutlinePage = page => {
		//if (currentPage.id === page.id) {
			if (selectTile) setSelectedTile(null);
			setSelectedOutlinePage(page);	
		//}
		setCurrentPage(page);
		// Remove new page ID
		if (tomeData.newTileID) {
			tomeData.newTileID = null;
			tomeData.newTileInfo = null;
			setTomeData({ ...tomeData });
		}
	};

	const deletePage = page => {
		// Don't delete the last page!
		if (tomeData.pages.length === 1) return false;

		// Find the index of the page in the pages array
		const index = tomeData.pages.indexOf(page);

		// Show either the previous or next page
		if (page === currentPage) {
			// Find the page before
			const newPage = tomeData.pages[index - 1] ? tomeData.pages[index - 1] : tomeData.pages[index + 1];
			setCurrentPage(newPage);
			if (selectedOutlinePage) setSelectedOutlinePage(newPage);
		}

		// Remove the page from the tome data
		const deletedPage = tomeData.pages.splice(index, 1)[0];

		// Sort remaining pages array by order
		tomeData.pages.sort(function (a, b) {
			return a.order - b.order;
		});

		// Re-assign orders
		// Increment order value for every page after new page
		for (let i = 0; i < tomeData.pages.length; i++) {
			tomeData.pages[i].order = i + 1;
		}

		// Update tome data
		console.log("delete at index ", index, page, deletedPage);
		setTomeData({ ...tomeData });
	};

	/*
	Tiles
	*/

	const addTileToRow = (tileName, row) => {
		const { cColumnCount, cRowDefaultHeight } = metricConstants;

		let tileTypeInfo = {defaultHeight: cRowDefaultHeight}
		for (const prop in tileNames) {
			if (tileNames[prop].name && tileNames[prop].name === tileName) {
				tileTypeInfo = tileNames[prop];
			}
		}

		// Get the current rows of the current page
		// sort them by order
		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		// If no row specified, set to last row of the current page
		if (row === undefined) row = rows[rows.length - 1];
		// Find the number of tiles in the current row
		let tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === row.id;
		});
		// If too many tiles, add a new row, reset tiles arrays
		if (tiles.length >= 2) {
			
			/*
			let newRowHeight = rows.length >= 3 ? cRowMinHeight : cRowCount;
			// If total rows heights do not exceed the min page height (rowCount = 6)
			// Collapse other rows to the min row height
			if (rows.length === 1) {
				if (rows[0].flexHeight) {
					rows[0].height = cRowMinHeight;
					newRowHeight = cRowCount - cRowMinHeight;
				} else if (rows[0].height <= cRowCount - cRowMinHeight) {
					newRowHeight = cRowCount - rows[0].height;
				}
			}
			if (rows.length === 2) {
				rows[0].height = cRowMinHeight;
				rows[1].height = cRowMinHeight;
				newRowHeight = cRowMinHeight;
			}
			*/
			let newRowHeight = tileTypeInfo.defaultHeight;
			console.log("newRowHeight", newRowHeight)
			row = createRow(currentPage.id, rows[rows.length - 1].order + 1, newRowHeight);
			tomeData.rows.push(row);
			tiles = [];
		}

		// Create new tile
		const tile = {
			id: "tile" + Math.round(Math.random() * 10000),
			pageId: currentPage.id,
			rowId: row.id,
			order: tiles.length + 1,
			width: 0,
			type: tileName,
			params: {},
		};
		tiles.push(tile);

		// Redistribute widths across tiles in the row
		let newTileWidth = cColumnCount / tiles.length;
		tiles.forEach(t => {
			t.width = newTileWidth;
		});

		// Add the tile to the tome data
		tomeData.tiles.push(tile);
		// Add the new tile id to tomeData
		tomeData.newTileID = tile.id;
		// console.log(tomeData)
		setTomeData({ ...tomeData });

		// Select the new tile
		selectTile(tile);
		// setTimeout(() => selectTile(tile), 2000);
	};

	const deleteTile = tile => {
		const { cRowCount } = metricConstants;

		// Don't delete last tile
		if (tomeData.tiles.length === 1) return false;

		// Find the tile
		const index = tomeData.tiles.indexOf(tile);
		// Remove the tile from the tome data
		const deletedTile = tomeData.tiles.splice(index, 1)[0];
		// Find the other tiles in the same page
		const otherTilesOnPage = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id;
		});
		// Find the other tiles in the same row
		const tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === deletedTile.rowId;
		});
		// Sort the tiles by order
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		if (tiles.length === 0) {
			// That was the last tile in the row
			const row = tomeData.rows.filter(row => {
				return row.id === deletedTile.rowId;
			})[0];
			// Remove the row
			const rowIndex = tomeData.rows.indexOf(row);
			tomeData.rows.splice(rowIndex, 1);

			// Remaining rows on same page as deleted tile
			const rows = tomeData.rows.filter(r => {
				return deletedTile.pageId === r.pageId;
			});
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));

			// check if all rows are tall enough
			let newTotalRowHeight = 0;
			rows.forEach(tR => {
				newTotalRowHeight += tR.height;
			});
			const lastRow = rows[rows.length - 1];
			newTotalRowHeight -= lastRow.height;
			// console.log(cRowCount, newTotalRowHeight, lastRow.height, tomeData.rows.length)
			// if not, make the last row tall enough for a page height
			if (newTotalRowHeight < cRowCount) {
				lastRow.height = tomeData.rows.length === 1 ? cRowCount : cRowCount - newTotalRowHeight;
			}
		} else if (tiles.length === 1) {
			tiles[0].width = 12;
			tiles[0].order = 1;
		} else if (tiles.length === 2) {
			tiles[0].width = 6;
			tiles[0].order = 1;
			tiles[1].width = 6;
			tiles[1].order = 2;
		}

		if (selectedTile && selectedTile.id === tile.id) {
			// If tile was selected, select first tile on page
			let newSelectedTile = otherTilesOnPage[0];
			selectTile(newSelectedTile);
		}

		// Update tome data
		// console.log("delete at index ", index, deletedTile);
		setTomeData({ ...tomeData });
	};

	const selectTile = tile => {
		if (selectedOutlinePage) {
			setSelectedOutlinePage(null);
		}
		setSelectedTile(tile);
		// update property panel
		setPanelName(tile.type);
		setSidePanelOpen(true);
	};

	return (
		<TomeContext.Provider
			value={{
				sidePanelOpen,
				setSidePanelOpen,

				panelName,
				setPanelName,

				currentPage,
				setCurrentPage,
				previousPage,

				addPage,
				goToNextPage,
				goToPreviousPage,

				permission,
				setPermission,

				editorState,
				setEditorState,

				selectedOutlinePage,
				setSelectedOutlinePage,
				deletePage,
				selectOutlinePage,

				selectedTile,
				setSelectedTile,
				selectTile,

				isTileAnimating,
				setIsTileAnimating,

				rowResizing,
				setRowResizing,

				tileDropInfo,
				setTileDropInfo,

				tomeData,
				setTomeData,

				addTileToRow,
				deleteTile,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
