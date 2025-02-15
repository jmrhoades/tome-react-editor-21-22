import React, { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { Helmet } from "react-helmet";

import { TomeContext, appendRowAtOrder } from "../tome/TomeContext";
import { tileNames } from "../page/TileConstants";
import { transitions } from "../ds/Transitions";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";

const Wrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
`;

const PanelDragConstraints = styled.div`
	position: fixed;
	top: 12px;
	left: 12px;
	right: 12px;
	bottom: 12px;
	pointer-events: none;
`;

const GlobalStyle = createGlobalStyle`
	html, body, #root {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: ${props => props.bgcolor};	
	}
`;

export const Viewport = props => {
	const {
		currentPage,
		tomeData,
		addFilesToRowAtOrderWithMaxPerRow,
		createBackgroundWithDroppedFiles,
		tileReplaceId,
		dropIndicatorInfo,
		layoutTweaking,
		setLayoutTweaking,
	} = useContext(TomeContext);
	const { getDropInfoForXY } = useContext(MetricsContext);

	const dragOver = e => {

		if(!layoutTweaking) setLayoutTweaking(true);

		//console.log("dragOver", e.clientX, e.clientY);
		const dropInfo = getDropInfoForXY(e.clientX, e.clientY, { replace: true, canBeBackground: true });
		//dropIndicatorOpacity.set(dropInfo.dropZone === "NONE" ? 0 : 1);
		//console.log(dropInfo.dropZone);
		if (
			dropInfo.dropZone !== "NONE" &&
			dropInfo.dropZone !== "CENTER_OF_TILE" &&
			dropInfo.dropZone !== "PAGE_BACKGROUND"
		) {
			// console.log(dropInfo.hoverYPosition, dropInfo.hoverYRelative);
			dropIndicatorInfo.y.set(dropInfo.dropY);
			if (
				dropInfo.dropZone === "ABOVE_PAGE" ||
				dropInfo.dropZone === "BELOW_PAGE" ||
				dropInfo.dropZone === "ABOVE_TILE" ||
				dropInfo.dropZone === "BELOW_TILE"
			) {
				dropIndicatorInfo.x.set(dropInfo.indicatorX_NewRow);
				dropIndicatorInfo.width.set(dropInfo.indicatorWidth_NewRow);
				dropIndicatorInfo.height.set(dropInfo.indicatorHeight_NewRow);
				dropIndicatorInfo.opacity.set(1);
			}
			if (dropInfo.dropZone === "LEFT_OF_TILE" || dropInfo.dropZone === "RIGHT_OF_TILE") {
				dropIndicatorInfo.x.set(dropInfo.indicatorX_AddToRow);
				dropIndicatorInfo.width.set(dropInfo.indicatorWidth_AddToRow);
				dropIndicatorInfo.height.set(dropInfo.indicatorHeight_AddToRow);
				dropIndicatorInfo.opacity.set(1);
			}
			//console.log("dragOver", e.clientY, dropIndicatorY.get());
		} else {
			dropIndicatorInfo.opacity.set(0);
			//console.log("HIDE");
		}

		if (dropInfo.dropZone === "CENTER_OF_TILE") {
			tileReplaceId.set(dropInfo.tileOverId);
		} else if (dropInfo.dropZone === "PAGE_BACKGROUND") {
			tileReplaceId.set(null);
			dropIndicatorInfo.backgroundDropOpacity.set(1);
		} else {
			tileReplaceId.set(null);
			dropIndicatorInfo.backgroundDropOpacity.set(0);
		}

		e.preventDefault();
		e.stopPropagation();
	};

	const dragOut = e => {
		dropIndicatorInfo.opacity.set(0);
		dropIndicatorInfo.backgroundDropOpacity.set(0);
		setLayoutTweaking(false);
	};

	const dragDrop = e => {
		//console.log("drop!", currentPage);
		setLayoutTweaking(false);
		e.preventDefault();
		e.stopPropagation();
		dropIndicatorInfo.opacity.set(0);
		dropIndicatorInfo.backgroundDropOpacity.set(0);
		if (e.dataTransfer && e.dataTransfer.files) {
			const dropInfo = getDropInfoForXY(e.clientX, e.clientY, { replace: true, canBeBackground: true });
			// files dropped, proceed with row & tile creation
			const files = [...e.dataTransfer.files];
			files.forEach((file, i) => {
				console.log(file.type);
			});
			// contains image or video?
			const hasMedia = files.find(
				({ type }) => type.match("image.*") || type.match("video.*") || type.match("text.*")
			);

			if (hasMedia && dropInfo.dropZone !== "NONE") {
				//
				//const imageFiles = files.filter(({ type }) => type.match("image.*"));
				const mediaFiles = files.filter(
					({ type }) => type.match("image.*") || type.match("video.*") || type.match("text.*")
				);

				// remove tile, add new tile at that the replaced tile's row & order
				if (dropInfo.dropZone === "CENTER_OF_TILE") {
					tomeData.tiles.splice(tomeData.tiles.indexOf(dropInfo.tileOver), 1);
					addFilesToRowAtOrderWithMaxPerRow(mediaFiles, dropInfo.rowOver, dropInfo.tileOrder, 8);
				}
				// add files to the left or right of the hovered tile
				else if (dropInfo.dropZone === "RIGHT_OF_TILE" || dropInfo.dropZone === "LEFT_OF_TILE") {
					addFilesToRowAtOrderWithMaxPerRow(mediaFiles, dropInfo.rowOver, dropInfo.tileOrder);
					// add files to a new row above or below the hovered tile
				}
				if (
					dropInfo.dropZone === "ABOVE_PAGE" ||
					dropInfo.dropZone === "BELOW_PAGE" ||
					dropInfo.dropZone === "ABOVE_TILE" ||
					dropInfo.dropZone === "BELOW_TILE"
				) {
					// Create a new row and add new tiles to it
					const row = appendRowAtOrder(currentPage, tomeData, dropInfo.rowOrder);
					// addFilesToRowAtOrder(mediaFiles, row, 1);
					addFilesToRowAtOrderWithMaxPerRow(mediaFiles, row, 1, 8);
				} else if (dropInfo.dropZone === "PAGE_BACKGROUND") {
					createBackgroundWithDroppedFiles(mediaFiles);
				}
			}
		}
	};

	return (
		<Wrap
			//ref={drop}
			key="viewport"
			id="viewport"
			onDrop={dragDrop}
			onDragOver={dragOver}
			onDragLeave={dragOut}
		>
			<Helmet>
				<title>{tomeData.title}</title>
				<meta name="theme-color" content={currentPage.theme.colors.backgrounds.canvas} />
			</Helmet>
			<GlobalStyle bgcolor={currentPage.theme.colors.backgrounds.canvas} />
			<PanelDragConstraints id="panel_drag_constraints" />

			{props.children}
		</Wrap>
	);
};
