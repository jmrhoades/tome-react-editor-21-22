import React, { useState, createContext } from "react";
import { useMotionValue } from "framer-motion";
import { TestTome } from "./TestTome";

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
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	const [panelName, setPanelName] = useState("");

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
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
