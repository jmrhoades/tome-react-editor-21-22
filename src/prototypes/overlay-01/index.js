import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, useMotionValue } from "framer-motion";

import { useWindowSize, useMouseXMotionPosition, useMouseYMotionPosition } from "../../utils/dimensions";
import { Helmet } from "react-helmet";
import { Titlebar } from "./titlebar/Titlebar";
import { Outline } from "./outline/Outline";
import { BottomBar } from "./bottombar/BottomBar";
import { Toolbar } from "./toolbar/Toolbar";
import { EmphasisToolbar } from "./toolbar/EmphasisToolbar";
import { Page } from "./page/Page";
import { Panel } from "./panel/Panel";
import { Tooltip } from "./controls/Tooltip";
import { EmphasisCursor } from "./controls/EmphasisCursor";


const TITLE = "Overlay 01";

const Wrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #090909;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

export const metrics = {
	cViewportWidth: 1280,
	cPageWidth: 772,
	cPageHeight: 394,
	cPageRadius: 24,
	cTileHeight: 362,
	cTileRadius: 12,
	cTileMargin: 16,
	cPanelWidth: 240,
	cPanelRight: 80,
};

export const defaultLayoutTransition = {
	duration: 0.45,
	ease: [0.4, 0, 0.1, 1],
};

export const defaultLayoutSpring = {
	type: "spring",
	stiffness: 550,
	damping: 30,
};

export const Overlay01 = props => {
	/*
	Window Size, Mouse Position, Page Height
	*/
	const windowSize = useWindowSize();
	const mouseX = useMouseXMotionPosition();
	const mouseY = useMouseYMotionPosition();
	const pageHeight = useMotionValue();

	/*
	Properties Panel junk
	*/
	const [panelOpen, setPanelOpen] = useState(true);
	const [activePanelName, setActivePanelName] = useState("Record");
	const setPanelState = useCallback(
		state => {
			setPanelOpen(state);
		},
		[setPanelOpen]
	);
	const onPanelClose = () => {
		setActivePanelName(null);
		setPanelOpen(false);
	};

	/*
	Tooltip junk
	*/
	const [tooltipState, setTooltipState] = useState({
		state: "hide",
		label: "",
		shortcut: "",
		rect: { x: 0, y: 0 },
		alignment: "",
	});
	const showTooltipTimerRef = useRef(null);
	const showTooltip = info => {
		// console.log("showTooltip", info.rect, info.label, info.shortcut, info.alignment);
		if (tooltipState.state === "hide") {
			if (showTooltipTimerRef.current) {
				clearTimeout(showTooltipTimerRef.current);
			}
			showTooltipTimerRef.current = setTimeout(() => {
				info.state = "show";
				setTooltipState(info);
			}, 1000);
		} else {
			info.state = "moveTo";
			setTooltipState(info);
		}
	};
	const hideTooltip = id => {
		// console.log("hideTooltip");
		if (showTooltipTimerRef.current) {
			clearTimeout(showTooltipTimerRef.current);
		}
		setTooltipState({
			state: "hide",
			rect: tooltipState.rect,
			label: tooltipState.label,
			shortcut: tooltipState.shortcut,
			alignment: tooltipState.alignment,
		});
	};

	/* 
	Outline junk
	*/
	const [selectedOutlinePage, setSOutlinePage] = useState("");
	const setSelectedOutlinePage = useCallback(
		state => {
			setSOutlinePage(state);
			if (state !== "") {
				setSTile("");
			}
		},
		[setSOutlinePage]
	);

	/* 
	Tile junk
	*/
	const [selectedTile, setSTile] = useState("");
	const setSelectedTile = useCallback(
		state => {
			setSTile(state);
			if (state !== "") {
				setSelectedOutlinePage("");
			}
		},
		[setSTile,setSelectedOutlinePage]
	);

	/*
	Editor State (editing, presenting, ...)
	*/
	const [editorState, setEditorMode] = useState("editing");
	/* FIX ME
	This uses a timeout to update state to get around a framer motion bug(?)
	caused by using a draggable layers inside a parent with a layout animation
	*/
	const [isPresentTransitionedFinished, setIsPresentTransitionedFinished] = useState(false);
	const presentTransitionTimeout = useRef(0);
	const setEditorState = useCallback(
		state => {
			setEditorMode(state);
			if (state === "presenting") {
				presentTransitionTimeout.current = setTimeout(() => setIsPresentTransitionedFinished(true), 500);
			} else {
				setIsPresentTransitionedFinished(false);
				if (presentTransitionTimeout.current) {
					clearTimeout(presentTransitionTimeout.current);
				}
			}
		},
		[setEditorMode]
	);

	/*
	Emphasis Tool junk
	*/
	const [activeEmphasisTool, setActiveEmphasisTool] = useState("ArrowCursor");
	const [pageIsHovered, setPageIsHovered] = useState(false);
	const [imageTileClickEmphasized, setImageTileClickEmphasized] = useState(false);
	const [textTileClickEmphasized, setTextTileClickEmphasized] = useState(false);
	const [textTileBlockClickEmphasized, setTextTileBlockClickEmphasized] = useState(false);
	/*
	Window click capture handler aka "Deselect The World"
	NB: This approach to selection management requires using stopPropagation
	on _any_ other mouseup handler, that's probably a dumb for a million reasons
	*/
	useEffect(() => {
		const deselectTheWorld = e => {
			// console.log("deselectTheWorld");
			// console.log(e.target.classList);
			let deselect = true;
			if (e.target && e.target.classList && e.target.classList.contains("select")) {
				deselect = false;
			}

			// Close properties panel
			setPanelState(false);
			setActivePanelName("");

			// Deselect outline pages
			setSelectedOutlinePage("");

			// Deselect tiles
			setSelectedTile("");

			if (deselect) {
				// Deselect any emphasis states
				setTextTileBlockClickEmphasized(false);
				setTextTileClickEmphasized(false);
				setImageTileClickEmphasized(false);
			}
		};

		// window.addEventListener("mouseup", deselectTheWorld);

		return () => window.removeEventListener("mouseup", deselectTheWorld);
	});

	return (
		<Wrap>
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>

			<BottomBar showTooltip={showTooltip} hideTooltip={hideTooltip} editorState={editorState} />

			<Outline
				editorState={editorState}
				windowSize={windowSize}
				selectedOutlinePage={selectedOutlinePage}
				setSelectedOutlinePage={setSelectedOutlinePage}
			/>

			<Titlebar
				title={TITLE}
				showTooltip={showTooltip}
				hideTooltip={hideTooltip}
				editorState={editorState}
				setEditorState={setEditorState}
				onPanelClose={onPanelClose}
				imageTileClickEmphasized={imageTileClickEmphasized}
				textTileClickEmphasized={textTileClickEmphasized}
				textTileBlockClickEmphasized={textTileBlockClickEmphasized}
			/>

			<AnimatePresence>
				{panelOpen && <Panel panelName={activePanelName} onPanelClose={onPanelClose} editorState={editorState} />}
			</AnimatePresence>

			<Page
				windowSize={windowSize}
				pageHeight={pageHeight}
				panelOpen={panelOpen}
				editorState={editorState}
				setPageIsHovered={setPageIsHovered}
				selectedTile={selectedTile}
				setSelectedTile={setSelectedTile}
				imageTileClickEmphasized={imageTileClickEmphasized}
				setImageTileClickEmphasized={setImageTileClickEmphasized}
				isPresentTransitionedFinished={isPresentTransitionedFinished}
				textTileClickEmphasized={textTileClickEmphasized}
				setTextTileClickEmphasized={setTextTileClickEmphasized}
				textTileBlockClickEmphasized={textTileBlockClickEmphasized}
				setTextTileBlockClickEmphasized={setTextTileBlockClickEmphasized}
			/>

			<Toolbar
				panelOpen={panelOpen}
				panelName={activePanelName}
				setActivePanelName={setActivePanelName}
				setPanelState={setPanelState}
				showTooltip={showTooltip}
				hideTooltip={hideTooltip}
				editorState={editorState}
			/>

			<EmphasisToolbar
				showTooltip={showTooltip}
				hideTooltip={hideTooltip}
				editorState={editorState}
				activeEmphasisTool={activeEmphasisTool}
				setActiveEmphasisTool={setActiveEmphasisTool}
				windowSize={windowSize}
				pageHeight={pageHeight}
				imageTileClickEmphasized={imageTileClickEmphasized}
				textTileClickEmphasized={textTileClickEmphasized}
				textTileBlockClickEmphasized={textTileBlockClickEmphasized}
			/>

			<Tooltip state={tooltipState} />

			<EmphasisCursor
				mouseX={mouseX}
				mouseY={mouseY}
				activeEmphasisTool={activeEmphasisTool}
				editorState={editorState}
				pageIsHovered={pageIsHovered}
				imageTileClickEmphasized={imageTileClickEmphasized}
				textTileClickEmphasized={textTileClickEmphasized}
				textTileBlockClickEmphasized={textTileBlockClickEmphasized}
			/>

			
		</Wrap>
	);
};
