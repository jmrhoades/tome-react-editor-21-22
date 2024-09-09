import React, { useContext, useEffect, useState } from "react";
import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import useSound from "use-sound";

import close_menu_sound from "../../../sounds/button_37.mp3";

import delete_sound_01 from "../../../sounds/action_11.mp3";
import cut_sound_01 from "../../../sounds/button_42.mp3";
import copy_sound_01 from "../../../sounds/button_30.mp3";
import paste_sound_01 from "../../../sounds/button_46.mp3";
import undo_sound_01 from "../../../sounds/action_13.mp3";

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
		sidePanelOpen,
		exitPlayMode,
		enterPlayMode,
		isPlayMode,
		showContextMenu,
		setShowContextMenu,
		copyTile,
		cutTile,
		duplicateTile,
		pasteClipboardAfterTile,
		pasteClipboardAfterRow,
		pasteClipboardBeforeTile,
		copiedTile,
		pasteClipboardToPage,
		pasteClipboardToRow,
		pasteClipboardToRowGapIndex,
		undo,
	} = useContext(TomeContext);
	const {
		scrollTileIntoView,
		getRowForPointerY,
		getTileForCurrentPointerPosition,
		getRowAndSideForCurrentPointerPosition,
	} = useContext(MetricsContext);

	const [pressedKey, setPressedKey] = useState("");

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
			e.preventDefault();
			e.stopPropagation();
			if (pressedKey !== key) {
				//console.log("New Key! pressedKey", pressedKey, "key", key, e);
				if (key === "Meta") {
					setPressedKey(key);
				}

				switch (key) {
					case "ArrowRight":
						goToNextPage();
						break;
					case "ArrowDown":
						goToNextPage();
						break;
					case "ArrowLeft":
						goToPreviousPage();
						break;
					case "ArrowUp":
						goToPreviousPage();
						break;
					case "Escape":
						if (showContextMenu) {
							setShowContextMenu(false);
							playCloseMenuSound();
							return false;
						}
						if (selectedOutlinePage) {
							setSelectedOutlinePage(null);
						}
						if (selectedTile) {
							setSelectedTile(null);
						}
						if (sidePanelOpen) {
							setSidePanelOpen(false);
						}
						if (isPlayMode) {
							exitPlayMode();
						}

						break;
					case "Backspace":
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
						break;
					case "p":
						if (isPlayMode) {
							exitPlayMode();
						} else {
							enterPlayMode();
						}
						break;
					case "P":
						if (isPlayMode) {
							exitPlayMode();
						} else {
							enterPlayMode();
						}
						break;
					case "x":
						if (pressedKey === "Meta" && selectedTile) {
							console.log("cut!");
							cutTile(selectedTile);
							playTileCutSound();
							if (showContextMenu) {
								setShowContextMenu(false);
							}
						}
						break;
					case "c":
						if (pressedKey === "Meta" && selectedTile) {
							console.log("copy!");
							copyTile(selectedTile);
							playTileCopySound();
							if (showContextMenu) {
								setShowContextMenu(false);
							}
						}
						break;
					case "v":
						if (pressedKey === "Meta") {
							if (!copiedTile.current) return false;
							console.log("paste!");

							const info = getRowAndSideForCurrentPointerPosition();
							let t = false;
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
						break;
					case "d":
						if (pressedKey === "Meta" && selectedTile) {
							console.log("duplicate!");
							const t = duplicateTile(selectedTile);
							playTilePasteSound();
							if (t) {
								scrollTileIntoView(t);
								if (showContextMenu) {
									setShowContextMenu(false);
								}
							}
						}
						break;
						case "z":
						if (pressedKey === "Meta") {
							console.log("undo!");
							undo();
							playUndoSound();
						}
						break;
					default:
						break;
				}
			}

			e.preventDefault();
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
