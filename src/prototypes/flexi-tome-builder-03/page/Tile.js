import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

import { TileText } from "./TileText";
import { TileImage } from "./TileImage";
import { TileVideo } from "./TileVideo";
import { TileTable } from "./TileTable";
import { TileCode } from "./TileCode";
import { TileWeb } from "./TileWeb";
import { TileTwitter } from "./TileTwitter";
import { TileGiphy } from "./TileGiphy";
import { TileAirtable } from "./TileAirtable";
import { TileFigma } from "./TileFigma";

export const tiles = {
	TEXT: { name: "Text", icon: "Text" },
	IMAGE: { name: "Image", icon: "Image" },
	VIDEO: { name: "Video", icon: "Video" },
	TABLE: { name: "Table", icon: "Table" },
	CODE: { name: "Code", icon: "Code" },
	WEB: { name: "Web", icon: "Web" },
	TWITTER: { name: "Twitter", icon: "Twitter" },
	GIPHY: { name: "Giphy", icon: "Giphy" },
	AIRTABLE: { name: "Airtable", icon: "Airtable" },
	FIGMA: { name: "Figma", icon: "Figma" },
};

// "Text", "Image", "Video", "Table", "Code", "Web", "Twitter", "Giphy", "Airtable", "Figma"

const TileWrap = styled(motion.div)`
	position: absolute;
	top: 0;
	height: 100%;
`;

const GhostTile = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
		0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
		0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
`;

const TileContent = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

const SelectedOutline = styled(TileContent)`
	position: absolute;
	top: -1.5px;
	left: -1.5px;
	width: calc(100% + 3px);
	height: calc(100% + 3px);
	pointer-events: none;
	border-style: solid;
	border-color: #ed00eb;
	box-sizing: border-box;
	box-shadow: inset 0px 0px 0px 4px #141414;
`;

const HoverOutline = styled(SelectedOutline)`
	border-color: rgba(255, 255, 255, 0.08);
	box-shadow: none;
`;

/*
const ResizeHandle = styled(motion.div)`
	position: absolute;
	background-color: #ed00eb;
	box-shadow: 0 0px 8px 0.5px rgba(0, 0, 0, 0.1);
`;
*/

export const Tile = ({ tile }) => {
	const {
		selectedTile,
		setSelectedTile,
		setSelectedOutlinePage,
		tileResizing,
		currentPage,
		setPages,
		pages,
		tileDropPoint,
	} = useContext(TomeContext);
	const { pageTop, pageLeft, pageCornerRadius, pageWidth, minPageHeight, columnGridUnit, columnGrid } =
		useContext(MetricsContext).metrics;

	// The states of a draggable, resizable tile:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING
	const isSelected = selectedTile && selectedTile.id === tile.id;
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldSelectTile, setShouldSelectTile] = useState(false);

	// Use to set an offset for the scaled
	const [dragStartOffsetLeft, setDragStartOffsetLeft] = useState(0);
	const [dragStartOffsetTop, setDragStartOffsetTop] = useState(0);

	// const localTileZIndex = useMotionValue(0);

	// Tile border states
	// Dynamically set border radius depending on position
	const tileBorderSize = 3;
	const borderRadius = useMotionValue(0);
	useEffect(() => {
		/*
		Sort tiles array by tile left position
		*/
		currentPage.tiles.sort((a, b) => a.left - b.left);
		let tilePosition = "left";
		if (currentPage.tiles.length === 2) {
			let rightTile = currentPage.tiles[1];
			if (tile === rightTile) tilePosition = "right";
		}
		if (currentPage.tiles.length === 3) {
			// assign positions based on array sorting of left property
			let middleTile = currentPage.tiles[1];
			let rightTile = currentPage.tiles[2];
			if (tile === middleTile) tilePosition = "middle";
			if (tile === rightTile) tilePosition = "right";
		}
		// console.log(tilePosition);
		/* top-left | top-right | bottom-right | bottom-left */
		switch (tilePosition) {
			case "left":
				borderRadius.set(`${pageCornerRadius}px 0px 0px ${pageCornerRadius}px`);
				break;
			case "right":
				borderRadius.set(`0px ${pageCornerRadius}px ${pageCornerRadius}px 0px`);
				break;
			default:
				borderRadius.set(`0px`);
				break;
		}
	}, [pages, currentPage, tile, borderRadius, pageCornerRadius]);

	/*
	Z-INDEX
	*/
	const zIndex = useMotionValue(0);
	useEffect(() => {
		if (isDragging || isAnimating) {
			zIndex.set(3);
		} else if (isSelected) {
			zIndex.set(2);
		} else if (isHovering) {
			zIndex.set(1);
		} else {
			zIndex.set(0);
		}
	}, [isSelected, isDragging, isHovering, isAnimating, zIndex]);

	// const zIndex = useTransform(y, (v) => {
	// 	if (isDragging.current) return 3;
	// 	return v === 0 ? 1 : 2;
	//   });

	return (
		<TileWrap
			transition={transitions.layoutTransition}
			transitionEnd={{ display: "none" }}
			initial={false}
			animate={{
				left: (tile.left / 12) * pageWidth,
				width: (tile.width / 12) * pageWidth,
			}}
			onAnimationComplete={definition => {
				// console.log("Completed animating", definition);
				setIsAnimating(false);
			}}
			layout
			style={{
				// zIndex: localTileZIndex,
				// zIndex: isSelected || isDragging || isHovering ? 3 : 1,
				zIndex: zIndex,
			}}
		>
			<TileContent
				style={{
					overflow: isSelected ? "hidden" : "auto",
					borderRadius: isSelected ? pageCornerRadius : borderRadius,
					backgroundColor: colors.z1,
				}}
				transition={transitions.layoutTransition}
				animate={{
					opacity: isDragging ? 0.25 : 1,
				}}
			>
				{tile.type === tiles.TEXT.name && (
					<TileText blocks={tile.params.blocks} tileSize={tile.size} isSelected={isSelected} />
				)}
				{tile.type === tiles.IMAGE.name && (
					<TileImage image={tile.params.image} imageSize={tile.params.size} tileSize={tile.size} />
				)}
				{tile.type === tiles.VIDEO.name && <TileVideo video={tile.params.video} tileSize={tile.size} />}
				{tile.type === tiles.TABLE.name && <TileTable tileSize={tile.size} />}
				{tile.type === tiles.CODE.name && <TileCode tileSize={tile.size} />}
				{tile.type === tiles.WEB.name && <TileWeb tileSize={tile.size} />}
				{tile.type === tiles.TWITTER.name && <TileTwitter tileSize={tile.size} />}

				{tile.type === tiles.GIPHY.name && <TileGiphy tileSize={tile.size} />}
				{tile.type === tiles.AIRTABLE.name && <TileAirtable tileSize={tile.size} />}
				{tile.type === tiles.FIGMA.name && <TileFigma tileSize={tile.size} />}
			</TileContent>

			<HoverOutline
				style={{
					borderRadius: borderRadius,
					borderWidth: tileBorderSize,
				}}
				animate={{
					opacity: isHovering && !isDragging ? 1 : 0,
				}}
				transition={transitions.layoutTransition}
				initial={false}
			/>
			<SelectedOutline
				style={{
					borderWidth: tileBorderSize,
					borderRadius: pageCornerRadius,
					borderColor: colors.accent,
					boxShadow: `inset 0px 0px 0px 1px #141414`,
					opacity: isSelected ? 1 : 0,
				}}
			/>

			<GhostTile
				// animate={{ x: dragX }}
				onHoverStart={() => {
					if (!tileResizing && !isSelected) setIsHovering(true);
				}}
				onHoverEnd={() => {
					setIsHovering(false);
				}}
				onPointerDown={() => {
					setShouldSelectTile(true);
				}}
				onPointerUp={() => {
					if (shouldSelectTile) {
						setIsHovering(false);
						setSelectedOutlinePage(null);
						setSelectedTile(tile);
						setShouldSelectTile(false);
					}
				}}
				style={{
					opacity: isDragging ? 1 : 0,
					scale: isDragging ? 0.333 : 1,
					backgroundColor: colors.z2,
					borderRadius: pageCornerRadius,
					left: dragStartOffsetLeft,
					top: dragStartOffsetTop,
				}}
				drag={isSelected ? true : true}
				dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
				onDragStart={(event, info) => {
					/*
					Sort tiles array by tile left position
					*/
					currentPage.tiles.sort((a, b) => a.left - b.left);

					/*
					Offset ghost tile position on drag start
					Center of ghost tile should correspond to drag start cooodinates
					*/
					const tileX = pageLeft + tile.left * columnGridUnit;
					const tileY = pageTop;
					const tileWidth = tile.width * columnGridUnit;
					const tileHeight = minPageHeight;
					const tilePointerCenterXOffset = info.point.x - tileX - tileWidth / 2;
					const tilePointerCenterYOffset = info.point.y - tileY - tileHeight / 2;
					setDragStartOffsetLeft(tilePointerCenterXOffset);
					setDragStartOffsetTop(tilePointerCenterYOffset);
					// console.log("tilePointerOffset", tilePointerCenterXOffset, tilePointerCenterYOffset);

					/*
					Update pointer state
					*/
					setShouldSelectTile(false);
					document.body.style.cursor = "grabbing";
					setIsDragging(true);

					/*
					Update z-index
					*/
					// tileZIndex.set(tileZIndex.get() + 1);
					// localTileZIndex.set(tileZIndex.get());
				}}
				dragElastic={1}
				onDragEnd={(event, info) => {
					/*	
					Reset ghost tile offsets
					*/
					setDragStartOffsetLeft(0);
					setDragStartOffsetTop(0);

					/*	
					Reset pointer state
					*/
					document.body.style.cursor = "auto";
					setIsDragging(false);

					/*	
					Hide drop indicator
					*/
					tileDropPoint.set(-1);

					const point = info.point;

					let leftTile = currentPage.tiles[0];
					let middleTile = null;
					let rightTile = currentPage.tiles[1];
					let tilePosition = tile === rightTile ? "right" : "left";

					/*
						-- OLD OFFSET THRESHOLD
						-- The amount the tile needs to move
						-- to trigger a rearrange :
						If tile is half sized or bigger
							offset is half of the available space
						If tile is less than half sized
							offset is half the width of the tile
						*/
					/*
					if (currentPage.tiles.length === 2) {
						const isBiggerThanHalf = tile.width >= columnGrid / 2;
						const otherTile = tile === currentPage.tiles[1] ? currentPage.tiles[0] : currentPage.tiles[1];
						const availableSpace = (columnGrid - tile.width) * columnGridUnit;
						let thresholdMet = isBiggerThanHalf && Math.abs(offset) >= availableSpace / 2 ? true : false;
						if (!isBiggerThanHalf)
							thresholdMet = Math.abs(offset) >= (tile.width * columnGridUnit) / 2 ? true : false;
						if (thresholdMet) {
							if (tilePosition === "right") {
								tile.left = 0;
								otherTile.left = tile.width;
							}
							if (tilePosition === "left") {
								tile.left = columnGrid - tile.width;
								otherTile.left = 0;
							}
							// update state var
							setPages([currentPage]);
							// console.log(offset, dragDirection, isBiggerThanHalf, thresholdMet, tilePosition);
						}
					}
					*/

					/*
						-- OFFSET THRESHOLD
						-- The amount the tile needs to move to trigger a rearrange
						If 2 tiles
							The pointer must move into the area occupied by the other tile
						If 3 tiles
							If right or left tile 
								The pointer must move into the area occupied by the adjcent tile
									Drop zone 1 valid
								The pointer must moves into the area occupied by the furthest half of the adjcent tile
							If middle tile
								The pointer must move into the area occupied by either adjcent tile
					*/
					if (currentPage.tiles.length === 2) {
						if (tilePosition === "left") {
							const rightTileX = pageLeft + rightTile.left * columnGridUnit;
							const thresholdMet = point.x > rightTileX;
							if (thresholdMet) {
								tile.left = columnGrid - tile.width;
								rightTile.left = 0;
								// update state var
								setIsAnimating(true);
								setPages([currentPage]);
							}
						}
						if (tilePosition === "right") {
							const leftTileRightEdge = pageLeft + (leftTile.left + leftTile.width) * columnGridUnit;
							const thresholdMet = point.x < leftTileRightEdge;
							if (thresholdMet) {
								tile.left = 0;
								leftTile.left = tile.width;
								// update state var
								setIsAnimating(true);
								setPages([currentPage]);
							}
						}
					}

					if (currentPage.tiles.length === 3) {
						/*
						// sort tiles array by tile left position
						currentPage.tiles.sort((a, b) => a.left - b.left);
						let leftTile = currentPage.tiles[0];
						let middleTile = currentPage.tiles[1];
						let rightTile = currentPage.tiles[2];

						// find the position of the dragging tile
						let tilePosition = "left";
						if (tile === currentPage.tiles[1]) tilePosition = "middle";
						if (tile === currentPage.tiles[2]) tilePosition = "right";
						*/

						// assign positions based on array sorting of left property
						middleTile = currentPage.tiles[1];
						rightTile = currentPage.tiles[2];

						// find the position of the dragging tile
						tilePosition = "left";
						if (tile === middleTile) tilePosition = "middle";
						if (tile === rightTile) tilePosition = "right";

						const middleTileX = pageLeft + middleTile.left * columnGridUnit;
						const rightTileX = pageLeft + rightTile.left * columnGridUnit;

						if (tilePosition === "left") {
							// let threshold1Met = offset >= (tile.width * columnGridUnit) / 2 ? true : false;
							// let threshold2Met = offset >= tile.width * columnGridUnit ? true : false;
							const threshold1Met = point.x > middleTileX;
							const threshold2Met = point.x > middleTileX + (middleTile.width / 2) * columnGridUnit;
							if (threshold2Met) {
								middleTile.left = 0;
								rightTile.left = middleTile.width;
								leftTile.left = rightTile.left + rightTile.width;
							} else if (threshold1Met) {
								middleTile.left = 0;
								leftTile.left = middleTile.left + middleTile.width;
							}
							if (threshold1Met || threshold2Met) {
								// update state var
								setIsAnimating(true);
								setPages([currentPage]);
							}
						}

						if (tilePosition === "middle") {
							//let threshold1Met = offset >= (tile.width * columnGridUnit) / 2 ? true : false;
							//let threshold2Met = offset <= (tile.width * -columnGridUnit) / 2 ? true : false;
							const threshold1Met = point.x < middleTileX;
							const threshold2Met = point.x > rightTileX;
							if (threshold2Met) {
								rightTile.left = middleTile.left;
								middleTile.left = rightTile.left + rightTile.width;
							} else if (threshold1Met) {
								leftTile.left = middleTile.width;
								middleTile.left = 0;
							}
							if (threshold1Met || threshold2Met) {
								// update state var
								setIsAnimating(true);
								setPages([currentPage]);
							}
						}

						if (tilePosition === "right") {
							// let threshold1Met = offset <= (tile.width * -columnGridUnit) / 2 ? true : false;
							// let threshold2Met = offset <= tile.width * -columnGridUnit ? true : false;
							const threshold1Met = point.x < rightTileX;
							const threshold2Met = point.x < middleTileX + (middleTile.width / 2) * columnGridUnit;
							if (threshold2Met) {
								rightTile.left = 0;
								leftTile.left = rightTile.width;
								middleTile.left = leftTile.left + leftTile.width;
							} else if (threshold1Met) {
								rightTile.left = middleTile.left;
								middleTile.left = rightTile.left + rightTile.width;
							}
							if (threshold1Met || threshold2Met) {
								// update state var
								setIsAnimating(true);
								setPages([currentPage]);
							}
						}

						// let tileMiddle = tile ! === currentPage.tiles[0] ? currentPage.tiles[0]
						// console.log(currentPage.tiles);
					}
				}}
				onDrag={(event, info) => {
					const point = info.point;

					let leftTile = currentPage.tiles[0];
					let middleTile = null;
					let rightTile = currentPage.tiles[1];
					let tilePosition = tile === rightTile ? "right" : "left";

					if (currentPage.tiles.length === 2) {
						if (tilePosition === "left") {
							const rightTileX = pageLeft + rightTile.left * columnGridUnit;
							const thresholdMet = point.x > rightTileX;
							if (thresholdMet) {
								tileDropPoint.set(columnGrid);
							} else {
								tileDropPoint.set(-1);
							}
						}
						if (tilePosition === "right") {
							const leftTileRightEdge = pageLeft + (leftTile.left + leftTile.width) * columnGridUnit;
							const thresholdMet = point.x < leftTileRightEdge;
							if (thresholdMet) {
								tileDropPoint.set(0);
							} else {
								tileDropPoint.set(-1);
							}
						}
					}

					if (currentPage.tiles.length === 3) {
						// assign positions based on array sorting of left property
						middleTile = currentPage.tiles[1];
						rightTile = currentPage.tiles[2];

						// find the position of the dragging tile
						tilePosition = "left";
						if (tile === middleTile) tilePosition = "middle";
						if (tile === rightTile) tilePosition = "right";

						const middleTileX = pageLeft + middleTile.left * columnGridUnit;
						const rightTileX = pageLeft + rightTile.left * columnGridUnit;

						if (tilePosition === "left") {
							const threshold1Met = point.x > middleTileX;
							const threshold2Met = point.x > middleTileX + (middleTile.width / 2) * columnGridUnit;
							//const threshold2Met = point.x > rightTileX;

							/*
							let threshold1Met = offset >= (tile.width * columnGridUnit) / 2 ? true : false;
							let threshold2Met = offset >= tile.width * columnGridUnit ? true : false;
							*/
							if (threshold2Met) {
								tileDropPoint.set(columnGrid);
							} else if (threshold1Met) {
								tileDropPoint.set(rightTile.left);
							} else {
								tileDropPoint.set(-1);
							}
						}

						if (tilePosition === "middle") {
							const threshold1Met = point.x < middleTileX;
							const threshold2Met = point.x > rightTileX;

							/*
							let threshold1Met = offset >= (tile.width * columnGridUnit) / 2 ? true : false;
							let threshold2Met = offset <= (tile.width * -columnGridUnit) / 2 ? true : false;
							*/

							if (threshold2Met) {
								tileDropPoint.set(columnGrid);
							} else if (threshold1Met) {
								tileDropPoint.set(0);
							} else {
								//tileDropPoint.set(middleTile.left);
								tileDropPoint.set(-1);
							}
						}

						if (tilePosition === "right") {
							const threshold1Met = point.x < rightTileX;
							const threshold2Met = point.x < middleTileX + (middleTile.width / 2) * columnGridUnit;
							//const threshold2Met = point.x < middleTileX;

							/*
							let threshold1Met = offset <= (tile.width * -columnGridUnit) / 2 ? true : false;
							let threshold2Met = offset <= tile.width * -columnGridUnit ? true : false;
							*/

							if (threshold2Met) {
								tileDropPoint.set(0);
							} else if (threshold1Met) {
								tileDropPoint.set(middleTile.left);
							} else {
								// tileDropPoint.set(rightTile.left);
								tileDropPoint.set(-1);
							}
						}
					}
				}}
			>
				{tile.type === tiles.TEXT.name && (
					<TileText blocks={tile.params.blocks} tileSize={tile.size} isSelected={isSelected} />
				)}
				{tile.type === tiles.IMAGE.name && (
					<TileImage image={tile.params.image} imageSize={tile.params.size} tileSize={tile.size} />
				)}
				{tile.type === tiles.VIDEO.name && <TileVideo video={tile.params.video} tileSize={tile.size} />}
				{tile.type === tiles.TABLE.name && <TileTable tileSize={tile.size} />}
				{tile.type === tiles.CODE.name && <TileCode tileSize={tile.size} />}
				{tile.type === tiles.WEB.name && <TileWeb tileSize={tile.size} />}
				{tile.type === tiles.TWITTER.name && <TileTwitter tileSize={tile.size} />}

				{tile.type === tiles.GIPHY.name && <TileGiphy tileSize={tile.size} />}
				{tile.type === tiles.AIRTABLE.name && <TileAirtable tileSize={tile.size} />}
				{tile.type === tiles.FIGMA.name && <TileFigma tileSize={tile.size} />}
			</GhostTile>
		</TileWrap>
	);
};
