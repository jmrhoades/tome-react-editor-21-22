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
		promptIsOpen,
		setPromptIsOpen,
		closeMenu,
		menuInfo,
		isGenerating,
		isReviewing,
		setIsReviewing,
	} = useContext(TomeContext);
	const [playCloseMenuSound] = useSound(close_menu_sound);
	return (
		<Wrap
			id="deselect_catch"
			onMouseEnter={() => {
				// setPointerOverInteractiveSurface(false);
			}}
			onMouseLeave={() => {
				// setPointerOverInteractiveSurface(true);
			}}
			onTap={() => {
				if (menuInfo.show) {
					closeMenu();
					return false;
				}
				if (isGenerating) return;
				if (isReviewing) {
					setIsReviewing(false);
				}
				if (sidePanelOpen) {
					setSidePanelOpen(false);
					playCloseMenuSound();
					//return;
				}
				if (selectedTile) {
					setPanelName(null);
					setSelectedTile(null);
				}
				if (promptIsOpen) {
					setPromptIsOpen(false);
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
					items: ["Dynamic Background"],
				});
				setShowContextMenu(true);

				e.preventDefault();
			}}
		></Wrap>
	);
};
