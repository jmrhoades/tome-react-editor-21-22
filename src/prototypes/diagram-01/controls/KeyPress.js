import React, { useContext, useEffect, useState } from "react";

import { TomeContext } from "../tome/TomeContext";
import { tiles } from "../tile/Tile";
import { DiagramContext, diagramTools } from "../diagram/DiagramContext";

export const KeyPress = props => {
	const {
		goToNextPage,
		goToPreviousPage,
		currentPage,
		showComments,
		setShowComments,
		setSelectedTile,
		setPanelOpen,
		setSelectedThumbnail,
		selectedTile,
		imageExpanded,
		setImageExpanded,
	} = useContext(TomeContext);
	const { setActiveDiagramTool, shapeSelected, setShapeSelected, diagramExpanded, setDiagramExpanded } =
		useContext(DiagramContext);
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
					case "ArrowLeft":
						goToPreviousPage();
						break;
					case "Escape":
						if (showComments) setShowComments(false);
						setPanelOpen(false);
						setSelectedThumbnail(null);
						if (imageExpanded) setImageExpanded(false);		
						if (diagramExpanded) {
							setDiagramExpanded(false);
							if (shapeSelected) {
								setShapeSelected(null);
							}
							break;
						}

						if (shapeSelected) {
							setShapeSelected(null);
						} else {
							setSelectedTile(null);
						}

						break;
					case " ":
						if (selectedTile && selectedTile.type === tiles.DIAGRAM) {
							setActiveDiagramTool(diagramTools.PAN);
						}
						break;
					default:
						break;
				}
			}
		};

		const onKeyUp = ({ key }) => {
			setPressedKey("");

			switch (key) {
				case " ":
					setActiveDiagramTool(null);
					break;
				default:
					break;
			}
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pressedKey, currentPage, showComments, selectedTile, shapeSelected, diagramExpanded, imageExpanded]);

	return <></>;
};
