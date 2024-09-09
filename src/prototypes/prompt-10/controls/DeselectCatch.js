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
		textTileFocussed,
		setTextTileFocussed,
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
			onPointerDown={() => {
				if (menuInfo.show) {
					closeMenu();
					return false;
				}
				if (isGenerating) return false;

			
				if (isReviewing) {
					setIsReviewing(false);
					return false;
				}

				if (sidePanelOpen) {
					setSidePanelOpen(false);
					playCloseMenuSound();
					//return false;
				}

				if (promptIsOpen) {
					setPromptIsOpen(false);
					return false;
				}

				if (textTileFocussed) {
					setTextTileFocussed(false)
				}

				if (selectedTile) {
					setPanelName(null);
					setSelectedTile(null);
					return false;
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
