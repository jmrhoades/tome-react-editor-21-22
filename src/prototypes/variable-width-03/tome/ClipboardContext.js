import React, { createContext, useEffect, useContext } from "react";
import { TomeContext } from "./TomeContext";
import { MetricsContext } from "./MetricsContext";
import { update } from "lodash";
import { tileNames } from "../page/TileConstants";

export const ClipboardContext = createContext();

export const ClipboardProvider = ({ children }) => {
	const {
		addImageTileFromClipboard,
		updateImageTileWithImage,
		selectedTile,
		cutTile,
		addTileFromClipboard,
		copyTile,
		tileHoveringId,
		getTileForId,
		replaceTileWithClipboardTile,
		pasteFromClipboardToNearestPosition,
		getNewImageTile,
	} = useContext(TomeContext);
	const {
		scrollTileIntoView,
		getRowForPointerY,
		getTileForCurrentPointerPosition,
		getRowAndSideForCurrentPointerPosition,
		pointerInWindow,
		getRowAndSideForXY,
	} = useContext(MetricsContext);

	const copySelection = () => {};

	const pasteFromClipboard = pasteEvent => {};

	useEffect(() => {
		const onPaste = pasteEvent => {
			console.log("system paste event!");

			// Get only the first item for now
			const pasteItem = pasteEvent.clipboardData.items[0];

			// Is it an image?
			if (pasteItem.type.indexOf("image") === 0) {
				console.log(pasteItem);
				const blob = pasteItem.getAsFile();
				const reader = new FileReader();

				let newTile = false;
				if (pointerInWindow.get()) {
					// Hovering over a null tile that matches the clipboard's tile type?
					if (tileHoveringId.get()) {
						const hoveredTile = getTileForId(tileHoveringId.get());
						if (hoveredTile && hoveredTile.isNull && tileNames.IMAGE.name === hoveredTile.type) {
							newTile = hoveredTile;
						}
					}
					// Is the selected tile null
					if (selectedTile && selectedTile.isNull && tileNames.IMAGE.name === selectedTile.type) {
						newTile = selectedTile;
					}
					if (!newTile) {
						const info = getRowAndSideForXY();
						const clipboardTile = getNewImageTile();
						newTile = pasteFromClipboardToNearestPosition(clipboardTile, info);
					}
				} else {
					// mouse isn't in the window,
					// append new tile to the page
					newTile = addImageTileFromClipboard();
				}
				if (newTile) scrollTileIntoView(newTile);
				reader.onload = function (event) {
					const image = event.target.result;
					updateImageTileWithImage(newTile, image);
				};
				reader.readAsDataURL(blob);
			}

			// Is it text?
			if (pasteItem.type.indexOf("text") === 0) {
				//console.log(pasteItem, pointerInWindow.get());
				pasteItem.getAsString(s => {
					const tileFromClipboard = JSON.parse(s);
					if (tileFromClipboard) {
						let newTile = false;
						if (pointerInWindow.get()) {
							// Hovering over a null tile that matches the clipboard's tile type?
							if (tileHoveringId.get()) {
								const hoveredTile = getTileForId(tileHoveringId.get());
								if (hoveredTile && hoveredTile.isNull && tileFromClipboard.type === hoveredTile.type) {
									replaceTileWithClipboardTile(hoveredTile, tileFromClipboard);
									return false;
								}
							}
							// Is the selected tile null
							if (selectedTile && selectedTile.isNull && tileFromClipboard.type === selectedTile.type) {
								replaceTileWithClipboardTile(selectedTile, tileFromClipboard);
								return false;
							}
							const info = getRowAndSideForXY();
							newTile = pasteFromClipboardToNearestPosition(tileFromClipboard, info);
						} else {
							// mouse isn't in the window,
							// append new tile to the page
							newTile = addTileFromClipboard(tileFromClipboard);
						}

						if (newTile) scrollTileIntoView(newTile);
					}
				});
			}
		};
		const onCopy = pasteEvent => {
			//console.log("system copy event!");
			if (selectedTile) {
				copyTile(selectedTile);
			}
		};
		const onCut = pasteEvent => {
			if (selectedTile) {
				cutTile(selectedTile);
			}
		};
		document.addEventListener("paste", onPaste);
		document.addEventListener("copy", onCopy);
		document.addEventListener("cut", onCut);
		return () => {
			document.removeEventListener("paste", onPaste);
			document.removeEventListener("copy", onCopy);
			document.removeEventListener("cut", onCut);
		};
	});

	return (
		<ClipboardContext.Provider
			value={{
				copySelection,
				pasteFromClipboard,
			}}
		>
			{children}
		</ClipboardContext.Provider>
	);
};
