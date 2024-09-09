import React, { useContext, useEffect, useState } from "react";
import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { ClipboardContext } from "../tome/ClipboardContext";

import useSound from "use-sound";
import close_menu_sound from "../../../sounds/button_37.mp3";
import delete_sound_01 from "../../../sounds/action_11.mp3";
import cut_sound_01 from "../../../sounds/button_42.mp3";
import copy_sound_01 from "../../../sounds/button_30.mp3";
import paste_sound_01 from "../../../sounds/button_46.mp3";
import undo_sound_01 from "../../../sounds/action_13.mp3";
import { tileNames } from "../page/TileConstants";

export const KeyPress = props => {
	const {
		goToNextPage,
		goToPreviousPage,
		currentPage,
		deleteTile,
		selectedTile,
		setSelectedTile,
		selectedOutlinePage,
		setSelectedOutlinePage,
		deletePage,
		setSidePanelOpen,
		setPanelName,
		sidePanelOpen,
		exitPlayMode,
		enterPlayMode,
		isPlayMode,
		showContextMenu,
		setShowContextMenu,
		copyTile,
		cutTile,
		duplicateTile,
		copiedTile,
		pasteClipboardToPage,
		pasteClipboardToRow,
		pasteClipboardToRowGapIndex,
		replaceWithClipboard,
		undo,
		tileHoveringId,
		getTileForId,
		textTileFocussed,
		backgroundSelected,
		setBackgroundSelected,
		deleteBackground,
		setPromptIsOpen,
		promptIsOpen,
		isGenerating,
		menuInfo,
		closeMenu,
	} = useContext(TomeContext);
	const { scrollTileIntoView, getRowForY, getTileForXY, getRowAndSideForXY } = useContext(MetricsContext);
	const { copySelectionToClipboard, pasteFromClipboard } = useContext(ClipboardContext);

	const [pressedKey, setPressedKey] = useState("");
	const [secondPressKey, setSecondPressedKey] = useState("");

	const [playCloseMenuSound] = useSound(close_menu_sound);
	const [playTileDeleteSound] = useSound(delete_sound_01);
	const [playTileCutSound] = useSound(cut_sound_01);
	const [playTileCopySound] = useSound(copy_sound_01);
	const [playTilePasteSound] = useSound(paste_sound_01);
	const [playUndoSound] = useSound(undo_sound_01);

	useEffect(() => {
		const onKeyDown = e => {
			
			const key = e.key;

			//console.log("New Key!", "key", key, e);

			//e.preventDefault();
			//e.stopPropagation();

			// Added for placeholder contenteditable stuff
			// Look into focussing on type
			if (selectedTile && selectedTile.type === tileNames.TEXT.name && textTileFocussed && key !== "Escape") {
				return;
			}

			if (pressedKey !== key) {
				console.log("New Key! pressedKey", pressedKey, "key", key, e);
				if (key === "Meta") {
					setPressedKey(key);
				}
				switch (key) {
					case "ArrowRight":
						if (!promptIsOpen || isGenerating) {
							goToNextPage();
							e.preventDefault();
						}
						break;
					case "ArrowDown":
						if (!promptIsOpen || isGenerating) {
							goToNextPage();
							e.preventDefault();
						}
						break;
					case "ArrowLeft":
						if (!promptIsOpen || isGenerating) {
							goToPreviousPage();
							e.preventDefault();
						}
						break;
					case "ArrowUp":
						if (!promptIsOpen || isGenerating) {
							goToPreviousPage();
							e.preventDefault();
						}
						break;
					case "Escape":
						if (menuInfo.show) {
							closeMenu();
							return false;
						}
						if (promptIsOpen) {
							setPromptIsOpen(false);
						}
						if (showContextMenu) {
							setShowContextMenu(false);
							playCloseMenuSound();
							return false;
						}
						if (selectedOutlinePage) {
							setSelectedOutlinePage(null);
						}
						if (sidePanelOpen) {
							setSidePanelOpen(false);
						}
						if (selectedTile) {
							setSelectedTile(null);
						}
						if (isPlayMode) {
							exitPlayMode();
						}
						if (backgroundSelected) {
							setBackgroundSelected(false);
						}
						break;
					case "Backspace":
						if (sidePanelOpen) {
							setSidePanelOpen(false);
						}
						if (selectedTile) {
							deleteTile(selectedTile);
							playTileDeleteSound();
						}
						if (selectedOutlinePage) {
							deletePage(selectedOutlinePage);
							playTileDeleteSound();
						}
						if (showContextMenu) {
							setShowContextMenu(false);
						}
						if (backgroundSelected) {
							deleteBackground();
						}
						break;
					case "p":
						if (!promptIsOpen) {
						if (isPlayMode) {
							exitPlayMode();
						} else {
							enterPlayMode();
						}
					}
						break;
					case "P":
						if (!promptIsOpen) {
						if (isPlayMode) {
							exitPlayMode();
						} else {
							enterPlayMode();
						}
					}
						break;
					case "k":
						if (pressedKey === "Meta") {
								
							setPromptIsOpen(!promptIsOpen);
							if (showContextMenu) {
								setShowContextMenu(false);
							}
							e.preventDefault();
						}
						break;
					case "x":
						/*
						if (pressedKey === "Meta" && selectedTile) {
							console.log("cut!");
							cutTile(selectedTile);
							playTileCutSound();
							if (showContextMenu) {
								setShowContextMenu(false);
							}
							e.preventDefault();
						}
						*/
						break;
					case "c":
						/*
						if (pressedKey === "Meta" && selectedTile) {
							console.log("copy!");
							copyTile(selectedTile);
							//copySelectionToClipboard();
							playTileCopySound();
							if (showContextMenu) {
								setShowContextMenu(false);
							}
						}
						e.preventDefault();
						*/
						break;
					case "v":
						/*
						if (pressedKey === "Meta") {
							//pasteFromClipboard();
							if (!copiedTile.current) return false;
							e.preventDefault();

							if (tileHoveringId.get()) {
								const hoveredTile = getTileForId(tileHoveringId.get());
								if (hoveredTile && hoveredTile.isNull && copiedTile.current.type === hoveredTile.type) {
									console.log(tileHoveringId.get(), hoveredTile);
									replaceWithClipboard(hoveredTile);
									if (showContextMenu) setShowContextMenu(false);
									return false;
								}
							}

							if (selectedTile && selectedTile.isNull && copiedTile.current.type === selectedTile.type) {
								replaceWithClipboard();
								if (showContextMenu) setShowContextMenu(false);
								return false;
							}

							const info = getRowAndSideForXY();
							let t = false;
							console.log("paste!", info);
							if (info.row) {
								t = pasteClipboardToRow(info.row, info.direction);
							} else if (info.rowGapIndex !== 0) {
								t = pasteClipboardToRowGapIndex(info.rowGapIndex);
							} else {
								t = pasteClipboardToPage(info.direction);
							}
							if (t) {
								playTilePasteSound();
								scrollTileIntoView(t);
								if (showContextMenu) {
									setShowContextMenu(false);
								}
							}
						}
						*/
						break;
					case "d":
						// if (pressedKey === "Meta" && selectedTile) {
						// 	console.log("duplicate!");
						// 	const t = duplicateTile(selectedTile);
						// 	playTilePasteSound();
						// 	if (t) {
						// 		scrollTileIntoView(t);
						// 		if (showContextMenu) {
						// 			setShowContextMenu(false);
						// 		}
						// 	}
						// }
						// e.preventDefault();
						break;
					// case "r":
					// 	if (pressedKey === "Meta" && selectedTile) {
					// 		console.log("replace!");
					// 		replaceWithClipboard();
					// 		if (showContextMenu) {
					// 			setShowContextMenu(false);
					// 		}
					// 	}
					// 	e.preventDefault();
					// 	break;
					case "z":
						// if (pressedKey === "Meta") {
						// 	console.log("undo!");
						// 	undo();
						// 	playUndoSound();
						// }
						// e.preventDefault();
						break;
					default:
						break;
				}
			}

			//e.preventDefault();
			return false;
		};

		const onKeyUp = ({ key }) => {
			setPressedKey("");
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pressedKey, setPressedKey, currentPage, selectedTile, deleteTile, isPlayMode]);

	return <></>;
};
