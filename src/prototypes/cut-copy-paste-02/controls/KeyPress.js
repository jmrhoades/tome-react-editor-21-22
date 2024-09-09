import React, { useContext, useEffect, useState } from "react";
import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";

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
		pasteClipboard,
		replaceWithClipboard,
	} = useContext(TomeContext);
	const { scrollTileIntoView } = useContext(MetricsContext);

	const [pressedKey, setPressedKey] = useState("");

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
						if (showContextMenu) {
							setShowContextMenu(false);
						}
						break;
					case "Backspace":
						if (selectedTile) {
							deleteTile(selectedTile);
						}
						if (selectedOutlinePage) {
							deletePage(selectedOutlinePage);
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
							if (showContextMenu) {
								setShowContextMenu(false);
							}
						}
						break;
					case "c":
						if (pressedKey === "Meta" && selectedTile) {
							console.log("copy!");
							copyTile(selectedTile);
							if (showContextMenu) {
								setShowContextMenu(false);
							}
						}
						break;
					case "v":
						if (pressedKey === "Meta") {
							console.log("paste!");
							
							let t = {};
							if (selectedTile) {
								t = replaceWithClipboard();
							} else {
								t = pasteClipboard();
							}

							if (t) {
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
							if (t) {
								scrollTileIntoView(t);
								if (showContextMenu) {
									setShowContextMenu(false);
								}
							}
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
