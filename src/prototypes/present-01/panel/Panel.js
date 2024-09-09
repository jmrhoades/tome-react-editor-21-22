import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { metrics, defaultLayoutTransition } from "../index";
import { PanelAddTile } from "./PanelAddTile";
import { PanelRecordOverlay } from "./PanelRecordOverlay";
import { PanelAnnotate } from "./PanelAnnotate";
import { PanelComments } from "./PanelComments";
import { PanelText } from "./PanelText";
import { PanelImage } from "./PanelImage";

const Wrap = styled(motion.div)`
	position: absolute;
	right: ${props => props.panelRight}px;
	width: 240px;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const Panel = props => {
	return (
		<Wrap
			panelRight={metrics.cPanelRight}
			initial={{ opacity: 0, scale: 0.9, x: 50 }}
			animate={{ opacity: 1, scale: 1.0, x: 0 }}
			exit={{ opacity: 0, scale: 0.9, x: 50 }}
			transition={defaultLayoutTransition}
		>
			<AnimatePresence>
				{props.panelName === "addTile" && <PanelAddTile />}
				{props.panelName === "recordOverlay" && <PanelRecordOverlay />}
				{props.panelName === "annotate" && <PanelAnnotate />}
				{props.panelName === "comments" && <PanelComments />}
				{props.panelName === "text" && <PanelText />}
				{props.panelName === "image" && <PanelImage />}
			</AnimatePresence>
		</Wrap>
	);
};
