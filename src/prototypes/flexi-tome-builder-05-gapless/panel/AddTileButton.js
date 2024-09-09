import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";
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
	width: 102px;
	height: 102px;
	border-radius: 16px;
`;

export const AddTileButton = props => {
	const { addTileToRow } = useContext(TomeContext);
	const returnToStartAnimation = useAnimation();
	const [isAddTileDragging, setIsAddTileDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const tileName = props.tileName;
    const tileIcon = props.tileIcon;

	return (
		<TileTypeContainer key={tileName}>
			<TileType
				animate={{
					opacity: isAddTileDragging ? 1 : 0,
					scale: isAddTileDragging ? 1 : 0,
				}}
				initial={{
					opacity: 0,
					scale: 0,
				}}
			>
				<TileTypeBackground
					style={{
						backgroundColor: "rgba(255, 255, 255, 0.08)",
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
					backgroundColor: colors.z1,
					zIndex: isAddTileDragging ? 10 : 1,
					boxShadow:
						"0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
				}}
				animate={returnToStartAnimation}
				whileTap={{ scale: isAddTileDragging ? 1.5 : 0.9 }}
				drag
				onHoverStart={(event, info) => {
					setIsHovering(true);
				}}
				onHoverEnd={(event, info) => {
					setIsHovering(false);
				}}
				onDragStart={(event, info) => {
					document.body.style.cursor = "grabbing";
					setIsAddTileDragging(true);
				}}
				onDragEnd={(event, info) => {
					document.body.style.cursor = "auto";
					setIsAddTileDragging(false);
					returnToStartAnimation.start({
						x: 0,
						y: 0,
					});
				}}
				onDrag={(event, info) => {
					// tile1Left, tile2Left, tileTop
					// const pX = info.point.x;
					// const pY = info.point.y;
				}}
			>
				<motion.div
					onTap={e => {
						// addTile(tileName);
						addTileToRow(tileName);
					}}
				>
					<TileTypeBackground
						transition={transitions.layoutTransition}
						animate={{
							backgroundColor: isHovering ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)",
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
				</motion.div>
			</TileTypeDraggable>
		</TileTypeContainer>
	);
};
