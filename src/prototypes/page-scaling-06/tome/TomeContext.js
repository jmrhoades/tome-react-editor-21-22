import React, { useState, createContext } from "react";

export const transitions = {
	layoutTransition: {
		type: "spring",
		stiffness: 550,
		damping: 50,
	},
	panelTransition: {
		type: "spring",
		stiffness: 550,
		damping: 50,
	},
	defaultSpring: {
		type: "spring",
		stiffness: 550,
		damping: 30,
	},
	defaultTransition: {
		duration: 0.45,
		ease: [0.4, 0, 0.1, 1],
	},
};

export const permissions = {
	COMMENT_ONLY: "Comment only",
	EDITOR: "Editor",
};

export const tiles = {
	TEXT: "text",
	IMAGE: "image",
	LARGELETTER: "largeLetter",
	METRICS: "metrics",
}

export const textBlockType = {
	P : "p",
	LI: "li",
	H1: "h1",
}

export const themes = {
	DARK : "dark",
	LIGHT : "light",
}

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	/* 
	Editor state
	*/
	const [editorState, setEditorState] = useState("editing");

	/* 
	Permissions
	*/
	const [permission, setPermission] = useState(permissions.EDITOR);

	/*
	Pages
	*/
	const [pages, setPages] = useState([
		{
			id: "pageA",
			order: 1,
			tiles: [
				{
					id: "tileAPageA",
					order: 1,
					size: "half",
					type: tiles.METRICS,
					params: {

					}
				},
				{
					id: "tileBPageA",
					order: 2,
					size: "half",
					type: tiles.LARGELETTER,
					params: {
						letter: "C",
						color: "rgba(117, 251, 159, 1)",
					},
				},
			],
			overlay: {
				id: "overlay" + Math.random(),
				video: "/videos/HeaderCursor_left.mp4",
			}
		},
	]);
	const [currentPage, setCurrentPage] = useState(pages[0]);
	const newPage = (order) => {
		return ({
			id: "page" + Math.random(),
			order: order,
			tiles: [
				{
					id: "tileAPageA" + Math.random(),
					order: 1,
					size: "half",
					type: tiles.TEXT,
					params: {
						blocks : [
							{
								type: textBlockType.H1,
								content: "Heading 1"
							},
							{
								type: textBlockType.P,
								content: "This is some test content."
							},
							{
								type: textBlockType.LI,
								content: [
									"List item 1",
									"List item 2",
									"List item 3",
								]
							}
						]
					}
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
		})

	}
	const addPage = () => {
		// console.log("addPage", pages);
		// Find the current page
		const cPage = pages.find(({ id }) => id === currentPage.id);

		// Make new page, insert it after current page
		const nPage  = newPage(cPage.order + 1);
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
		setCurrentPage(nPage);
		setPages(pages);
	};

	/* 
	Panel state
	*/
	const [panelOpen, setPanelOpen] = useState(false);
	const [panelName, setPanelName] = useState("");

	/* 
	Outline state
	*/
	const [selectedOutlinePage, setSelectedOutlinePage] = useState("");


	/*
	Theme state
	*/
	const [theme, setTheme] = useState(themes.DARK);

	return (
		<TomeContext.Provider
			value={{
				editorState,
				setEditorState,
				permission,
				setPermission,
				panelOpen,
				setPanelOpen,
				panelName,
				setPanelName,
				selectedOutlinePage,
				setSelectedOutlinePage,
				pages,
				setPages,
				currentPage,
				setCurrentPage,
				addPage,
				theme,
				setTheme,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
