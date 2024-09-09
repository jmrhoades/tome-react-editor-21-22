import React, { useState, useRef, createContext } from "react";

import { useParams } from "react-router-dom";
import { useMotionValue } from "framer-motion";
import { uniqueId } from "lodash";

import { makeTestTomes } from "../tomes/testTomes";
import { metricConstants } from "./MetricsContext";
import { tileNames, alignmentX, alignmentY, textBlockType, tableTileType, panelNames } from "../page/TileConstants";

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
		layout: {
			margins: true,
			marginValue: 140,
			gaps: true,
			gapValue: 12,
			corners: true,
			cornerValue: 12,
		},
	};
};

export const newRowForPage = pageId => {
	const rowId = "row" + Math.round(Math.random() * 10000);
	return {
		id: rowId,
		pageId: pageId,
		order: 1,
		height: metricConstants.cRowDefaultHeight,
		flexHeight: true,
	};
};

export const rowsForPageInTome = (page, tome) => {
	// all the rows in the page sorted by order
	let rows = tome.rows.filter(r => {
		return r.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	return rows;
};

export const appendTomeToTomes = (tomes, id, title) => {
	// Set up
	const tome = {
		id: id,
		title: title,
		pages: [],
		rows: [],
		tiles: [],
	};
	tomes.push(tome);
	return tome;
};

export const appendPageToTome = (tome, theme) => {
	// console.log("appendPageToTome", tome);
	const page = newPage();
	page.order = tome.pages.length + 1;
	page.theme = theme;
	tome.pages.push(page);
	return page;
};

export const appendRowToPageInTome = (page, tome) => {
	const row = newRowForPage(page.id);
	row.order = rowsForPageInTome(page, tome).length + 1;
	tome.rows.push(row);
	return row;
};

export const appendRowAtOrder = (page, tome, order) => {
	const row = newRowForPage(page.id);
	const rows = tome.rows.filter(r => {
		return r.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	rows.forEach((rO, j) => {
		const newOrder = j + 1;
		if (rO.order < order) {
			rO.order = newOrder;
		}
		if (rO.order >= order) {
			rO.order = newOrder + 1;
		}
	});
	row.order = order;
	tome.rows.push(row);
	/*
	const rows = tome.rows.filter(r => {
		return r.pageId === page.id;
	});
	*/
	//rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	console.log(rows);
	return row;
};

export const appendTileToRowInTome = (data, row, tome, width = false) => {
	// Find the current page
	const page = tome.pages.find(({ id }) => id === row.pageId);

	// Find other tiles in row
	const tiles = findTilesInRowAndTome(row, tome);

	const order = tiles.length > 0 ? tiles.length + 1 : 1;
	if (!width) {
		width = tiles.length > 0 ? 12 / (tiles.length + 1) : 12;
		// Update other tiles' widths
		tiles.forEach(t => {
			t.width = width;
		});
	}

	let isNull = data.params ? false : true;
	if (data.isNull) isNull = true;
	if (
		data.type === tileNames.TEXT.name &&
		data.params &&
		data.params.blocks.length === 1 &&
		data.params.blocks[0].content === ""
	)
		isNull = true;

	const tile = {
		pageId: page.id,
		rowId: row.id,
		id: uniqueId("tile_"),
		order: order,
		width: width,
		type: data.type,
		params: data.params,
		isNull: isNull,
	};

	tome.tiles.push(tile);
	return tile;
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

export const findTilesInRowAndTome = (row, tome) => {
	const tiles = tome.tiles.filter(t => {
		return t.pageId === row.pageId && t.rowId === row.id;
	});
	tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
	return tiles;
};

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	let { tomeId, pageNumber } = useParams();

	//console.log(tomeId, pageNumber);

	/*
	Tome Data
	*/
	const testTomes = makeTestTomes();
	let testTome = undefined;
	if (tomeId) {
		testTome = testTomes.find(t => t.id === tomeId);
		//if (testTome) console.log("match!", testTome);
	}
	if (testTome === undefined) testTome = testTomes[0];
	const [tomeData, setTomeData] = useState(testTome);
	//tomeData.pages.sort((a, b) => (a.order > b.order ? 1 : -1));

	/*
	Pages
	*/
	let startPage = 0;
	//console.log(startPage, pageNumber)
	if (pageNumber) {
		startPage = pageNumber - 1;
	}
	const [currentPage, setCurrentPage] = useState(tomeData.pages[startPage]);
	const [previousPage, setPreviousPage] = useState(null);
	const [selectedOutlinePage, setSelectedOutlinePage] = useState("");

	// For text tile demo only
	//let firstTile = tomeData.tiles.filter(t => {
	//return currentPage.id === t.pageId;
	//})[0];
	//console.log(firstTile)
	//selectTile(firstTile);

	/*
	Property panel state
	*/
	//const [sidePanelOpen, setSidePanelOpen] = useState(true);
	//const [panelName, setPanelName] = useState(firstTile.type);
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	const [panelName, setPanelName] = useState(null);

	/*
	Prompt
	*/
	const [promptIsOpen, setPromptIsOpen] = useState(true);

	/* 
	Editor state
	*/
	const [isPlayMode, setIsPlayMode] = useState(false);
	//const [editorState, setEditorState] = useState("editing");
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuInfo, setContextMenuInfo] = useState({ x: 0, y: 0, items: [] });
	const [menuInfo, setMenuInfo] = useState({ x: 0, y: 0, type: "TOME" });
	const [playSounds, setPlaySounds] = useState(true);

	/* 
	Permissions
	*/
	//const [permission, setPermission] = useState(permissions.EDITOR);

	/*
		Undo cache
	*/
	const [undoCache, setUndoCache] = useState();
	//const undoCache = useRef([]);

	/* Drop Indicator State */
	const dropIndicatorInfo = {
		width: useMotionValue(0),
		height: useMotionValue(0),
		x: useMotionValue(0),
		y: useMotionValue(0),
		opacity: useMotionValue(0),
		backgroundDropOpacity: useMotionValue(0),
		backgroundDropType: useMotionValue("Image"),
	};

	/* 
	Tile State
	*/
	const [selectedTile, setSelectedTile] = useState(null);
	const [rowResizing, setRowResizing] = useState(null);
	const [textTileFocussed, setTextTileFocussed] = useState(false);

	const [tileDropInfo, setTileDropInfo] = useState({ show: false, x: -1, y: -1, height: 0, width: 0 });
	const showTileDropTarget = useMotionValue(false);
	const [isTileAnimating, setIsTileAnimating] = useState(false);
	const [tileDragging, setTileDragging] = useState(false);
	const copiedTile = useRef(null);
	const copiedTileRowHeight = useRef(null);
	const tileHoveringId = useMotionValue(null);
	const tileReplaceId = useMotionValue(null);
	const contentTileHeightsList = useRef([]);

	const [backgroundSelected, setBackgroundSelected] = useState(null);

	const [layoutTweaking, setLayoutTweaking] = useState(false);

	const [isGenerating, setIsGenerating] = useState(false);
	//const [isAutoPaging, setIsAutoPaging] = useState(true);
	const autoPaging = useRef(true);

	const addPage = (templateName = "") => {
		const TD = tableTileType.TD;

		//console.log("addPage", templateName);

		// Page
		const page = appendPageToTome(tomeData, currentPage.theme);
		// Row
		let row = appendRowToPageInTome(page, tomeData);

		if (templateName === "ThreeText&Media") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
		} else if (templateName === "Media&2Text") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 14;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 6;
		} else if (templateName === "TwoMedia") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Media") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Text&Table") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H3,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 2;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.TABLE.name,
					params: {
						columns: [220, 220, 220, 220],
						rows: [
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
							[
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
								{ type: TD, content: "" },
							],
						],
					},
				},
				row,
				tomeData
			);
			row.height = 10;
		} else if (templateName === "Text&Media") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Centered") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.CENTER,
						alignmentY: alignmentY.MIDDLE,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H1,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
		} else if (templateName === "ThreeMedia") {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		} else if (templateName === "Title&6Media") {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.CENTER,
						alignmentY: alignmentY.MIDDLE,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H1,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
			row = appendRowToPageInTome(page, tomeData);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						isNull: true,
					},
				},
				row,
				tomeData
			);
			row.height = 8;
		} else {
			appendTileToRowInTome(
				{
					type: tileNames.TEXT.name,
					params: {
						alignmentX: alignmentX.LEFT,
						alignmentY: alignmentY.TOP,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.H2,
								content: "",
							},
						],
					},
				},
				row,
				tomeData
			);
			row.height = 12;
		}

		// Update tome data
		saveState();
		//setTomeData({ ...tomeData });
		// console.log("addPage", tomeData);

		// Set current page to new page
		showPage(page, true);

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
		setSelectedTile(null);

		// remove generated tag
		if (!tomeData.isGenerating && page.isGenerated) {
			page.isGenerated = false;
			saveState();
		}

		// Remove new page ID
		if (tomeData.newTileID) {
			tomeData.newTileID = null;
			tomeData.newTileInfo = null;
			saveState();
		}
	};

	const selectOutlinePage = page => {
		// deselect stuff
		setSidePanelOpen(false);
		setPanelName("");
		setSelectedTile(null);

		// stop auto paging
		//setIsAutoPaging(false);
		//console.log("isAutoPaging", isAutoPaging)

		// show page
		showPage(page);

		// select outline thumbnail
		setSelectedOutlinePage(page);
	};

	const resetTome = () => {
		/*
		const testTomes = makeTestTomes();
		let testTome = undefined;
		if (tomeId) testTome = testTomes.find(t => t.id === tomeId);
		if (testTome === undefined) testTome = testTomes[0];
		setCurrentPage(null);
		setTomeData(testTome);
		showPage(tomeData.pages[0])
		//saveState();
		*/

		// Sort pages array by order
		tomeData.pages.sort(function (a, b) {
			return a.order - b.order;
		});

		// Show first page
		showPage(tomeData.pages[0]);
		// Delete rest of pages
		tomeData.pages.splice(1, tomeData.pages.length-1);
		tomeData.rows.splice(1, tomeData.rows.length-1);
		tomeData.tiles.splice(1, tomeData.tiles.length-1);
		//
		tomeData.tiles[0].params.blocks[0].blocks = undefined;
		tomeData.tiles[0].params.blocks[0].content = "";
		console.log(tomeData)
		saveState();		
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
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: row.id,
			order: tiles.length + 1,
			width: 0,
			type: tileName,
			isNull: !params,
			params: params ? JSON.parse(JSON.stringify(params)) : {},
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

	const createTileInRowAtOrder = (tileName, row, order) => {
		//console.log("createTileInRowAtOrder", order)
		// Create new tile
		const tile = {
			id: uniqueId("tile_"),
			pageId: currentPage.id,
			rowId: row.id,
			order: order,
			type: tileName,
			params: {},
			isNull: true,
			width: 0,
		};
		// Text tile specific
		if (tileName === tileNames.TEXT.name) {
			tile.params = {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H1,
						content: "",
					},
				],
			};
		}

		// Update tile orders
		let tilesInRow = tomeData.tiles.filter(tile => {
			return tile.rowId === row.id;
		});
		tilesInRow.sort((a, b) => (a.order > b.order ? 1 : -1));
		tilesInRow.forEach((t, i) => {
			const newOrder = i + 1;
			if (newOrder < order) t.order = newOrder;
			if (newOrder >= order) t.order = newOrder + 1;
		});
		// Add tile to tome data
		tomeData.tiles.push(tile);
		// Redistribute tile widths
		tilesInRow = tomeData.tiles.filter(tile => {
			return tile.rowId === row.id;
		});
		tilesInRow.forEach((t, i) => {
			t.width = metricConstants.cColumnCount / tilesInRow.length;
		});

		// Select the new tile
		selectTile(tile);

		// Return created tile object
		return tile;
	};

	const appendNewTile = tileName => {
		const rows = tomeData.rows.filter(r => {
			return r.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let row = rows[rows.length - 1]; // append to last row
		let order = 1;
		const tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === row.id;
		});
		if (tiles.length >= 4) {
			row = appendRowAtOrder(currentPage, tomeData, row.order + 1);
		} else {
			order = tiles.length + 1;
		}
		const tile = createTileInRowAtOrder(tileName, row, order);
		// Select the new tile
		selectTile(tile);
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
		} else {
			// Reset tile orders and redistribute widths
			tiles.forEach((t, i) => {
				t.order = i + 1;
				t.width = 12 / tiles.length;
				//console.log(t);
			});
		}

		if (selectedTile && selectedTile.id === tile.id) {
			setSelectedTile(null);
			//setSidePanelOpen(false);
			setPanelName(panelNames.TILES);
		}

		// Update tome data
		saveState();
	};

	const selectTile = tile => {
		if (selectedOutlinePage) {
			setSelectedOutlinePage(null);
		}
		if (backgroundSelected) {
			setBackgroundSelected(false);
		}
		if (promptIsOpen) {
			setPromptIsOpen(false);
		}
		setSelectedTile(tile);
		// update property panel
		setPanelName(tile.type);
		// open panel
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
				copiedTileRowHeight.current = row.height;
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
		console.log("pasteFromClipboardToNearestPosition", info);
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
	};

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
	};

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

	const moveTileToRowAtOrder = (tile, row, order = 1) => {
		//console.log("moveTileToRowAtOrder", order);

		if (row.id === tile.rowId) {
			//
			// Moving tile within same row
			//
			const otherTiles = tomeData.tiles.filter(({ id, rowId }) => rowId === row.id && id !== tile.id);
			otherTiles.sort((a, b) => (a.order > b.order ? 1 : -1));
			otherTiles.forEach((t, i) => {
				const newOrder = i + 1;
				if (tile.order < order) {
					if (t.order <= order) {
						t.order = newOrder;
					}
					if (t.order > order) {
						t.order = newOrder + 1;
					}
				} else {
					if (t.order < order) {
						t.order = newOrder;
					}
					if (t.order >= order) {
						t.order = newOrder + 1;
					}
				}
			});
			tile.order = order;
		} else {
			//
			// Moving tile to a different row
			//
			//const movingTileIndex = tomeData.tiles.indexOf(tile);
			//const movingTile = tomeData.tiles.splice(movingTileIndex, 1)[0];
			//tile.rowId = ""; // remove from row
			const oldRow = tomeData.rows.find(({ id }) => id === tile.rowId);
			const oldTiles = tomeData.tiles.filter(({ rowId, id }) => rowId === oldRow.id && id !== tile.id);
			if (oldTiles.length > 0) {
				// Reset order and widths of remaining tiles in old row
				oldTiles.sort((a, b) => (a.order > b.order ? 1 : -1));
				oldTiles.forEach((t, i) => {
					t.order = i + 1;
					t.width = 12 / oldTiles.length;
				});
			} else {
				// Remove old row if there's no tiles left in it
				const oldRowIndex = tomeData.rows.indexOf(oldRow);
				tomeData.rows.splice(oldRowIndex, 1);
			}

			const newTiles = tomeData.tiles.filter(({ rowId }) => rowId === row.id);
			newTiles.sort((a, b) => (a.order > b.order ? 1 : -1));
			if (newTiles.length > 0) {
				const maxPerRow = metricConstants.cColumnMax;
				if (newTiles.length >= maxPerRow) {
					// Too many tiles in this row, boot the last tile down
					const lastTile = newTiles.splice(newTiles.length - 1, 1)[0];
					// Make a new row for the booted tile
					const newRow = appendRowAtOrder(currentPage, tomeData, row.order + 1);
					newRow.height = row.height;
					lastTile.width = metricConstants.cColumnCount;
					lastTile.rowId = newRow.id;
					lastTile.order = 1;
				}

				// Reset order and widths of remaining tiles in old row
				newTiles.forEach((t, i) => {
					if (t.order >= order) t.order += 1;
					t.width = metricConstants.cColumnCount / (newTiles.length + 1);
				});
				tile.width = metricConstants.cColumnCount / (newTiles.length + 1);
			}

			tile.rowId = row.id;
			tile.order = order;

			//tomeData.tiles.push(movingTile);
		}
		//setTomeData(JSON.parse(JSON.stringify(tomeData)));
		saveState();
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
		const newTile = addTileToRow(tileType, false, tile.params);
		if (newTile) {
			playTilePasteSound();
			if (showContextMenu) setShowContextMenu(false);
		}
		return newTile;
	};

	// *** Add Files To A Row At A Specific Tile Order ***
	// - adds a sequence of tiles [t]
	// - starting at row r
	// - starting at tile order i
	// - will add rows as necessary
	// - will boot other tiles down to their own row if necessary
	// (used for drag and drop)

	const fileReaders = React.useRef(null);

	const loadFile = () => {
		//console.log("loadFile");
		if (fileReaders.current && fileReaders.current.length > 0) {
			const obj = fileReaders.current.shift();
			if (obj.tile.type === tileNames.TEXT.name) {
				obj.reader.readAsText(obj.file);
			} else {
				obj.reader.readAsDataURL(obj.file);
			}
		}
	};

	const onFileReaderLoad = (e, tile) => {
		//console.log("onFileLoad");
		tile.isLoading = false;
		if (tile.params && tile.params.isLoading === true) tile.params.isLoading = false;
		if (tile.type === tileNames.IMAGE.name) {
			tile.params.image = e.target.result;
		}
		if (tile.type === tileNames.VIDEO.name) {
			tile.params.video = e.target.result;
			tile.params.autoPlay = true;
		}
		if (tile.type === tileNames.TEXT.name) {
			tile.params = {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H2,
						content: e.target.result,
					},
				],
			};
			//tile.onFileLoaded();
		}
		setTomeData({ ...tomeData });
		loadFile();
	};

	const addFilesToRowAtOrderWithMaxPerRow = (
		files = [],
		row = {},
		order = 1,
		maxPerRow = metricConstants.cColumnMax
	) => {
		//console.log("addFilesToRowAtOrderWithMaxPerRow", files);
		// Save state first
		saveStateToUndo();
		let tilesToBeBooted = [];
		const initialRowHeight = row.height;
		const tilesInRow = tomeData.tiles.filter(t => {
			return t.rowId === row.id;
		});
		if (tilesInRow.length + files.length > maxPerRow && order < tilesInRow.length) {
			// Based on the order, how many tiles need to be booted off the current row?
			// Strand those tiles temporarily so they can be added back at the end
			tilesToBeBooted = tilesInRow.filter(t => {
				return t.order >= order;
			});
			tilesToBeBooted.forEach(t => {
				t.rowId = "";
			});
		}
		row.height = getRowHeightForTileCount(
			files.length + tilesInRow.length > maxPerRow ? maxPerRow : files.length + tilesInRow.length
		);
		// keep track of row orders
		let newRowCount = 0;
		const rowOrder = row.order;
		let orderIncrement = 0;

		// create an array of file readers
		fileReaders.current = [];
		let filesRemaining = files.length;

		files.forEach((file, i) => {
			// first check if row is full
			const tilesInRow = tomeData.tiles.filter(t => {
				return t.rowId === row.id;
			});

			let type = tileNames.IMAGE.name;
			if (file.type.match("video.*")) type = tileNames.VIDEO.name;
			if (file.type.match("text.*")) type = tileNames.TEXT.name;

			//tilesInRow.sort((a, b) => (a.order > b.order ? 1 : -1));
			if (tilesInRow.length >= maxPerRow) {
				// increment count
				newRowCount++;
				// make a new row for the remainder of the files
				row = appendRowAtOrder(currentPage, tomeData, rowOrder + newRowCount);
				// set the new row's height based on the number of tiles it will have
				row.height = getRowHeightForTileCount(filesRemaining > maxPerRow ? maxPerRow : filesRemaining);
				// reset tile order increment
				order = 1;
				orderIncrement = 0;
			}

			const tile = createTileInRowAtOrder(type, row, order + orderIncrement);
			//tile.onFileLoad = () => console.log("test me")
			tile.isLoading = true;
			//tile.loadingOrder = i + 1;
			const reader = new FileReader();
			reader.onload = e => {
				onFileReaderLoad(e, tile);
			};
			fileReaders.current.push({ reader: reader, file: file, order: i + 1, tile: tile });
			filesRemaining--;
			orderIncrement++;
		});

		if (tilesToBeBooted.length > 0) {
			newRowCount++;
			row = appendRowAtOrder(currentPage, tomeData, rowOrder + newRowCount);
			row.height = initialRowHeight;
			tilesToBeBooted.forEach((t, i) => {
				t.order = i + 1;
				t.rowId = row.id;
				t.width = metricConstants.cColumnCount / tilesToBeBooted.length;
			});
		}

		// save the tiles
		setTomeData({ ...tomeData });
		//setTomeData(JSON.parse(JSON.stringify(tomeData)));

		// start loading the first file
		setTimeout(() => loadFile(), 10);
	};

	const createBackground = () => {
		if (currentPage.background) {
			console.log("background already exists!");
			currentPage.background.params.image = undefined;
			currentPage.background.params.video = undefined;
		} else {
			console.log("creating the background!");
			currentPage.background = {};
			currentPage.background.params = {};
			currentPage.background.params.opacity = 50;
		}
		setTomeData({ ...tomeData });
	};

	const createDynamicBackground = () => {
		currentPage.background = {};
		currentPage.background.params = {};
		setPanelName(tileNames.BACKGROUND.name);
		setSidePanelOpen(true);
		setTomeData({ ...tomeData });
		if (selectedTile) setSelectedTile(null);
	};

	const deleteBackground = () => {
		console.log("deleting the background!");
		if (sidePanelOpen) {
			setPanelName(null);
			setSidePanelOpen(false);
		}
		currentPage.background = undefined;
		setTomeData({ ...tomeData });
		setBackgroundSelected(false);
	};

	const createBackgroundWithDroppedFiles = files => {
		const file = files[0];
		let type = tileNames.IMAGE.name;
		if (file.type.match("video.*")) type = tileNames.VIDEO.name;
		// Save state first
		saveStateToUndo();
		// Create
		createBackground();
		// Prep loading file
		fileReaders.current = [];
		const reader = new FileReader();
		reader.onload = e => {
			onFileReaderLoad(e, currentPage.background);
		};
		fileReaders.current.push({ reader: reader, file: file, order: 1, tile: currentPage.background });
		// start loading the first file
		dropIndicatorInfo.backgroundDropType.set(type);
		currentPage.background.type = type;
		currentPage.background.params.isLoading = true;
		setTimeout(() => loadFile(), 10);
		selectBackground();
	};

	const toggleBackgroundSelection = () => {
		if (backgroundSelected) {
			setBackgroundSelected(false);
			if (sidePanelOpen) {
				setSidePanelOpen(false);
			}
		} else {
			if (selectedTile) {
				if (sidePanelOpen) {
					setSidePanelOpen(false);
				}
				setPanelName(null);
				setSelectedTile(null);
			} else {
				selectBackground();
			}
		}
	};

	const togglePrompt = () => {
		setPromptIsOpen(!promptIsOpen);
		if (sidePanelOpen) {
			setSidePanelOpen(false);
		}
		if (panelName) {
			setPanelName(null);
		}
		if (selectedTile) {
			setSelectedTile(null);
		}
		if (backgroundSelected) {
			setBackgroundSelected(false);
		}
	};

	const showMenu = info => {
		// showMenu({
		// 	type: "tome_menu",
		// 	buttonId: "tome_menu_button",
		// 	alignX: "trailing",
		// 	alignY: "trailing",
		// })
		menuInfo.show = true;
		menuInfo.type = info.type;
		menuInfo.buttonId = info.buttonId;
		const el = document.getElementById(info.buttonId);
		if (el) {
			const rect = el.getBoundingClientRect();
			console.log(rect);
			const wW = window.innerWidth;
			const wH = window.innerHeight;
			const mW = 220;
			let mH = 176;
			if (info.type === "prompt_create_tome") mH = 196;
			const bX = rect.x;
			const bY = rect.y;
			const bW = rect.width;
			const bH = rect.height;
			const gV = 8;
			if (info.alignX === "trailing") menuInfo.x = bX + bW - mW;
			if (info.alignX === "middle") menuInfo.x = bX + bW / 2 - mW / 2;
			if (info.alignY === "trailing") menuInfo.y = bY + bH + gV;
			if (info.alignY === "leading") menuInfo.y = bY - gV - mH;
			setMenuInfo({ ...menuInfo });
		}
	};

	const closeMenu = () => {
		menuInfo.show = false;
		setMenuInfo({ ...menuInfo });
		//playCloseMenuSound();
	};

	const selectBackground = () => {
		setBackgroundSelected(true);

		if (selectedOutlinePage) {
			setSelectedOutlinePage(null);
		}
		if (selectedTile) {
			setSelectedTile(null);
		}
		// update property panel
		setPanelName(tileNames.BACKGROUND.name);
		// open the panel
		setSidePanelOpen(true);
	};

	const getRowHeightForTileCount = count => {
		let height = 12;
		if (count === 2) height = 9;
		if (count === 3) height = 8;
		if (count === 4) height = 7;
		if (count === 5) height = 6;
		if (count === 6) height = 5;
		if (count > 6) height = 4;
		//height = 8;
		return height;
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
		//console.log("saveState", tomeData);
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
				tomeData,
				setTomeData,

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
				showPage,

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

				layoutTweaking,
				setLayoutTweaking,

				tileDragging,
				setTileDragging,
				tileHoveringId,
				tileReplaceId,

				tileDropInfo,
				setTileDropInfo,
				showTileDropTarget,
				dropIndicatorInfo,

				textTileFocussed,
				setTextTileFocussed,

				showContextMenu,
				setShowContextMenu,
				contextMenuInfo,
				setContextMenuInfo,

				showMenu,
				closeMenu,
				menuInfo,
				setMenuInfo,

				playSounds,
				setPlaySounds,

				addTileToRow,
				appendNewTile,
				moveTileToRowAtOrder,
				createTileInRowAtOrder,
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

				contentTileHeightsList,

				updateImageTileWithImage,
				addImageTileFromClipboard,
				addTileFromClipboard,

				addFilesToRowAtOrderWithMaxPerRow,
				createBackgroundWithDroppedFiles,
				backgroundSelected,
				setBackgroundSelected,
				toggleBackgroundSelection,
				createBackground,
				selectBackground,
				deleteBackground,
				createDynamicBackground,

				saveState,
				saveStateToUndo,
				undo,

				getTileForId,
				getNewImageTile,

				promptIsOpen,
				setPromptIsOpen,
				togglePrompt,
				isGenerating,
				setIsGenerating,
				autoPaging,
				resetTome,
				//isAutoPaging,
				//setIsAutoPaging,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
