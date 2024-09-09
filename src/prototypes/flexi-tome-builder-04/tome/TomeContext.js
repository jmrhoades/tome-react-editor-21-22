import React, { useState, createContext } from "react";
import { useMotionValue } from "framer-motion";
import { TestTomeA } from "./TestTome";
import { panels } from "../panel/Panel";
import { metricConstants } from "./MetricsContext";

import { tileNames } from "../page/TileConstants";

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
		height: 6,
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
}

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	const [sidePanelOpen, setSidePanelOpen] = useState(true);
	const [panelName, setPanelName] = useState(panels.TILES);

	const [addTileDropTarget, setAddTileDropTarget] = useState("");
	const [showAddTileDropTarget, setShowAddTileDropTarget] = useState("");
	const addTileAlpha = useMotionValue(0);

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

	/* 
	Tile State
	*/
	const [selectedTile, setSelectedTile] = useState(null);
	const [tileResizing, setTileResizing] = useState(false);
	const tileZIndex = useMotionValue(0);

	const tileDropPointX = useMotionValue(-1);
	const tileDropPointY = useMotionValue(-1);
	const [tileDropInfo, setTileDropInfo] = useState({ show: false, x: 0, y: 0, height: 0, width: 0 });

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
		// tomeData.pages.push(nPage);
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
		console.log("addPage", tomeData);
		

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
		}
	};

	const goToPreviousPage = () => {
		const previousPage = tomeData.pages.find(page => page.order === currentPage.order - 1);
		if (previousPage) {
			showPage(previousPage);
		}
	};

	const showPage = (page, isNew = false) => {
		if (page.id === currentPage.id) return;
		if (currentPage) {
			setPreviousPage(currentPage);
		}
		setCurrentPage(page);

		// deselect stuff
		// setPanelOpen(false);
		// setPanelName("");
		setSelectedTile(null);
	};

	/*
	Tiles
	*/

	const addTileToRow = (tileName, row) => {
		const { cColumnCount, cRowCount, cRowMinHeight } = metricConstants;

		// Get the current rows of the current page
		// sort them by order
		const rows = tomeData.rows.filter(row => {
			return row.pageId === currentPage.id;
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
			let newRowHeight = rows.length >= 3 ? cRowMinHeight : cRowCount;
			// If total rows heights do not exceed the min page height (rowCount = 6)
			// Collapse other rows to the min row height
			if (rows.length === 1) {
				if (rows[0].flexHeight) {
					rows[0].height = cRowMinHeight;
					newRowHeight = cRowCount - cRowMinHeight;
				} else if (rows[0].height <= (cRowCount - cRowMinHeight)) {
					newRowHeight = cRowCount - rows[0].height;
				}
			}
			if (rows.length === 2) {
				rows[0].height = cRowMinHeight;
				rows[1].height = cRowMinHeight;
				newRowHeight = cRowMinHeight;
			}
			row = createRow(currentPage.id, rows[rows.length - 1].order + 1, newRowHeight)
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
		let newTileWidth = cColumnCount / (tiles.length);
		tiles.forEach(t => {
			t.width = newTileWidth;
		});
	
		// Add the tile to the tome data
		tomeData.tiles.push(tile);
		// console.log(tomeData)
		setTomeData({ ...tomeData });
	};

	const deleteTile = tile => {
		// Don't delete last tile
		if (tomeData.tiles.length === 1) return false;

		// Find the tile
		const index = tomeData.tiles.indexOf(tile);
		// Remove the tile from the tome data
		const deletedTile = tomeData.tiles.splice(index, 1)[0];
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

			// Count up the remain row heights
			// If lower than the min, adjust last row
			let totalRowHeights = 0;
			tomeData.rows.forEach(r => {
				totalRowHeights += r.height;
			});
			console.log(totalRowHeights);
			if (totalRowHeights < 6) {
				tomeData.rows[tomeData.rows.length - 1].height += 6 - totalRowHeights;
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

		// Update tome data
		// console.log("delete at index ", index, deletedTile);
		setTomeData({ ...tomeData });
	};

	return (
		<TomeContext.Provider
			value={{
				sidePanelOpen,
				setSidePanelOpen,

				panelName,
				setPanelName,

				addTileDropTarget,
				setAddTileDropTarget,
				addTileAlpha,
				showAddTileDropTarget,
				setShowAddTileDropTarget,

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

				selectedTile,
				setSelectedTile,

				tileResizing,
				setTileResizing,

				tileZIndex,

				tileDropPointX,
				tileDropPointY,
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
