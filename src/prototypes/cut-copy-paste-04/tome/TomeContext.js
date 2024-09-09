import React, { useState, useRef, createContext } from "react";

// import { TestTomeNullStates } from "./TestTomeNullStates";
// import { TestTomeA } from "./TestTomeA";
import { testTome } from "./TestTomeA";
// import { TestTomeC } from "./TestTomeC";
//import { panels } from "../panel/Panel";
import { metricConstants } from "./MetricsContext";

import { tileNames } from "../page/TileConstants";
import { useMotionValue } from "framer-motion";
import { panels } from "../panel/Panel";
import { uniqueId } from "lodash";

import useSound from "use-sound";
// import close_menu_sound from "../../../sounds/button_37.mp3";
// import delete_sound_01 from "../../../sounds/action_11.mp3";
import cut_sound_01 from "../../../sounds/button_42.mp3";
import copy_sound_01 from "../../../sounds/button_30.mp3";
import paste_sound_01 from "../../../sounds/button_46.mp3";
// import undo_sound_01 from "../../../sounds/action_13.mp3";

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
			height: 12,
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
			isNull: true,
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
		isNull: true,
	};
};

export const createRow = (pageId, order, height) => {
	const newRow = {
		id: uniqueId("row"),
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
	const [panelName, setPanelName] = useState(null);

	/* 
	Editor state
	*/
	const [isPlayMode, setIsPlayMode] = useState(false);
	//const [editorState, setEditorState] = useState("editing");
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuInfo, setContextMenuInfo] = useState({ x: 0, y: 0, items: [] });

	/* 
	Permissions
	*/
	//const [permission, setPermission] = useState(permissions.EDITOR);

	/*
	Tome Data
	*/
	const [tomeData, setTomeData] = useState(testTome);
	//const [tomeData, setTomeData] = useState(BlankTome);
	tomeData.pages.sort((a, b) => (a.order > b.order ? 1 : -1));

	/*
		Undo cache
	*/
	const [undoCache, setUndoCache] = useState();
	//const undoCache = useRef([]);

	/* 
	Tile State
	*/
	const [selectedTile, setSelectedTile] = useState(null);
	const [rowResizing, setRowResizing] = useState(null);
	const [tileDropInfo, setTileDropInfo] = useState({ show: false, x: -1, y: -1, height: 0, width: 0 });
	const showTileDropTarget = useMotionValue(false);
	const [isTileAnimating, setIsTileAnimating] = useState(false);
	const [tileDragging, setTileDragging] = useState(false);
	const copiedTile = useRef(null);
	const copiedTileRowHeight = useRef(null);
	const tileHoveringId = useMotionValue(null);

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
		saveState();
		//setTomeData({ ...tomeData });
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

		// deselect stuff
		setSidePanelOpen(false);
		setPanelName("");
		setSelectedTile(null);

		// Remove new page ID
		if (tomeData.newTileID) {
			tomeData.newTileID = null;
			tomeData.newTileInfo = null;
			//setTomeData({ ...tomeData });
			saveState();
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
			//setTomeData({ ...tomeData });
			saveState();
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
		//setTomeData({ ...tomeData });
		saveState();
	};

	/*
	Tiles
	*/

	const addTileToRow = (
		tileName,
		row = false,
		params = false,
		height6 = false,
		height12 = false,
		selectNewTile = true,
		previousRowHeight = false,
		selectedTile
	) => {
		const { cColumnCount, cRowDefaultHeight } = metricConstants;
		console.log("add tile to row", height12, row);
		let tileTypeInfo = { defaultHeight: cRowDefaultHeight };
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
		if (row === false) row = rows[rows.length - 1];
		// Find the number of tiles in the target row
		let tiles = tomeData.tiles.filter(t => {
			return t.rowId === row.id;
		});
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		console.log(tiles);
		// If too many tiles, add a new row, reset tiles arrays
		if (tiles.length >= 2) {
			if (selectedTile) {
				// create new row below current row
				let newRowOrder = row.order + 1;
				if (selectedTile.order === 1) {
					//
					// Add new tile next to selected tile
					//
					// remove current right-side sibling
					let oldSiblingTile = tiles.splice(1, 1)[0];
					const newRow = createRow(
						currentPage.id,
						newRowOrder,
						oldSiblingTile.height12 ? oldSiblingTile.height12 : row.height
					);
					// move old sibling tile into new row
					oldSiblingTile.width = 12;
					oldSiblingTile.rowId = newRow.id;
					oldSiblingTile.order = 1;
					// update other rows' orders
					rows.forEach((rO, j) => {
						const order = j + 1;
						rO.order = order;
						if (rO.order >= newRowOrder) {
							rO.order = order + 1;
						}
					});
					// add row to tome data
					tomeData.rows.push(newRow);
					// fix target row height
					if (height6 > row.height) {
						row.height = height6;
						if (tiles[0].height6 > height6) row.height = tiles[0].height6;
					}
				}
				if (selectedTile.order === 2) {
					//
					// Add new tile to a new row below selected tile
					//
					let newRowHeight = height12 ? height12 : row.height;
					row = createRow(currentPage.id, newRowOrder, newRowHeight);
					// update other rows' orders
					rows.forEach((rO, j) => {
						const order = j + 1;
						rO.order = order;
						if (rO.order >= newRowOrder) {
							rO.order = order + 1;
						}
					});
					// add row to tome data
					tomeData.rows.push(row);
					tiles = [];
				}
			} else {
				//
				// Add new tile to a new row at the bottom of the page
				//
				let newRowHeight = height12 ? height12 : previousRowHeight ? previousRowHeight : tileTypeInfo.defaultHeight;
				row = createRow(currentPage.id, rows[rows.length - 1].order + 1, newRowHeight);
				tomeData.rows.push(row);
				tiles = [];
			}
		} else {
			//console.log("FIX HEIGHT HERE", height6)
			if (tiles[0].height6 && tiles[0].height6 > row.height) {
				row.height = tiles[0].height6;
			}
			if (row.height < height6) {
				row.height = height6;
			}
		}

		// Create new tile
		const tile = {
			id: "tile" + Math.round(Math.random() * 10000),
			pageId: currentPage.id,
			rowId: row.id,
			order: tiles.length + 1,
			width: 0,
			type: tileName,
			isNull: !params,
			params: params ? params : {},
			height6: height6,
			height12: height12,
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
		//setTomeData({ ...tomeData });
		saveState();

		// Select the new tile
		if (selectNewTile) {
			selectTile(tile);
		}

		return tile;
	};

	const deleteTile = tile => {
		saveStateToUndo();

		const { cRowCount } = metricConstants;

		// Don't delete last tile
		let tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id;
		});
		if (tiles.length === 1) return false;

		// Find the tile
		const index = tomeData.tiles.indexOf(tile);
		// Remove the tile from the tome data
		const deletedTile = tomeData.tiles.splice(index, 1)[0];
		// Find the row the tile is in
		const row = tomeData.rows.filter(row => {
			return row.id === deletedTile.rowId;
		})[0];
		// Find the other tiles in the same row
		tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === deletedTile.rowId;
		});
		// Sort the tiles by order
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		if (tiles.length === 0) {
			// That was the last tile in the row
			// Remove the row
			const rowIndex = tomeData.rows.indexOf(row);
			tile.oldRows = tomeData.rows.slice();
			tile.oldRow = tomeData.rows.splice(rowIndex, 1);

			// Remaining rows on same page as deleted tile
			const rows = tomeData.rows.filter(r => {
				return deletedTile.pageId === r.pageId;
			});
			rows.sort((a, b) => (a.order > b.order ? 1 : -1));

			if (rows.length === 1) {
				rows[0].height = cRowCount;
			}
			/*
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
			*/
		} else if (tiles.length === 1) {
			tiles[0].width = 12;
			tiles[0].order = 1;
			if (tiles[0].height12) row.height = tiles[0].height12;
			// Remaining rows on same page as deleted tile
			const rows = tomeData.rows.filter(r => {
				return deletedTile.pageId === r.pageId;
			});
			if (rows.length === 1) {
				if (row.height < 12) row.height = cRowCount;
			}
		} else if (tiles.length === 2) {
			tiles[0].width = 6;
			tiles[0].order = 1;
			tiles[1].width = 6;
			tiles[1].order = 2;
		}

		if (selectedTile && selectedTile.id === tile.id) {
			setSelectedTile(null);
			//setSidePanelOpen(false);
			setPanelName(panels.TILES);
		}

		// Update tome data
		saveState();
	};

	const selectTile = tile => {
		if (selectedOutlinePage) {
			setSelectedOutlinePage(null);
		}
		setSelectedTile(tile);
		// update property panel
		setPanelName(tile.type);
		//setSidePanelOpen(true);
	};

	const cutTile = tile => {
		const tileString = JSON.stringify(tile);
		navigator.clipboard.writeText(tileString).then(
			function () {
				const row = tomeData.rows.filter(r => {
					return r.id === tile.rowId;
				})[0];
				copiedTileRowHeight.current = tile.height6 ? null : row.height;
				playTileCutSound();
				if (showContextMenu) {
					setShowContextMenu(false);
				}
				deleteTile(tile);
			},
			function () {
				/* clipboard write failed */
			}
		);
	};

	const copyTile = tile => {
		//clipboardTile = JSON.parse(JSON.stringify(tile));
		const tileString = JSON.stringify(tile);
		navigator.clipboard.writeText(tileString).then(
			function () {
				const row = tomeData.rows.filter(r => {
					return r.id === tile.rowId;
				})[0];
				copiedTileRowHeight.current = tile.height6 ? null : row.height;
				playTileCopySound();
				if (showContextMenu) {
					setShowContextMenu(false);
				}	
			},
			function () {
				/* clipboard write failed */
			}
		);
	};

	const pasteClipboardTileToPage = (clipboardTile, direction) => {
		console.log("pasteClipboardTileToPage", clipboardTile, direction);
		saveStateToUndo();

		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let newRowOrder = 1;
		if (direction === "bottom") {
			newRowOrder = rows[rows.length - 1].order + 1;
		}
		let newRowHeight = 6;
		if (copiedTileRowHeight.current) newRowHeight = copiedTileRowHeight.current;
		if (clipboardTile.height12) newRowHeight = clipboardTile.height12;
		const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);

		// Create new tile
		const newTile = {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: newRow.id,
			order: 1,
			width: 12,
			type: clipboardTile.type,
			isNull: !clipboardTile.params,
			params: clipboardTile.params,
			height6: clipboardTile.height6,
			height12: clipboardTile.height12,
		};

		// update other rows' orders
		rows.forEach((rO, j) => {
			const order = j + 1;
			rO.order = order;
			if (rO.order >= newRow.order) {
				rO.order = order + 1;
			}
		});

		// Add new row to tome data
		tomeData.rows.push(newRow);
		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;

		// Select the new tile
		selectTile(newTile);

		// console.log(tomeData)
		//setTomeData({ ...tomeData });
		saveState();

		return newTile;
	};

	const pasteClipboardTileToRowGapIndex = (clipboardTile, gapIndex) => {
		console.log("pasteClipboardToRowGapIndex", gapIndex);
		saveStateToUndo();

		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let newRowOrder = gapIndex + 1;
		let newRowHeight = 6;
		if (copiedTileRowHeight.current) newRowHeight = copiedTileRowHeight.current;
		if (clipboardTile.height12) newRowHeight = clipboardTile.height12;
		const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);

		// Create new tile
		const newTile = {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: newRow.id,
			order: 1,
			width: 12,
			type: clipboardTile.type,
			isNull: !clipboardTile.params,
			params: clipboardTile.params,
			height6: clipboardTile.height6,
			height12: clipboardTile.height12,
		};

		// update other rows' orders
		rows.forEach((rO, j) => {
			const order = j + 1;
			rO.order = order;
			if (rO.order >= newRow.order) {
				rO.order = order + 1;
			}
		});

		// Add new row to tome data
		tomeData.rows.push(newRow);
		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;

		// Select the new tile
		selectTile(newTile);

		// console.log(tomeData)
		//setTomeData({ ...tomeData });
		saveState();

		return newTile;
	};

	const pasteClipboardTileToRow = (clipboardTile, row, direction) => {
		console.log("pasteClipboardTileToRow", clipboardTile, row, direction);
		saveStateToUndo();

		let newTileOrder = 1;
		let newTileWidth = 6;

		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));

		let tilesInRow = tomeData.tiles.filter(t => {
			return t.rowId === row.id;
		});
		tilesInRow.sort((a, b) => (a.order > b.order ? 1 : -1));

		let stayingTile = tilesInRow[0];

		// Single-tile row, add pasted tile to this row
		if (tilesInRow.length === 1) {
			stayingTile.width = 6;
			if (direction === "left") {
				stayingTile.order = 2;
			}
			if (direction === "right") {
				stayingTile.order = 1;
				newTileOrder = 2;
			}
		}
		if (tilesInRow.length === 2) {
			let movingTile = tilesInRow[1];
			let newRowOrder = row.order + 1;
			stayingTile.order = 2;
			if (direction === "right") {
				newTileOrder = 2;
				stayingTile.order = 1;
			}
			let newRowHeight = row.height;
			if (movingTile.height12) newRowHeight = movingTile.height12;
			const newRow = createRow(currentPage.id, newRowOrder, newRowHeight);
			// update other rows' orders
			rows.forEach((rO, j) => {
				const order = j + 1;
				rO.order = order;
				if (rO.order >= newRow.order) {
					rO.order = order + 1;
				}
			});
			movingTile.rowId = newRow.id;
			movingTile.order = 1;
			movingTile.width = 12;
			// Add new row to tome data
			tomeData.rows.push(newRow);
		}

		// Update exisiting row height
		if (clipboardTile.height6 > row.height) row.height = clipboardTile.height6;
		if (stayingTile.height6 > row.height) row.height = stayingTile.height6;
		if (copiedTileRowHeight.current > row.height) row.height = copiedTileRowHeight.current;

		// Create new tile
		const newTile = {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: row.id,
			order: newTileOrder,
			width: newTileWidth,
			type: clipboardTile.type,
			isNull: !clipboardTile.params,
			params: clipboardTile.params,
			height6: clipboardTile.height6,
			height12: clipboardTile.height12,
		};

		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;

		// Select the new tile
		selectTile(newTile);

		saveState();

		return newTile;
	};

	/*
	const addRowToPage = page => {
		const rows = tomeData.rows.filter(r => {
			return r.pageId === page.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		const newRowOrder = rows[rows.length - 1].order + 1;
		const newRow = createRow(page.id, newRowOrder, copiedTile.current ? copiedTile.current.height12 : 12);
		tomeData.rows.push(newRow);
		return newRow;
	};
	*/

	const pasteClipboardBeforeTile = tile => {
		console.log("pasteClipboardBeforeSelectedTile");

		let newTileRowID = false;
		let newTileOrder = 1;
		let newTileWidth = 12;

		const selectedTileRow = tomeData.rows.filter(r => {
			return r.id === tile.rowId;
		})[0];
		let tilesInSelectedRow = tomeData.tiles.filter(t => {
			return t.rowId === selectedTileRow.id;
		});
		tilesInSelectedRow.sort((a, b) => (a.order > b.order ? 1 : -1));

		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));

		if (tilesInSelectedRow.length === 1) {
			// Add to beginning of the selected row
			newTileRowID = selectedTileRow.id;
			newTileOrder = 1;
			newTileWidth = 6;
			tilesInSelectedRow[0].order = 2;
			tilesInSelectedRow[0].width = 6;
		}
		if (tilesInSelectedRow.length === 2) {
			// Make a new row for the tile that's getting squeezed off the front
			let newRow = {};

			if (tile.order === 1) {
				newRow = createRow(
					currentPage.id,
					selectedTileRow.order,
					copiedTile.current.height12 ? copiedTile.current.height12 : selectedTileRow.height
				);
				newTileRowID = newRow.id;
			}

			if (tile.order === 2) {
				newRow = createRow(
					currentPage.id,
					selectedTileRow.order,
					tilesInSelectedRow[0].height12 ? tilesInSelectedRow[0].height12 : selectedTileRow.height
				);

				tilesInSelectedRow[0].rowId = newRow.id;
				tilesInSelectedRow[0].width = 12;
				tilesInSelectedRow[0].order = 1;

				newTileRowID = selectedTileRow.id;
				newTileOrder = 1;
				newTileWidth = 6;
			}

			// update other rows' orders
			rows.forEach((rO, j) => {
				const order = j + 1;
				rO.order = order;
				if (rO.order >= newRow.order) {
					rO.order = order + 1;
				}
			});
			// add row to tome data
			tomeData.rows.push(newRow);
		}

		// Create new tile
		const newTile = {
			id: "tile" + Math.round(Math.random() * 10000),
			pageId: currentPage.id,
			rowId: newTileRowID,
			order: newTileOrder,
			width: newTileWidth,
			type: copiedTile.current.type,
			isNull: !copiedTile.current.params,
			params: copiedTile.current.params,
			height6: copiedTile.current.height6,
			height12: copiedTile.current.height12,
		};

		console.log(newTile);

		// Add the tile to the tome data
		tomeData.tiles.push(newTile);
		// Add the new tile id to tomeData
		tomeData.newTileID = newTile.id;

		// Select the new tile
		selectTile(newTile);

		// console.log(tomeData)
		//setTomeData({ ...tomeData });
		saveState();

		return tile;
	};

	const pasteClipboardAfterTile = tile => {
		if (!tile) {
			if (tileHoveringId.get()) {
				tile = tomeData.tiles.filter(t => {
					return t.id === tileHoveringId.get();
				})[0];
			}
		}
		let row = false;
		if (tile) {
			row = tomeData.rows.filter(r => {
				return r.id === tile.rowId;
			})[0];
		}
		const newTile = addTileToRow(
			copiedTile.current.type,
			row,
			copiedTile.current.params,
			copiedTile.current.height6,
			copiedTile.current.height12,
			selectedTile ? true : false,
			row ? row.height : copiedTileRowHeight.current,
			selectedTile ? selectedTile : tile
		);
		return newTile;
	};

	const pasteClipboardAfterRow = row => {
		console.log("pasteClipboardAfterRow", row);
		const tile = copiedTile.current;
		const newTile = addTileToRow(
			tile.type,
			row,
			tile.params,
			tile.height6,
			tile.height12,
			selectedTile ? true : false,
			row ? row.height : copiedTileRowHeight.current,
			selectedTile
		);
		return newTile;
	};

	const pasteClipboard = mouseY => {
		if (copiedTile.current && selectedTile) {
			return pasteClipboardAfterTile(selectedTile);
		} else if (copiedTile.current) {
			console.log(mouseY, window.scrollY);
		}
	};

	const replaceTileWithClipboardTile = (deletedTile, clipboardTile) => {

		saveStateToUndo();

		/*
			if (copiedTile.current.id === t.id) {
				return pasteClipboardAfterTile(t);
			}
		*/

			const index = tomeData.tiles.indexOf(deletedTile);
			tomeData.tiles.splice(index, 1);

			clipboardTile.id = "tile_" + Math.random();
			clipboardTile.order = deletedTile.order;
			clipboardTile.width = deletedTile.width;
			clipboardTile.rowId = deletedTile.rowId;
			clipboardTile.pageId = deletedTile.pageId;

			
			// if target row is too small for new tile
			const row = tomeData.rows.filter(r => {
				return r.id === deletedTile.rowId;
			})[0];
			if (row.height < clipboardTile.height6 && deletedTile.width === 6) {
				row.height = clipboardTile.height6;
			}
			if (row.height > clipboardTile.height12 && deletedTile.width === 12) {
				row.height = clipboardTile.height12;
			}
			if (row.height < copiedTileRowHeight.current) {
				row.height = copiedTileRowHeight.current;
			}
		

			// Add the tile to the tome data
			tomeData.tiles.push(clipboardTile);
			// Add the new tile id to tomeData
			//tomeData.newTileID = tile.id;

			// update selection
			setSelectedTile(clipboardTile);

			// update the data!
			//setTomeData({ ...tomeData });
			saveState();


			if (showContextMenu) setShowContextMenu(false);

			return clipboardTile;
		
	};

	const pasteFromClipboardToNearestPosition = (clipboardTile, info) => {
		console.log("pasteFromClipboardToNearestPosition", info)
		let newTile = false;
		if (info.row) {
			newTile = pasteClipboardTileToRow(clipboardTile, info.row, info.direction);
		} else if (info.rowGapIndex !== 0) {
			newTile = pasteClipboardTileToRowGapIndex(clipboardTile, info.rowGapIndex);
		} else {
			newTile = pasteClipboardTileToPage(clipboardTile, info.direction);
		}
		if (newTile) {
			playTilePasteSound();
		}
		if (showContextMenu) setShowContextMenu(false);
		return newTile;
	}

	const getTileForId = id => {
		return tomeData.tiles.filter(t => {
			return t.id === id;
		})[0];
	};

	const getNewImageTile = () => {
		return {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			type: tileNames.IMAGE.name,
			params: {},
		};
	}
	

	const duplicateTile = tile => {
		let row = tomeData.rows.filter(r => {
			return r.id === tile.rowId;
		})[0];
		const newTile = addTileToRow(
			tile.type,
			row,
			tile.params,
			tile.height6,
			tile.height12,
			selectedTile,
			null,
			selectedTile
		);
		return newTile;
	};

	const updateImageTileWithImage = (tile, image) => {
		tile.params.image = image;
		saveState();
	};

	const addImageTileFromClipboard = () => {
		const tileType = tileNames.IMAGE.name;
		/*
		// Save state before any changes
		saveStateToUndo();
		// Add to new row at bottom of current page
		const row = addRowToPage(currentPage);
		const newTileOrder = 1;
		const newTileWidth = 12;
		
		const newTile = {
			id: uniqueId("tile"),
			pageId: currentPage.id,
			rowId: row.id,
			order: newTileOrder,
			width: newTileWidth,
			type: tileType,
			params: {
				image: "",
			},
		};
		// Add new tile to the tome data
		tomeData.tiles.push(newTile);
		// Add new tile id to tomeData
		tomeData.newTileID = newTile.id;
		saveState();
		*/

		const newTile = addTileToRow(tileType);
		if (newTile) {
			playTilePasteSound();
			if (showContextMenu) setShowContextMenu(false);
		}
		return newTile;
	};

	const addTileFromClipboard = tile => {
		const tileType = tile.type;
		const newTile = addTileToRow(tileType, false, tile.params, tile.height6, tile.height12);
		if (newTile) {
			playTilePasteSound();
			if (showContextMenu) setShowContextMenu(false);
		}
		return newTile;
	};

	const enterPlayMode = () => {
		setIsPlayMode(true);
		if (selectedTile) {
			setSelectedTile(null);
		}
		if (sidePanelOpen) {
			setSidePanelOpen(false);
		}
	};

	const exitPlayMode = () => {
		setIsPlayMode(false);
	};

	const saveState = () => {
		console.log("saveState", tomeData);
		setTomeData({ ...tomeData });
		//setUndoCache
		//const dataCopy = JSON.parse(JSON.stringify(tomeData));
		//undoCache.current.push(dataCopy);
		//console.log(undoCache.current)
	};

	const saveStateToUndo = () => {
		console.log("save to undo");
		setUndoCache(JSON.parse(JSON.stringify(tomeData)));
		/*
		console.log(undoCache.current)
		const oldState = undoCache.current.pop();
		if (oldState) {
			setTomeData({ ...oldState });
		}
		*/
	};

	const undo = () => {
		console.log("undo! from context", undoCache);
		if (undoCache) {
			console.log("undo! from context");
			setTomeData({ ...undoCache });
		}
	};

	const [playTileCutSound] = useSound(cut_sound_01);
	const [playTileCopySound] = useSound(copy_sound_01);
	const [playTilePasteSound] = useSound(paste_sound_01);

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

				// permission,
				// setPermission,

				// editorState,
				// setEditorState,

				isPlayMode,
				enterPlayMode,
				exitPlayMode,

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

				tileDragging,
				setTileDragging,
				tileHoveringId,

				tileDropInfo,
				setTileDropInfo,
				showTileDropTarget,

				tomeData,
				setTomeData,

				showContextMenu,
				setShowContextMenu,
				contextMenuInfo,
				setContextMenuInfo,

				addTileToRow,
				deleteTile,
				copyTile,
				copiedTile,
				copiedTileRowHeight,
				cutTile,
				duplicateTile,
				pasteClipboard,
				replaceTileWithClipboardTile,
				pasteClipboardAfterTile,
				pasteClipboardBeforeTile,
				pasteClipboardAfterRow,

				pasteClipboardTileToPage,
				pasteClipboardTileToRow,
				pasteClipboardTileToRowGapIndex,
				pasteFromClipboardToNearestPosition,

				updateImageTileWithImage,
				addImageTileFromClipboard,
				addTileFromClipboard,

				saveState,
				undo,

				getTileForId,
				getNewImageTile,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
