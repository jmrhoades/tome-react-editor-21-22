import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext } from "../metrics/MetricsContext";
import { tiles } from "../tile/Tile";

export const panels = {
	TILES: "tiles",
	OVERLAY: "overlay",
	ANNOTATIONS: "annotations",
};

const Wrap = styled(motion.div)`
	position: absolute;
	z-index: 10;
	pointer-events: none;
`;

const PanelWrap = styled(motion.div)`
	position: absolute;
	left: 0;
	top: 0;
	pointer-events: auto;
	overflow: hidden;
	border-radius: 16px;
	border-radius: 16px;
	filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.5));
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #212121;
	pointer-events: none;
`;

const Image = styled(motion.img)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const panelVariants = {
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.1,
		},
	},
	hide: {
		opacity: 0,
		scale: 0.95,
		transition: {
			duration: 0.0,
		},
	},
};

export const Panel = props => {
	const { showUI, panelOpen, panelPosition, panelName, showComments } = useContext(TomeContext);
	const { viewportWidth, viewportHeight } = useContext(MetricsContext).metrics;

	const boundsRef = useRef(null);
	const margin = 32;
	const panelWidth = 240;

	const panelX = useMotionValue(0);
	const panelY = useMotionValue(0);

	const panelInfo = [
		{
			name: panels.TILES,
			height: 358,
			img: "panel-tiles-b.png",
		},
		{
			name: panels.OVERLAY,
			height: 168,
			img: "panel-overlay-a.png",
		},
		{
			name: panels.ANNOTATIONS,
			height: 144,
			img: "panel-annotations-a.png",
		},
		{
			name: tiles.TITLE.name,
			height: 168,
			img: "panel-title-a.png",
		},
		{
			name: tiles.TEXT.name,
			height: 304,
			img: "panel-text-a.png",
		},
		{
			name: tiles.CODE.name,
			height: 152,
			img: "panel-code-a.png",
		},
		{
			name: tiles.TABLE.name,
			height: 180,
			img: "panel-table-a.png",
		},
		{
			name: tiles.IMAGE.name,
			height: 256,
			img: "panel-image-a.png",
		},
		{
			name: tiles.VIDEO.name,
			height: 264,
			img: "panel-video-a.png",
		},
		{
			name: tiles.DIAGRAM.name,
			height: 142,
			img: "panel-diagram-a.png",
		},
		{
			name: tiles.WEB.name,
			height: 119,
			img: "panel-web-a.png",
		},
		{
			name: tiles.TWITTER.name,
			height: 119,
			img: "panel-twitter-a.png",
		},
		{
			name: tiles.GIPHY.name,
			height: 119,
			img: "panel-giphy-a.png",
		},
		{
			name: tiles.FIGMA.name,
			height: 119,
			img: "panel-figma-a.png",
		},
		{
			name: tiles.FRAMER.name,
			height: 119,
			img: "panel-framer-a.png",
		},
		{
			name: tiles.AIRTABLE.name,
			height: 119,
			img: "panel-airtable-a.png",
		},
	];

	const panelHeight = panelInfo.find(o => o.name === panelName)?.height;

	if (panelPosition === "tile-half-2") {
		if (showComments) {
			panelX.set((viewportWidth - 332) / 2 - panelWidth - 48);
		} else {
			panelX.set(viewportWidth / 2 - panelWidth - 48);
		}
		panelY.set((viewportHeight - panelHeight - margin * 2) / 2);
	} else if (panelPosition === "tile-half-1") {
		if (showComments) {
			panelX.set((viewportWidth - 316) / 2 - 16);
		} else {
			panelX.set(viewportWidth / 2 - 16);
		}
		panelY.set((viewportHeight - panelHeight - margin * 2) / 2);
	} else {
		panelX.set(viewportWidth - 64 - panelWidth - margin);
		panelY.set((viewportHeight - panelHeight - margin * 2) / 2);
	}

	return (
		<Wrap
			transition={transitions.defaultTransition}
			animate={{ opacity: showUI ? 1 : 0 }}
			ref={boundsRef}
			style={{
				top: margin,
				right: margin,
				bottom: margin,
				left: margin,
			}}
		>
			<PanelWrap
				drag
				dragConstraints={boundsRef}
				dragTransition={{ power: 0.1, timeConstant: 100 }}
				style={{
					width: panelWidth,
					height: panelHeight,
					x: panelX,
					y: panelY,
					pointerEvents: panelOpen ? "auto" : "none",
					// opacity: panelOpen ? 1 : 0,
				}}
				animate={panelOpen ? "show" : "hide"}
				variants={panelVariants}
				transition={transitions.panelTransition}
			>
				<Background>
					{panelInfo.map(panel => (
						<Image
							key={panel.img}
							src={`/images/${panel.img}`}
							width={panelWidth}
							style={{
								opacity: panel.name === panelName ? 1 : 0,
							}}
						/>
					))}
				</Background>
			</PanelWrap>
		</Wrap>
	);
};
