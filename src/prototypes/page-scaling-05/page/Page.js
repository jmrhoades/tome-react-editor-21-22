import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { metrics, defaultLayoutTransition } from "../index";
import { Tile } from "../tile/Tile";
import { TextTile } from "../tile/TextTile";
import { ImageTile } from "../tile/ImageTile";
const PageWrap = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: space-between;
`;

const PageBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: #121212;
`;

export const Page = props => {
	const cPageWidth = metrics.cPageWidth;
	const cPageHeight = metrics.cPageHeight;

	// Ratios
	const w = props.windowSize.width;
	const h = props.windowSize.height;
	const lRatio = cPageWidth / cPageHeight;
	const pRatio = cPageHeight / cPageWidth;
	const minMarginRightWithPanelOpen = metrics.cPanelRight + metrics.cPanelWidth + 32;

	// Margins
	let marginX = Math.round(254 * (w / metrics.cViewportWidth));
	let marginY = 100;
	const minMarginLeftWithOutlineOpen = 144;
	if (props.editorState === "presenting") {
		marginX = 0;
		marginY = 0;
	}
	

	// Metrics
	const isPortrait = w < h;
	const pageHeightRatio = isPortrait ? lRatio : pRatio;
	let pWidth = Math.round(w - marginX * 2);
	let pHeight = Math.round(pWidth * pRatio);
	let pMarginLeft = 0;

	if (pHeight > h - marginY * 2) {
		pHeight = h - marginY * 2;
		pWidth = Math.round(lRatio * pHeight);
	}
	if (isPortrait) {
		pHeight = Math.round(h - marginY * 2);
		pWidth = Math.round(pHeight * pRatio);
	}

	if (props.panelOpen && props.editorState !== "presenting") {
		if (minMarginRightWithPanelOpen > marginX) {
			// pMarginLeft = (marginX - minMarginRightWithPanelOpen);
			pMarginLeft = -172;
		}
		if (w < metrics.cViewportWidth) {
			const maxPWidth = w - minMarginRightWithPanelOpen - minMarginLeftWithOutlineOpen;
			if (maxPWidth < pWidth) {
				pWidth = maxPWidth;
				pHeight = Math.round(pWidth * pageHeightRatio);
			}
		}
	}

	const scale = isPortrait ? pHeight / cPageWidth : pWidth / cPageWidth;
	const pRadius = Math.round(metrics.cPageRadius * scale);
	const pPadding = Math.round(metrics.cTileMargin * scale);
	const tRadius = Math.round(metrics.cTileRadius * scale);
	const tHeight = Math.round(((isPortrait ? pHeight : pWidth) - pPadding * 3) / 2);

	props.pageHeight.set(pHeight);

	return (
		<PageWrap
			style={{
				width: pWidth,
				height: pHeight,
				padding: pPadding,
				marginLeft: pMarginLeft,
				flexDirection: isPortrait ? "column" : "row",
			}}
			layout
			transition={defaultLayoutTransition}
			// onMouseEnter={() => props.setPageIsHovered(true)}
			// onMouseLeave={() => props.setPageIsHovered(false)}
		>
			<PageBackground
				
				style={{
					borderRadius: pRadius,
				}}
				animate={{
					opacity: props.editorState === "presenting" ? 0 : 1,
				}}
				transition={{
					duration: 0.25,
					ease: [0.4, 0, 0.1, 1],
				}}
			/>
			<Tile
				width={tHeight}
				height={tHeight}
				borderRadius={tRadius}
				padding={pPadding}
				id="tileA"
				selected={props.selectedTile}
				setSelected={props.setSelectedTile}
				editorState={props.editorState}
			>
				<TextTile
					windowWidth={w}
					scale={scale}
					tileSize={tHeight}
					tileRadius={tRadius}
					tilePadding={pPadding}
					pageWidth={pWidth}
					pagePadding={pPadding}
					pageRadius={pRadius}
					editorState={props.editorState}
					
				/>
			</Tile>
			<Tile
				width={tHeight}
				height={tHeight}
				borderRadius={tRadius}
				padding={pPadding}
				id="tileB"
				selected={props.selectedTile}
				setSelected={props.setSelectedTile}
				editorState={props.editorState}
			>
				<ImageTile
					scale={scale}
					image="./images/ds-image-tile-bw-sand-square.jpg"
					editorState={props.editorState}
					borderRadius={tRadius}
					setImageTileClickEmphasized={props.setImageTileClickEmphasized}
					imageTileClickEmphasized={props.imageTileClickEmphasized}
					textTileClickEmphasized={props.textTileClickEmphasized}
					textTileBlockClickEmphasized={props.textTileBlockClickEmphasized}
					setTextTileBlockClickEmphasized={props.setTextTileBlockClickEmphasized}
					selectedAnotation={props.selectedAnotation}
					setSelectedAnnotation={props.setSelectedAnnotation}
					annotationData={props.annotationData}
				/>
			</Tile>
			
		</PageWrap>
	);
};
