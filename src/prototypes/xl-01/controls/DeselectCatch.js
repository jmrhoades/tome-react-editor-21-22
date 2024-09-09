import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";

import close_menu_sound from "../../../sounds/button_37.mp3";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none; 
`;

export const DeselectCatch = props => {
	const {
		selectedTile,
		setSelectedTile,
		setSidePanelOpen,
		setPanelName,
		setSelectedOutlinePage,
		sidePanelOpen,
		setShowContextMenu,
		setContextMenuInfo,
		
	} = useContext(TomeContext);
	const [playCloseMenuSound] = useSound(close_menu_sound);
	return (
		<Wrap
			onMouseEnter={() => {
				// setPointerOverInteractiveSurface(false);
			}}
			onMouseLeave={() => {
				// setPointerOverInteractiveSurface(true);
			}}
			onTap={() => {
				if (sidePanelOpen) {
					setSidePanelOpen(false);
					playCloseMenuSound();
					//return;
				}
				if (selectedTile) {
					setPanelName(null);
					setSelectedTile(null);
				}

				setSelectedOutlinePage(false);
			}}
			onContextMenu={e => {
				if (selectedTile) {
					setSelectedTile(null);
				}

				setContextMenuInfo({
					x: e.clientX,
					y: e.clientY,
					items: ["Paste"],
				});
				setShowContextMenu(true);

				e.preventDefault();
			}}
		></Wrap>
	);
};
