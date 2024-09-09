import React, { useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { transitions } from "../../../ds/Transitions";
import { metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

import { tileNames } from "../page/TileConstants";
import { PanelContainer } from "./PanelContainer";
import { TextTileProperties } from "./TextTileProperties";

export const panels = {
	TILES: "tiles",
	OVERLAY: "overlay",
	ANNOTATIONS: "annotations",
	THEME: "theme",
};

const Wrap = styled(motion.div)`
	position: fixed;
	right: 60px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none; 
`;

export const Panel = props => {
	const { sidePanelOpen, panelName, selectedTile, currentPage } = useContext(TomeContext);

	const panelWidth = metricConstants.cPanelWidth;

	return (
		<Wrap
			style={{
				width: panelWidth,
				transformOrigin: "100% 44%",
				pointerEvents: "none",
			}}
		>
			<AnimatePresence>
				{panelName === tileNames.TEXT.name && sidePanelOpen && (
					<PanelContainer name={tileNames.TEXT.name} theme={currentPage.theme}>
						{selectedTile && selectedTile.params && <TextTileProperties theme={currentPage.theme} />}
					</PanelContainer>
				)}
			</AnimatePresence>
		</Wrap>
	);
};
