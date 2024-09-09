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
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #212121;
	border-radius: 16px;
	filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25));
`;

const Image = styled(motion.img)`
	position: relative;
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

	let panelHeight = 0;
	if (panelName === panels.TILES) panelHeight = 348;
	if (panelName === panels.OVERLAY) panelHeight = 168;
	if (panelName === panels.ANNOTATIONS) panelHeight = 144;
	if (panelName === tiles.NULL) panelHeight = 348;
	if (panelName === tiles.TITLE) panelHeight = 168;
	if (panelName === tiles.TEXT) panelHeight = 304;
	if (panelName === tiles.CODE) panelHeight = 152;
	if (panelName === tiles.TABLE) panelHeight = 180;
	if (panelName === tiles.IMAGE) panelHeight = 256;
	if (panelName === tiles.VIDEO) panelHeight = 264;
	if (panelName === tiles.WEB) panelHeight = 119;
	if (panelName === tiles.TWITTER) panelHeight = 119;
	if (panelName === tiles.GIPHY) panelHeight = 119;
	if (panelName === tiles.FIGMA) panelHeight = 119;
	if (panelName === tiles.FRAMER) panelHeight = 119;
	if (panelName === tiles.AIRTABLE) panelHeight = 119;
	if (panelName === tiles.METRICS) panelHeight = 0;

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

	let imgName = panelName;
	if (panelName === tiles.NULL) imgName = "tiles";

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
					<Image src={`/images/panel-${imgName}-a.png`} width={panelWidth} />
				</Background>
			</PanelWrap>
		</Wrap>
	);
};
