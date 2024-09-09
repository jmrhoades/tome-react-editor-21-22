import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { colors } from "../../../ds/Colors";
// import { transitions } from "../../../ds/Transitions";
import { Icon } from "../../../ds/Icon";
import { TomeContext } from "../tome/TomeContext";

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
	border-radius: 16px;
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
	border-radius: 16px;
`;

const AddIcon = styled(motion.div)`
	position: absolute;
	top: -8px;
	left: 0;
	width: 24px;
	height: 24px;
`;

export const AddTileButton = props => {
	const { addTileToRow, tileDropInfo } = useContext(TomeContext);

	// The states of a draggable, clickable, view-transitioning button:
	// -SELECTED -DRAGGING -HOVERING -TRANSITIONING
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// Used to disambiguate a click from a pointer-down+drag
	const [shouldClick, setShouldClick] = useState(false);

	const returnToStartAnimation = useAnimation();
	const tileName = props.tileName;
	const tileIcon = props.tileIcon;

	const isOverTarget = isDragging && tileDropInfo.show;
	const isTall = tileDropInfo.height > tileDropInfo.width;

	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);
	const validDropTarget = useMotionValue(false);

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
						backgroundColor: "rgba(255, 255, 255, 0.08)",
						width: buttonSquareSize,
						height: buttonSquareSize,
					}}
				/>
				<Icon
					name={tileIcon}
					size={52}
					opacity={
						tileIcon === "Twitter" || tileIcon === "Giphy" || tileIcon === "Airtable" || tileIcon === "Figma"
							? 1
							: 0.6
					}
				/>
				<Label style={{ opacity: 0.4 }}>{tileName}</Label>
			</TileType>

			<TileTypeDraggable
				transition={{
					duration: 0.25,
					ease: [0.4, 0, 0.1, 1],
				}}
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
					console.log("up", shouldClick)
					document.body.style.cursor = "auto";
					if (shouldClick) {
						setShouldClick(false);
						addTileToRow(tileName);
						returnToStartAnimation.start({
							scale: 1,
						});
					} else {
						const dropTargetSuccess = props.onAddTileDrag(tileName, dragX.get(), dragY.get(), true);
						validDropTarget.set(dropTargetSuccess);
						
						console.log(dropTargetSuccess);
						if (dropTargetSuccess) {
							setIsDragging(true);
							returnToStartAnimation.start({
								scale: 2,
								opacity: 0,
								transition: {
									onComplete: () => {
										setIsAnimating(false);
									},
								},
							});
						} else {
							console.log("animate")
							setIsDragging(false);
							returnToStartAnimation.start({
								x: 0,
								y: 0,
								scale: 1,
								opacity: 1,
								transition: {
									onComplete: () => {
										setIsAnimating(false);
									},
								},
							});
						}
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
					// returnToStartAnimation.start({
					// 	scale: 1,
					// });
				}}
				onDragEnd={(event, info) => {
					document.body.style.cursor = "auto";
					console.log("drag end");

					//dragX.set(info.point.x);
					//dragY.set(info.point.y);

					if (!validDropTarget.get()) {
						setIsDragging(false);
						returnToStartAnimation.start({
							x: 0,
							y: 0,
							scale: 1,
							opacity: 1,
							transition: {
								onComplete: () => {
									setIsAnimating(false);
								},
							},
						});
					}

					///
					// NOTE: DOING THIS HERE IS TOXIC! IT BREAKS NEW TILE ANIMATIONS
					// MUST DO THIS ON POINTER UP INSTEAD ––– DON'T KNOW WHY
					///
					/*
					const dropTargetSuccess = props.onAddTileDrag(tileName, info.point.x, info.point.y, true);
					console.log(dropTargetSuccess);
					if (dropTargetSuccess) {
						setIsDragging(true);
						returnToStartAnimation.start({
							scale: 2,
							opacity: 0,
							transition: {
								onComplete: () => {
									setIsAnimating(false);
								},
							},
						});
					} else {
						setIsDragging(false);
						returnToStartAnimation.start({
							x: 0,
							y: 0,
							scale: 1,
							opacity: 1,
							transition: {
								onComplete: () => {
									setIsAnimating(false);
								},
							},
						});
					}
					*/
				}}
				onDrag={(event, info) => {
					// tile1Left, tile2Left, tileTop
					const pX = info.point.x;
					const pY = info.point.y;
					dragX.set(info.point.x);
					dragY.set(info.point.y);
					props.onAddTileDrag(tileName, pX, pY, false);
					// document.body.style.cursor = isOverTarget ? "copy" : "auto";
				}}
			>
				<TileTypeBackground
					transition={{
						opacity: { type: "tween", duration: 0.2 },
						default: { type: "spring", stiffness: 550, damping: 50 },
					}}
					initial={false}
					animate={{
						opacity: isDragging ? 0.75 : 1,
						width: buttonDraggingWidth,
						height: buttonDraggingHeight,
						x: (buttonSquareSize - buttonDraggingWidth) / 2,
						y: (buttonSquareSize - buttonDraggingHeight) / 2,
					}}
					style={{
						backgroundColor: colors.z1,
						boxShadow:
							"0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
					}}
				/>

				<TileTypeBackground
					transition={{ type: "spring", stiffness: 550, damping: 50 }}
					initial={false}
					animate={{
						backgroundColor: isHovering ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)",
						width: buttonDraggingWidth,
						height: buttonDraggingHeight,
						x: (buttonSquareSize - buttonDraggingWidth) / 2,
						y: (buttonSquareSize - buttonDraggingHeight) / 2,
					}}
				/>

				<Icon
					name={tileIcon}
					size={52}
					opacity={
						tileIcon === "Twitter" || tileIcon === "Giphy" || tileIcon === "Airtable" || tileIcon === "Figma"
							? 1
							: 0.6
					}
				/>

				<Label>{tileName}</Label>

				<AddIcon
					animate={{
						scale: isOverTarget ? 1 : 0,
						x: (buttonSquareSize - buttonDraggingWidth) / 2 - 8,
						opacity: isOverTarget ? 1 : 0,
					}}
					transition={{
						scale: { type: "spring", stiffness: 550, damping: 50 },
						x: { type: "spring", stiffness: 550, damping: 50 },
						opacity: { type: "tween", duration: 0.2 },
					}}
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
