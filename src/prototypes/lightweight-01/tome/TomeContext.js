import React, { useState, createContext, useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { useMouseXMotionPosition, useMouseYMotionPosition } from "../../../utils/dimensions";

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
		duration: 1,
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
};

export const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
};

export const themes = {
	DARK: "dark",
	LIGHT: "light",
};

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	/*
	Mouse Position
	*/
	const mouseX = useMouseXMotionPosition();
	const mouseY = useMouseYMotionPosition();

	/*
	Hide/show UI
	*/
	const hideUITimerRef = useRef(null);
	const [showUI, setShowUI] = useState(true);
	const HOVER_TIMEOUT = 3 * 1000;
	const clickCount = useMotionValue(0);

	useEffect(
		() =>
			mouseX.onChange(y => {
				if (hideUITimerRef.current) clearTimeout(hideUITimerRef.current);
				hideUITimerRef.current = setTimeout(() => {
					setShowUI(false);
				}, HOVER_TIMEOUT);
				setShowUI(true);
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setShowUI, hideUITimerRef]
	);
	useEffect(
		() =>
			clickCount.onChange(c => {
				if (hideUITimerRef.current) clearTimeout(hideUITimerRef.current);
				hideUITimerRef.current = setTimeout(() => {
					setShowUI(false);
				}, HOVER_TIMEOUT);
				setShowUI(true);
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setShowUI, hideUITimerRef]
	);

	/* 
	Hide/show outline state
	*/
	const [showOutline, setShowOutline] = useState(false);
	useEffect(
		() =>
			mouseY.onChange(y => {
				if (y > window.innerHeight - 120) {
					if (!showOutline) {
						setShowOutline(true);
					}
				} else {
					if (showOutline) {
						setShowOutline(false);
					}
				}
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setShowOutline, showOutline]
	);

	/* 
	Editor state
	*/
	const [editorState, setEditorState] = useState("editing");
	const [documentStatus, setDocumentStatus] = useState("editing");

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
					type: tiles.TEXT,
					params: {
						blocks: [
							{
								type: textBlockType.H1,
								content: "🙃 New Tome Design",
							},
							{
								type: textBlockType.LI,
								content: [
									"2 tiles are back in full force",
									"✌️ page background",
									"Outline is simplified, expands on hover",
									"Tomes autoplay",
								],
							},
						],
					},
				},
				{
					id: "tileBPageA",
					order: 2,
					size: "half",
					type: tiles.IMAGE,
					params: {
						image: "./images/doge-graph-01.svg",
					},
				},
			],
			overlay: {
				id: "overlay" + Math.random(),
				video: "/videos/av-overlay-head-a.mp4",
			},
		},
	]);
	const [currentPage, setCurrentPage] = useState(pages[0]);
	const [currentNewPage, setCurrentNewPage] = useState(null);
	const showPage = (page, isNew) => {
		if (currentPage) {
			setPreviousPage(currentPage);
		}
		if (isNew) {
			setCurrentNewPage(page);
		} else {
			setCurrentNewPage(null);
		}
		setCurrentPage(page);
	};
	const [previousPage, setPreviousPage] = useState(null);
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
					params: {},
				},
				{
					id: "tileBPageA" + Math.random(),
					order: 2,
					size: "half",
					type: tiles.IMAGE,
					params: {},
				},
			],
		};
	};
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
	};

	/* 
	Panel state
	*/
	const [panelOpen, setPanelOpen] = useState(false);
	const [panelName, setPanelName] = useState("");

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
				pages,
				setPages,
				currentPage,
				showPage,
				previousPage,
				addPage,
				currentNewPage,
				theme,
				setTheme,
				showOutline,
				showUI,
				clickCount,
				documentStatus,
				setDocumentStatus,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
