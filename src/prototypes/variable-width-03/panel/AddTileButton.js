import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { colors } from "../ds/Colors";
// import { transitions } from "../../../ds/Transitions";
import { Icon } from "../../../ds/Icon";
import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { transitions } from "../../../ds/Transitions";

export const panels = {
	TILES: "tiles",
	OVERLAY: "overlay",
	ANNOTATIONS: "annotations",
};

const TileTypeContainer = styled(motion.div)`
	position: relative;
	width: 102px;
	height: 102px;
`;

const TileType = styled(motion.div)`
	width: 102px;
	height: 102px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const TileTypeDraggable = styled(TileType)`
	position: absolute;
	top: 0;
	left: 0;
`;

const Label = styled(motion.div)`
	position: relative;
	text-align: center;
	font-weight: 500;
	font-size: 12px;
	line-height: 14px;
	color: rgba(255, 255, 255, 0.5);
	pointer-events: none;
`;

const TileTypeBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const AddIcon = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 24px;
	height: 24px;
`;

export const AddTileButton = props => {
	const { addTileToRow, tileDropInfo, tomeData } = useContext(TomeContext);
	const { metrics, getTileY, scrollWindowToY, getTileHeight } = useContext(MetricsContext);
	const { tileCornerRadius } = metrics;
	const borderRadius = 16;

	// The states of a draggable, clickable, view-transitioning button:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isValidDrop, setIsValidDrop] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldClick, setShouldClick] = useState(false);

	const returnToStartAnimation = useAnimation();
	const tileName = props.tileName;
	const tileIcon = props.tileIcon;

	const draggableRef = useRef();
	const draggableStartX = useMotionValue(0);
	const draggableStartY = useMotionValue(0);

	const isOverTarget = isDragging && tileDropInfo.show;
	// const isTall = tileDropInfo.height > tileDropInfo.width;
	const isTall = false;

	const buttonSquareSize = 102;

	let buttonDraggingWidth = 102;
	let buttonDraggingHeight = 102;

	if (isOverTarget) {
		if (isTall) {
			buttonDraggingHeight = 102;
		} else {
			buttonDraggingWidth = 204;
		}
	}

	/*
	if (tileDropInfo.newTileWidth && isDragging) {
		if (tileDropInfo.show && tileDropInfo.draggableWidth) {
			buttonDraggingWidth = tileDropInfo.draggableWidth;
			buttonDraggingHeight = tileDropInfo.draggableHeight;
		}
		if (isValidDrop) {
			buttonDraggingWidth = tileDropInfo.newTileWidth;
			buttonDraggingHeight = tileDropInfo.newTileHeight;
		}
	}
	*/

	let bgColor = colors.z1;
	/*
	if (tileIcon === "Twitter") bgColor = colors.nullTileBackgrounds.twitter;
	if (tileIcon === "Giphy") bgColor = colors.nullTileBackgrounds.giphy;
	if (tileIcon === "Airtable") bgColor = colors.nullTileBackgrounds.airtable;
	if (tileIcon === "Figma") bgColor = colors.nullTileBackgrounds.figma;
	*/

	return (
		<TileTypeContainer key={tileName}>
			<TileType
				animate={{
					opacity: isDragging ? 1 : 0,
					scale: isDragging ? 1 : 0,
				}}
				initial={{
					opacity: 0,
					scale: 0,
				}}
			>
				<TileTypeBackground
					style={{
						backgroundColor: "rgba(255, 255, 255, 0.04)",
						width: buttonSquareSize,
						height: buttonSquareSize,
						borderRadius: borderRadius,
					}}
				/>
				<Icon
					name={tileIcon}
					size={52}
					opacity={
						tileIcon === "Twitter" || tileIcon === "Giphy" || tileIcon === "Airtable" || tileIcon === "Figma"
							? 0.6
							: 0.2
					}
				/>
				<Label style={{ opacity: 0.4 }}>{tileName}</Label>
			</TileType>

			<TileTypeDraggable
				ref={draggableRef}
				transition={transitions.layoutTransition}
				style={{
					zIndex: isAnimating ? 10 : 1,
				}}
				animate={returnToStartAnimation}
				drag
				onPointerDown={() => {
					setShouldClick(true);
					returnToStartAnimation.start({
						scale: 0.9,
					});
				}}
				onPointerUp={() => {
					// console.log("up", shouldClick)
					document.body.style.cursor = "auto";

					if (shouldClick) {
						setShouldClick(false);

						const tile = addTileToRow(tileName);
						const tileY = getTileY(tile)
						const tileHeight = getTileHeight(tile)
						console.log("tileY", tileY, "tileHeight", tileHeight);
						const sY = Math.round(tileY + tileHeight)
						scrollWindowToY(sY);

						returnToStartAnimation.start({
							scale: 1,
						});
					}
				}}
				onHoverStart={(event, info) => {
					setIsHovering(true);
				}}
				onHoverEnd={(event, info) => {
					setIsHovering(false);
				}}
				onDragStart={(event, info) => {
					document.body.style.cursor = "grabbing";
					setIsDragging(true);
					setIsAnimating(true);
					setShouldClick(false);
					props.onAddTileDragStart(tileName, info.point.x, info.point.y);

					returnToStartAnimation.start({
						scale: 1,
					});

					if (draggableRef.current) {
						const r = draggableRef.current.getBoundingClientRect();
						draggableStartX.set(r.left);
						draggableStartY.set(r.top);

						const draggableCenterRelativeOffsetX = info.point.x - r.left - 104 / 2;
						const draggableCenterRelativeOffsetY = info.point.y - r.top - 104 / 2;
						tomeData.draggableOffsetX = draggableCenterRelativeOffsetX;
						tomeData.draggableOffsetY = draggableCenterRelativeOffsetY;
						// console.log("rect", r.top, r.left, draggableCenterRelativeOffsetX, draggableCenterRelativeOffsetY);
					}
				}}
				onDragEnd={(event, info) => {
					document.body.style.cursor = "auto";
					// console.log("button drag end");

					const dropTargetSuccess = props.onAddTileDrag(tileName, info.point.x, info.point.y, true);
					setIsValidDrop(dropTargetSuccess);

					if (dropTargetSuccess) {
						console.log(
							"dropTargetSuccess",
							window.scrollY,
							dropTargetSuccess,
							tileDropInfo.x,
							tileDropInfo.y,
							tileDropInfo.dropButtonOffsetY
						);

						const gX = draggableStartX.get();
						const gY = draggableStartY.get();

						returnToStartAnimation.start({
							x: -gX + tileDropInfo.dropButtonOffsetX - buttonSquareSize / 2 + tileDropInfo.newTileWidth / 2,
							y:
								-gY +
								tileDropInfo.dropButtonOffsetY +
								tileDropInfo.dropButtonTileTop -
								buttonSquareSize / 2 +
								tileDropInfo.newTileHeight / 2 -
								window.scrollY,
							// opacity: 0,
							transition: {
								...transitions.layoutTransition,
								onComplete: () => {
									setIsAnimating(false);
									setIsDragging(false);
									setIsValidDrop(false);
									// restore default zindex to panel
									props.onAddTileDragEnd();
									// selectTile(tileDropInfo.newTile);
									returnToStartAnimation.start({
										x: 0,
										y: 0,
										scale: 1,
										opacity: 1,
										transition: {
											duration: 0,
										},
									});
								},
							},
						});
					} else {
						returnToStartAnimation.start({
							x: 0,
							y: 0,
							scale: 1,
							opacity: 1,
							transition: {
								...transitions.layoutTransition,
								onComplete: () => {
									setIsAnimating(false);
									setIsDragging(false);
									setIsValidDrop(false);
									// restore default zindex to panel
									props.onAddTileDragEnd();
								},
							},
						});
					}
				}}
				onDrag={(event, info) => {
					// dragX.set(info.point.x);
					// dragY.set(info.point.y);
					// console.log(tileDropInfo.newTileWidth, tileDropInfo.newTileHeight);
					props.onAddTileDrag(tileName, info.point.x, info.point.y, false);
					// document.body.style.cursor = isOverTarget ? "copy" : "auto";
				}}
			>
				<TileTypeBackground
					transition={transitions.layoutTransition}
					initial={false}
					animate={{
						opacity: isDragging ? 0.75 : 1,
						borderRadius: isDragging ? tileCornerRadius : borderRadius,
						width: buttonDraggingWidth,
						height: buttonDraggingHeight,
						x: (buttonSquareSize - buttonDraggingWidth) / 2,
						y: (buttonSquareSize - buttonDraggingHeight) / 2,
					}}
					style={{
						backgroundColor: bgColor,
						boxShadow:
							"0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
					}}
				/>

				<TileTypeBackground
					transition={transitions.layoutTransition}
					initial={false}
					animate={{
						borderRadius: isDragging ? tileCornerRadius : borderRadius,
						backgroundColor: isHovering ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)",
						width: buttonDraggingWidth,
						height: buttonDraggingHeight,
						x: (buttonSquareSize - buttonDraggingWidth) / 2,
						y: (buttonSquareSize - buttonDraggingHeight) / 2,
					}}
				/>

				<motion.div
					transition={transitions.layoutTransition}
					animate={{
						y: isOverTarget && !isValidDrop ? 7 : 0,
						scale: isOverTarget && !isValidDrop ? 0.8 : 1,
					}}
				>
					<Icon
						name={tileIcon}
						size={52}
						opacity={
							tileIcon === "Twitter" || tileIcon === "Giphy" || tileIcon === "Airtable" || tileIcon === "Figma"
								? 1
								: 0.6
						}
					/>
				</motion.div>

				<Label
					animate={{
						y: isOverTarget && !isValidDrop ? 7 : 0,
						opacity: isOverTarget && !isValidDrop ? 0 : 1,
					}}
					transition={transitions.layoutTransition}
					initial={false}
				>
					{tileName}
				</Label>

				<AddIcon
					animate={{
						scale: isOverTarget && !isValidDrop ? 0.8333 : 0,
						opacity: isOverTarget && !isValidDrop ? 1 : 0,
						x: (buttonSquareSize - buttonDraggingWidth) / 2 - 12,
						y: (buttonSquareSize - buttonDraggingHeight) / 2 - 12,
					}}
					transition={transitions.layoutTransition}
					initial={false}
				>
					<motion.svg width="24" height="24" viewBox="0 0 24 24">
						<motion.circle cx="12" cy="12" r="12" fill={colors.accent} />
						<motion.path
							d="M12.6001 6.6C12.6001 6.26863 12.3314 6 12.0001 6C11.6687 6 11.4001 6.26863 11.4001 6.6V11.4H6.60006C6.26869 11.4 6.00006 11.6686 6.00006 12C6.00006 12.3314 6.26869 12.6 6.60006 12.6H11.4001V17.4C11.4001 17.7314 11.6687 18 12.0001 18C12.3314 18 12.6001 17.7314 12.6001 17.4V12.6H17.4001C17.7314 12.6 18.0001 12.3314 18.0001 12C18.0001 11.6686 17.7314 11.4 17.4001 11.4H12.6001V6.6Z"
							fill={colors.white}
							stroke={colors.white}
							strokeWidth="1.0"
							strokeLinecap="round"
						/>
					</motion.svg>
				</AddIcon>
			</TileTypeDraggable>
		</TileTypeContainer>
	);
};
