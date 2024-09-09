import React, { useContext, useEffect, useState } from "react";
import { TomeContext } from "../tome/TomeContext";

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
	} = useContext(TomeContext);

	const [pressedKey, setPressedKey] = useState("");

	useEffect(() => {
		const onKeyDown = ({ key }) => {
			if (pressedKey !== key) {
				// console.log("New Key! pressedKey", pressedKey, "key", key);
				setPressedKey(key);

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

						break;
					case "Backspace":
						if (selectedTile) {
							deleteTile(selectedTile);
						}
						if (selectedOutlinePage) {
							deletePage(selectedOutlinePage);
						}

						break;
					default:
						break;
				}
			}
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
	}, [pressedKey, setPressedKey, currentPage, selectedTile, deleteTile]);

	return <></>;
};
