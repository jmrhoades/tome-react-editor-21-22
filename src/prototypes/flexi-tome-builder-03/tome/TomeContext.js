import React, { useState, createContext } from "react";
import { useMotionValue } from "framer-motion";
import { TestTome } from "./TestTome";
import { panels } from "../panel/Panel";

export const permissions = {
	COMMENT_ONLY: "Comment only",
	EDITOR: "Editor",
};

export const tiles = {
	TEXT: "text",
	IMAGE: "image",
	LARGELETTER: "largeLetter",
	METRICS: "metrics",
};

export const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
	H2: "h2",
	H3: "h3",
};

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
	Tile State
	*/
	const [selectedTile, setSelectedTile] = useState(null);
	const [tileResizing, setTileResizing] = useState(false);
	const tileZIndex = useMotionValue(0);
	const tileDropPoint = useMotionValue(-1);

	/*
	Pages
	*/
	const [pages, setPages] = useState(TestTome);

	const newPage = order => {
		return {
			id: "page" + Math.random(),
			order: order,
			tiles: [
				{
					id: "tileAPageA" + Math.random(),
					order: 1,
					size: "half",
					type: tiles.TEXT,
					params: {
						blocks: [
							{
								type: textBlockType.H1,
								content: "Heading 1",
							},
							{
								type: textBlockType.P,
								content: "This is some test content.",
							},
							{
								type: textBlockType.LI,
								content: ["List item 1", "List item 2", "List item 3"],
							},
						],
					},
				},
				{
					id: "tileBPageA" + Math.random(),
					order: 2,
					size: "half",
					type: tiles.IMAGE,
					params: {
						image: "./images/ds-image-tile-bw-sand-square.jpg",
					},
				},
			],
		};
	};

	const [currentPage, setCurrentPage] = useState(pages[0]);
	const [previousPage, setPreviousPage] = useState(null);

	const addPage = () => {
		// console.log("addPage", pages);
		// Find the current page
		const cPage = pages.find(({ id }) => id === currentPage.id);

		// Make new page, insert it after current page
		const nPage = newPage(cPage.order + 1);
		const index = pages.indexOf(cPage);
		pages.splice(index + 1, 0, nPage);

		// Increment order value for every page after new page
		for (let i = 0; i < pages.length; i++) {
			if (index + 1 < i) {
				pages[i].order++;
			}
		}

		// Sort array by order
		pages.sort(function (a, b) {
			return a.order - b.order;
		});

		// Set current page to new page
		showPage(nPage, true);
		setPages(pages);

		// deselect stuff
		// setSelectedTile(null);
		// setPanelOpen(false);
		// setPanelName("");
	};

	const goToNextPage = () => {
		const nextPage = pages.find(page => page.order === currentPage.order + 1);
		if (nextPage) {
			showPage(nextPage);
		}
	};

	const goToPreviousPage = () => {
		const previousPage = pages.find(page => page.order === currentPage.order - 1);
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

	const [selectedOutlinePage, setSelectedOutlinePage] = useState("");

	const addTile = tileName => {
		// console.log("addTile", tileName, currentPage);

		if (currentPage.tiles.length >= 3) {
			// console.log("too many tiles :(");
			// return;
			// remove last item and replace
			currentPage.tiles.pop();
		}

		// sort tiles array by tile left position
		currentPage.tiles.sort((a, b) => a.left - b.left);

		let newTileWidth = 12;
		let newTileLeft = 0;
		if (currentPage.tiles.length === 1) {
			currentPage.tiles[0].width = 6;
			newTileWidth = 6;
			newTileLeft = 6;
		} else if (currentPage.tiles.length === 2) {
			currentPage.tiles[0].width = 4;
			currentPage.tiles[1].width = 4;
			currentPage.tiles[1].left = 4;
			newTileWidth = 4;
			newTileLeft = 8;
		}

		const newTile = {
			id: "tile_" + Math.round(Math.random() * 10000),
			width: newTileWidth,
			left: newTileLeft,
			order: currentPage.tiles.length + 1,
			type: tileName,
			params: {},
		};
		
		currentPage.tiles.push(newTile);
		setPages([currentPage]);

		// setCurrentPage(currentPage);
		// deselect stuff
		// setSelectedTile(null);
		// setPanelOpen(false);
		// setPanelName("");
	};

	const deleteTile = tile => {
		const index = currentPage.tiles.indexOf(tile);
		currentPage.tiles.splice(index, 1);

		if (currentPage.tiles.length === 1) {
			currentPage.tiles[0].width = 12;
			currentPage.tiles[0].left = 0;
		} else if (currentPage.tiles.length === 2) {
			currentPage.tiles[0].width = 6;
			currentPage.tiles[0].left = 0;
			currentPage.tiles[1].width = 6;
			currentPage.tiles[1].left = 6;
		}

		setPages([currentPage]);
		console.log("delete at index ", index);
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

				pages,
				setPages,

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

				addTile,
				deleteTile,

				tileResizing,
				setTileResizing,

				tileZIndex,
				tileDropPoint,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
