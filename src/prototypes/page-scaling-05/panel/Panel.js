import React, { useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { PanelAddTile } from "./PanelAddTile";
import { PanelRecordOverlay } from "./PanelRecordOverlay";
import { PanelAnnotate } from "./PanelAnnotate";
import { PanelText } from "./PanelText";
import { PanelImage } from "./PanelImage";
import { TomeContext, metricConstants } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	right: ${props => props.panelRight}px;
	width: 240px;
	top: 80px;
	bottom: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	/* background-color: rgba(115, 150, 256, 0.5); */
`;

export const Panel = props => {
	const tome = useContext(TomeContext);

	return (
		<AnimatePresence>
			{tome.panelOpen && (
				<Wrap
					panelRight={metricConstants.cPanelRight}
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 50 }}
					transition={tome.layoutTransition}
				>
					{tome.panelName === "Add" && <PanelAddTile editorState={tome.editorState} />}
					{tome.panelName === "Record" && <PanelRecordOverlay editorState={tome.editorState} />}
					{tome.panelName === "Annotate" && <PanelAnnotate editorState={tome.editorState} />}
					{tome.panelName === "Text" && <PanelText editorState={tome.editorState} />}
					{tome.panelName === "Photo" && <PanelImage editorState={tome.editorState} />}
				</Wrap>
			)}
		</AnimatePresence>
	);
};
