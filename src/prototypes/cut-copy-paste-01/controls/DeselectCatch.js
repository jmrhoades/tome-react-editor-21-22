import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const DeselectCatch = props => {
	const {
		selectedTile,
		setSelectedTile,
		setSidePanelOpen,
		setSelectedOutlinePage,
		sidePanelOpen,
		//setShowContextMenu,
		//setContextMenuInfo,
	} = useContext(TomeContext);

	return (
		<Wrap
			onMouseEnter={() => {
				// setPointerOverInteractiveSurface(false);
			}}
			onMouseLeave={() => {
				// setPointerOverInteractiveSurface(true);
			}}
			onTap={() => {
				if (selectedTile) {
					setSelectedTile(null);
				}
				if (sidePanelOpen) {
					setSidePanelOpen(false);
				}
				setSelectedOutlinePage(false);
			}}
			onContextMenu={e => {
				/*
				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
				});

				setShowContextMenu(true);
				*/

				e.preventDefault();
			}}
		></Wrap>
	);
};
