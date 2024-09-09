import React, { useContext, useEffect, useState, useRef } from "react";
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
		exitPlayMode,
		enterPlayMode,
		isPlayMode,
		addTileToRow,
		tomeData,
	} = useContext(TomeContext);
	const { scrollTileIntoView } = useContext(MetricsContext);

	const [pressedKey, setPressedKey] = useState("");

	const copiedTile = useRef(null);
	const copiedTileRowHeight = useRef(null);
	

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
							setSidePanelOpen(false);
						}
						if (isPlayMode) {
							exitPlayMode();
						}
						break;
					case "Backspace":
						if (selectedTile) {
							deleteTile(selectedTile);
						}
						if (selectedOutlinePage) {
							deletePage(selectedOutlinePage);
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
							copiedTile.current = JSON.parse(JSON.stringify(selectedTile));
							let row = tomeData.rows.filter(r => {
								return r.id === selectedTile.rowId;
							})[0];
							copiedTileRowHeight.current = row.height;
							deleteTile(selectedTile);
						}
						break;
					case "c":
						if (pressedKey === "Meta" && selectedTile) {
							console.log("copy!");
							copiedTile.current = JSON.parse(JSON.stringify(selectedTile));
							let row = tomeData.rows.filter(r => {
								return r.id === selectedTile.rowId;
							})[0];
							copiedTileRowHeight.current = row.height;
						}
						break;
					case "v":
						if (pressedKey === "Meta") {
							console.log("paste!");
							if (copiedTile.current) {
								let row = false;
								if (selectedTile) {
									row = tomeData.rows.filter(r => {
										return r.id === selectedTile.rowId;
									})[0];
								}
								const tile = addTileToRow(
									copiedTile.current.type,
									row,
									copiedTile.current.params,
									copiedTile.current.height6,
									copiedTile.current.height12,
									selectedTile ? true : false,
									row ? row.height : copiedTileRowHeight.current,
								);
								scrollTileIntoView(tile);
							}
						}
						break;
					case "d":
						if (pressedKey === "Meta" && selectedTile) {
							console.log("duplicate!");
							let row = tomeData.rows.filter(r => {
								return r.id === selectedTile.rowId;
							})[0];
							const tile = addTileToRow(
								selectedTile.type,
								row,
								selectedTile.params,
								selectedTile.height6,
								selectedTile.height12
							);
							scrollTileIntoView(tile);
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
