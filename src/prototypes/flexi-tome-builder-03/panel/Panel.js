import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import { metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { AddTileButton } from "./AddTileButton";
import { tiles } from "../page/Tile";



export const panels = {
	TILES: "tiles",
	OVERLAY: "overlay",
	ANNOTATIONS: "annotations",
};

const Wrap = styled(motion.div)`
	position: fixed;
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
	grid-template-rows: repeat(5, 102px);
	column-gap: 12px;
	row-gap: 12px;
	padding: 12px;
`;

export const Panel = props => {
	const { sidePanelOpen } = useContext(TomeContext);

	const panelWidth = metricConstants.cPanelWidth;

	 // "Text", "Image", "Video", "Table", "Code", "Web", "Twitter", "Giphy", "Airtable", "Figma"
	const availableTiles = [
		tiles.TEXT,
		tiles.IMAGE,
		tiles.VIDEO,
		tiles.TABLE,
		tiles.CODE,
		tiles.WEB,
		tiles.TWITTER,
		tiles.GIPHY,
		tiles.AIRTABLE,
		tiles.FIGMA,
	];

	// const [isAddTileDragging, setIsAddTileDragging] = useState(false);

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
				initial={false}
			>
				<AddTilePanel
					style={{
						width: panelWidth,
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
						{availableTiles.map(tileType => (
							<AddTileButton tileName={tileType.name} tileIcon={tileType.icon} key={tileType.name} />
						))}
					</TileTypes>
				</AddTilePanel>
			</Content>
		</Wrap>
	);
};
