/* eslint-disable */

import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, useMotionValue } from "framer-motion";

import { useWindowSize } from "../../utils/dimensions";
import { Helmet } from "react-helmet";
import { Titlebar } from "./titlebar/Titlebar";
import { Outline } from "./outline/Outline";
import { BottomBar } from "./bottombar/BottomBar";
import { Toolbar } from "./toolbar/Toolbar";
import { Page } from "./page/Page";
import { Panel } from "./panel/Panel";
import { AnnotationProvider } from "./annotation/AnnotationContext";
import { CursorProvider } from "./cursor/CursorContext";
import { Cursor } from "./cursor/Cursor";

const TITLE = "Annotation 01";

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

export const Annotation01 = props => {
	/*
	Window Size, Mouse Position, Page Height
	*/
	const windowSize = useWindowSize();
	const pageHeight = useMotionValue();

	/*
	Properties Panel junk
	*/
	const [panelOpen, setPanelOpen] = useState(false);
	const [activePanelName, setActivePanelName] = useState("");
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
	Editor State (editing, presenting, ...)
	*/
	const [editorState, setEditorState] = useState("editing");


	/* 
	Annotations junk
	*/
	const [selectedAnotation, setSSelectedAnnotation] = useState(null);
	const setSelectedAnnotation = useCallback(
		state => {
			setSSelectedAnnotation(state);
			if (state !== null) {
				// Deselect tiles
				setSelectedTile("");
				// select annotation
				setPanelOpen(true);
				setActivePanelName("Annotate");
			}
		},
		[]
	);

/* 
	Tile junk
	*/
	const [selectedTile, setSTile] = useState("");
	const setSelectedTile = useCallback(
		state => {
			setSTile(state);
			if (state !== "") {
				if (state === "tileA") {
					setPanelOpen(true);
					setActivePanelName("Text");
				}
				if (state === "tileB") {
					setPanelOpen(true);
					setActivePanelName("Photo");
				}
				// Deselect outline pages
				setSelectedOutlinePage("");
				// Deselect annotation
				setSelectedAnnotation(null);
			}
		},
		[setSTile, setSelectedOutlinePage, setSelectedAnnotation]
	);


	/*
	Window click capture handler aka "Deselect The World"
	NB: This approach to selection management requires using stopPropagation
	on _any_ other mouseup handler, that's probably a dumb for a million reasons
	*/
	useEffect(() => {
		const deselectTheWorld = e => {
			// console.log("deselectTheWorld");
			// console.log(e.target.classList);

			// Close properties panel
			setPanelState(false);
			setActivePanelName("");

			// Deselect outline pages
			setSelectedOutlinePage("");

			// Deselect tiles
			setSelectedTile("");

			// Deselect annotation
			setSelectedAnnotation(null);

		};

		window.addEventListener("mouseup", deselectTheWorld);

		return () => window.removeEventListener("mouseup", deselectTheWorld);
	});

	return (
		<Wrap>
			<AnnotationProvider>
				<CursorProvider>
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
					/>

					<AnimatePresence>
						{panelOpen && (
							<Panel
								panelName={activePanelName}
								onPanelClose={onPanelClose}
								editorState={editorState}
								selectedAnotation={selectedAnotation}
							/>
						)}
					</AnimatePresence>

					<Page
						windowSize={windowSize}
						pageHeight={pageHeight}
						panelOpen={panelOpen}
						editorState={editorState}
						selectedTile={selectedTile}
						setSelectedTile={setSelectedTile}
						selectedAnotation={selectedAnotation}
						setSelectedAnnotation={setSelectedAnnotation}
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
					<Cursor />
					{/* <AnnotationCursor selectedAnotation={selectedAnotation} /> */}
				</CursorProvider>
			</AnnotationProvider>
		</Wrap>
	);
};
