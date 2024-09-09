import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

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

const TITLE = "Present 01";

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

export const toolbarButtons = [
	


	{
		type: "tile",
		name: "text",
		toolTip: "Text Tile",
		shortcut: "T",
		panelTitle: "Text",
	},
	{
		type: "tile",
		name: "image",
		toolTip: "Image Tile",
		shortcut: "I",
		panelTitle: "Image",
	},
	{
		name: "addTile",
		toolTip: "Add Tile",
		shortcut: "A",
		panelHeight: 567,
		panelTitle: "Add Tile",
	},
	{
		type: "panel",
		name: "recordOverlay",
		toolTip: "Record Narration",
		shortcut: "R",
		panelTitle: "Record",
	},
	{
		type: "panel",
		name: "annotate",
		toolTip: "Add Annotation",
		shortcut: "N",
		panelImage: "",
		panelTitle: "Add Annotation",
	},
	{
		type: "panel",
		name: "comments",
		toolTip: "Comments",
		shortcut: "C",
		panelTitle: "Comments",
	},
];

export const defaultLayoutTransition = {
	duration: 0.45,
	ease: [0.4, 0, 0.1, 1],
};

export const defaultLayoutSpring = {
	type: "spring",
	stiffness: 550,
	damping: 30,
};

export const Present01 = props => {
	/*
	Window Size, Mouse Position
	*/
	const windowSize = useWindowSize();

	//const mousePosition = useMousePosition();
	const mouseX = useMouseXMotionPosition();
	const mouseY = useMouseYMotionPosition();

	/*
	Properties Panel junk
	*/
	const [panelOpen, setPanelOpen] = useState(false);
	const [activePanelName, setActivePanelName] = useState(null);
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
	Emphasis Tool junk
	*/
	const [activeEmphasisTool, setActiveEmphasisTool] = useState("emphasisPointer");
	const [pageIsHovered, setPageIsHovered] = useState(false);

	
	/*
	Editor State (editing, presenting, ...)
	*/
	const [editorState, setEditorMode] = useState("editing");
	const setEditorState = useCallback(
		state => {
			setEditorMode(state);
		},
		[setEditorMode]
	);
	const [outlineOpen, setOutlineOpen] = useState(true);

	return (
		<Wrap>
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>
			
			<motion.div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
				}}
				onTap={() => {
					setActivePanelName(null);
					setPanelOpen(false);
				}}
			/>

			<Outline editorState={editorState} outlineOpen={outlineOpen} setOutlineOpen={setOutlineOpen} />

			<BottomBar showTooltip={showTooltip} hideTooltip={hideTooltip} editorState={editorState} />

			<Titlebar
				title={TITLE}
				showTooltip={showTooltip}
				hideTooltip={hideTooltip}
				editorState={editorState}
				setEditorState={setEditorState}
				onPanelClose={onPanelClose}
			/>

			<AnimatePresence>
				{panelOpen && <Panel panelName={activePanelName} onPanelClose={onPanelClose} />}
			</AnimatePresence>

			<Page
				windowSize={windowSize}
				panelOpen={panelOpen}
				editorState={editorState}
				outlineOpen={outlineOpen}
				setPageIsHovered={setPageIsHovered}
			/>

			<Toolbar
				panelOpen={panelOpen}
				panelName={activePanelName}
				setPanelState={setPanelState}
				setActivePanelName={setActivePanelName}
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
			/>

			<Tooltip state={tooltipState} />
			
			<EmphasisCursor
				mouseX={mouseX}
				mouseY={mouseY}
				activeEmphasisTool={activeEmphasisTool}
				editorState={editorState}
				pageIsHovered={pageIsHovered}
			/>
		</Wrap>
	);
};
