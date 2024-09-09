import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import { colors } from "../../ds/Colors";
import { MetricsContext, metricConstants } from "./MetricsContext";
import { TomeContext } from "./TomeContext";
import { transitions } from "../../ds/Transitions";
import { Icon } from "../../ds/Icon";

export const panels = {
	TILES: "tiles",
	OVERLAY: "overlay",
	ANNOTATIONS: "annotations",
};

const Wrap = styled(motion.div)`
	position: absolute;
	right: 64px;
	top: 0;
	height: 100%;
`;

const Content = styled(motion.div)`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AddTilePanel = styled(motion.div)``;

const AddTileInput = styled(motion.div)`
	height: 48px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	& input {
		outline: none;
		border: none;
		background-image: none;
		background-color: transparent;
		box-shadow: none;
		font-size: 17px;
		line-height: 22px;
		color: white;
		padding: 14px 12px 12px;
	}
`;

const TileTypes = styled(motion.div)`
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, 102px);
	grid-template-rows: repeat(3, 102px);
	column-gap: 12px;
	row-gap: 12px;
	padding: 12px;
`;

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
	z-index: 1;
`;

const Label = styled(motion.div)`
	position: relative;
	text-align: center;
	font-weight: 500;
	font-size: 11px;
	line-height: 14px;
	color: rgba(255, 255, 255, 1);
`;

const TileTypeBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 102px;
	height: 102px;
	border-radius: 16px;
	background-color: rgba(255, 255, 255, 0.08);
`;

export const Panel = props => {
	const { sidePanelOpen, setAddTileDropTarget, addTileDropTarget, showAddTileDropTarget, setShowAddTileDropTarget } =
		useContext(TomeContext);
	const { tile1Left, tile2Left, tileTop, tileHalfSize } = useContext(MetricsContext).metrics;

	const panelWidth = metricConstants.cPanelWidth;

	const tiles = ["Title", "Text", "Image", "Video", "Table", "Code"];
	const returnToStartAnimation = useAnimation();

	return (
		<Wrap
			style={{
				width: panelWidth,
				pointerEvents: sidePanelOpen ? "auto" : "none",
			}}
		>
			<Content
				style={{
					width: panelWidth,
					transformOrigin: "100% 44%",
				}}
				transition={sidePanelOpen ? transitions.layoutTransition : transitions.quickEase}
				animate={{
					scale: sidePanelOpen ? 1 : 0.9,
					x: sidePanelOpen ? 0 : 0,
					opacity: sidePanelOpen ? 1 : 0,
				}}
			>
				<AddTilePanel
					style={{
						width: panelWidth,
						height: 567,
						backgroundColor: colors.z1,
						borderRadius: 16,
					}}
				>
					<AddTileInput>
						<input
							placeholder={"Add something…"}
							style={{
								caretColor: colors.accent,
							}}
						/>
					</AddTileInput>

					<TileTypes>
						{tiles.map(tileName => (
							<TileTypeContainer key={tileName}>
								<TileType>
									<TileTypeBackground />
									<Icon name={tileName} size={52} />
									<Label style={{ opacity: 0.4 }}>{tileName}</Label>
								</TileType>
								<TileTypeDraggable
									transition={{
										duration: 0.25,
										ease: [0.4, 0, 0.1, 1],
									}}
									initial={{
										opacity: 0,
									}}
									whileDrag={{ opacity: 1 }}
									animate={returnToStartAnimation}
									drag
									onDragStart={(event, info) => {
										document.body.style.cursor = "grabbing";
									}}
									onDragEnd={(event, info) => {
										document.body.style.cursor = "auto";
										if (showAddTileDropTarget) {
											returnToStartAnimation.start({
												x: 0,
												y: 0,
											});
										} else {
											returnToStartAnimation.start({
												x: 0,
												y: 0,
											});
										}
										setShowAddTileDropTarget(false);
									}}
									onDrag={(event, info) => {
										//tile1Left, tile2Left, tileTop
										const pX = info.point.x;
										const pY = info.point.y;

										// console.log(pX, pY);
										//dragX.set(pX);
										//dragY.set(pY);

										const wideTileDropAmount = 88;

										const tileLeftLeft = tile1Left;
										const tileLeftRight = tile1Left + tileHalfSize - wideTileDropAmount;
										const tileRightLeft = tile2Left + wideTileDropAmount;
										const tileRightRight = tile2Left + tileHalfSize;
										const tileWideLeft = tileLeftRight;
										const tileWideRight = tileRightLeft;

										const withinYBounds = pY > tileTop && pY < tileTop + tileHalfSize;
										const withinXBounds = pX > tile1Left && pX < tileRightRight;
										const withinBounds = withinYBounds && withinXBounds;
										if (showAddTileDropTarget && !withinBounds) {
											setShowAddTileDropTarget(false);
										}
										if (!showAddTileDropTarget && withinBounds) {
											setShowAddTileDropTarget(true);
										}
										//addTileAlpha.set(withinYBounds && withinXBounds ? 1 : 0);

										//const withinYBounds = true;
										if (
											withinYBounds &&
											pX > tileLeftLeft &&
											pX < tileLeftRight &&
											addTileDropTarget !== "left"
										) {
											console.log("left");
											setAddTileDropTarget("left");
										} else if (
											withinYBounds &&
											pX > tileRightLeft &&
											pX < tileRightRight &&
											addTileDropTarget !== "right"
										) {
											console.log("right");
											setAddTileDropTarget("right");
										} else if (
											withinYBounds &&
											pX > tileWideLeft &&
											pX < tileWideRight &&
											addTileDropTarget !== "wide"
										) {
											console.log("wide");
											setAddTileDropTarget("wide");
										}

										/*
                                        if (!withinBounds && addTileDropTarget !== "") {
                                            console.log("clearing size")
											setAddTileDropTarget("");
										}
                                        */
									}}
								>
									<TileTypeBackground
										transition={transitions.layoutTransition}
										animate={{
											backgroundColor: showAddTileDropTarget
												? "rgba(61, 61, 61, 1)"
												: "rgba(61, 61, 61, 0.5)",
											width: addTileDropTarget === "wide" && showAddTileDropTarget ? 200 : 102,
											left: addTileDropTarget === "wide" && showAddTileDropTarget ? -49 : 0,
										}}
										style={{
											boxShadow:
												"0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
										}}
									/>
									<motion.div
										style={{
											position: "relative",
										}}
										animate={{
											opacity: showAddTileDropTarget ? 0.8 : 0.4,
										}}
									>
										<Icon name={tileName} size={52} opacity={1} />
									</motion.div>
									<Label
										animate={{
											opacity: showAddTileDropTarget ? 0.8 : 0.4,
										}}
									>
										{tileName}
									</Label>
								</TileTypeDraggable>
							</TileTypeContainer>
						))}
					</TileTypes>
				</AddTilePanel>
			</Content>
		</Wrap>
	);
};
