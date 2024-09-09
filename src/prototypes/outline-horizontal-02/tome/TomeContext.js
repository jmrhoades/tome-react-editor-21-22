import React, { useState, createContext, useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { useMouseXMotionPosition, useMouseYMotionPosition } from "../../../utils/dimensions";
import { tiles } from "../tile/Tile";

export const transitions = {
	layoutTransition: {
		type: "spring",
		stiffness: 450,
		damping: 50,
	},
	panelTransition: {
		duration: 0.2,
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

export const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
};

export const themes = {
	DARK: "dark",
	LIGHT: "light",
};

export const editorStates = {
	EDITING: "editing",
	FULLSCREEN: "fullscreen",
};

export const TomeContext = createContext();
export const TomeProvider = ({ children, initialPageData }) => {
	/*
	Mouse Position
	*/
	const mouseX = useMouseXMotionPosition();
	const mouseY = useMouseYMotionPosition();

	/*
	Hide/show UI
	*/
	const [showUI, setShowUI] = useState(true);
	const [pointerOverInteractiveSurface, setPointerOverInteractiveSurface] = useState(false);
	const hideUITimerRef = useRef(null);
	const HOVER_TIMEOUT = 4 * 1000;
	const clickCount = useMotionValue(0);

	/* 
	Editor state
	*/
	const [editorState, setEditorState] = useState(editorStates.EDITING);
	const [documentStatus, setDocumentStatus] = useState(editorStates.EDITING);
	const [showComments, setShowComments] = useState(false);

	/* 
	Tile State
	*/
	const [selectedTile, setSelectedTile] = useState(null);

	/* 
	Outline State
	*/
	const [selectedThumbnail, setSelectedThumbnail] = useState(null);

	/* 
	Panel state
	*/
	const [panelOpen, setPanelOpen] = useState(false);
	const [panelName, setPanelName] = useState("");
	const [panelPosition, setPanelPosition] = useState("toolbar");

	/* 
	Permissions
	*/
	const [permission, setPermission] = useState(permissions.EDITOR);

	/*
	Pages
	*/
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
					type: tiles.NULL,
					params: {},
				},
			],
		};
	};
	
	const [pages, setPages] = useState(initialPageData);
	const [currentPage, setCurrentPage] = useState(pages[0]);
	const [currentNewPage, setCurrentNewPage] = useState(null);
	const [previousPage, setPreviousPage] = useState(null);

	/*
	Theme state
	*/
	const [theme, setTheme] = useState(themes.DARK);

	// Hide/show UI
	useEffect(
		() => {
			if (hideUITimerRef.current) clearTimeout(hideUITimerRef.current);
			if (hideUITimerRef.current) clearTimeout(hideUITimerRef.current);

			mouseX.onChange(y => {
				if (hideUITimerRef.current) clearTimeout(hideUITimerRef.current);
				hideUITimerRef.current = setTimeout(() => {
					if (!showComments && !pointerOverInteractiveSurface && !selectedTile) setShowUI(false);
				}, HOVER_TIMEOUT);
				setShowUI(true);
			});
			clickCount.onChange(c => {
				if (hideUITimerRef.current) clearTimeout(hideUITimerRef.current);
				hideUITimerRef.current = setTimeout(() => {
					if (!showComments && !pointerOverInteractiveSurface && !selectedTile) setShowUI(false);
				}, HOVER_TIMEOUT);
				setShowUI(true);
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setShowUI, hideUITimerRef, showComments, pointerOverInteractiveSurface, selectedTile]
	);

	/* 
	Hide/show outline state
	*/
	const [showOutline, setShowOutline] = useState(false);
	// const toggleOutlineTimerRef = useRef(null);
	// const TOGGLE_OUTLINE_TIMEOUT = 50;
	const outlineX = 120;
	useEffect(
		() =>
			mouseY.onChange(y => {
				if (!showOutline) {
					if (
						y > window.innerHeight - 40 &&
						mouseX.get() > outlineX &&
						mouseX.get() < window.innerWidth - outlineX
					) {
						setShowOutline(true);
						/*
						if (toggleOutlineTimerRef.current) clearTimeout(toggleOutlineTimerRef.current);
						toggleOutlineTimerRef.current = setTimeout(() => {
							setShowOutline(true);
						}, TOGGLE_OUTLINE_TIMEOUT);
						*/
					}
				} else {
					if (y < window.innerHeight - 140) {
						setShowOutline(false);
					}
				}
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setShowOutline, showOutline]
	);

	//
	// Fullscreen Stuff
	const enterFullscreen = () => {
		// current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
		// deselect stuff
		setSelectedTile(null);
		setPanelOpen(false);
		setPanelName("");
	};
	useEffect(() => {
		const onFullscreenChange = event => {
			if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
				// console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
				setEditorState(editorStates.FULLSCREEN);
			} else {
				// console.log("Leaving full-screen mode.");
				setEditorState(editorStates.EDITING);
				setShowUI(true);
			}
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		document.addEventListener("mozfullscreenchange", onFullscreenChange);
		document.addEventListener("webkitfullscreenchange", onFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", onFullscreenChange);
			document.removeEventListener("mozfullscreenchange", onFullscreenChange);
			document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
		};
	});

	const showPage = (page, isNew = false) => {
		if (page.id === currentPage.id) return;
		if (currentPage) {
			setPreviousPage(currentPage);
		}
		if (isNew) {
			setCurrentNewPage(page);
		} else {
			setCurrentNewPage(null);
		}
		setCurrentPage(page);

		// deselect stuff
		setPanelOpen(false);
		setPanelName("");
		setSelectedTile(null);

		// Reset fade-out UI timer
		clickCount.set(Math.random());
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

		// deselect stuff
		setSelectedTile(null);
		setPanelOpen(false);
		setPanelName("");

		// Reset fade-out UI timer
		clickCount.set(Math.random());
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
				panelPosition,
				setPanelPosition,
				pages,
				setPages,
				currentPage,
				showPage,
				previousPage,
				addPage,
				currentNewPage,
				goToNextPage,
				goToPreviousPage,
				theme,
				setTheme,
				showOutline,
				showUI,
				clickCount,
				documentStatus,
				setDocumentStatus,
				selectedTile,
				setSelectedTile,
				enterFullscreen,
				showComments,
				setShowComments,
				pointerOverInteractiveSurface,
				setPointerOverInteractiveSurface,
				selectedThumbnail,
				setSelectedThumbnail,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
