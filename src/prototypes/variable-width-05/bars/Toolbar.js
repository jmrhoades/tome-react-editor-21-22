import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { panelNames } from "../page/TileConstants";
import { transitions } from "../ds/Transitions";

import { IconButton } from "../ds/Buttons";

const Wrap = styled(motion.div)`
	position: fixed;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;

	z-index: 2;
	/* pointer-events: none; */
`;

export const Toolbar = props => {
	const {
		sidePanelOpen,
		setSidePanelOpen,
		panelName,
		setPanelName,
		selectedTile,
		setSelectedTile,
		isPlayMode,
		currentPage,
	} = useContext(TomeContext);

	if (selectedTile) {
		// console.log(panelName, sidePanelOpen, selectedTile.type);
	}

	const onToolbarButtonTap = (e, name) => {
		// if (selectedTile && selectedTile.type !== name) {
		// 	setSelectedTile(null);
		// }
		if (!sidePanelOpen) {
			setSidePanelOpen(true);
		} else {
			if (panelName === name) {
				setSidePanelOpen(false);
			}
		}
		setPanelName(name);
	};

	return (
		<Wrap
			animate={{
				opacity: isPlayMode ? 0 : 1,
			}}
			initial={false}
			transition={transitions.basic}
		>
			{selectedTile && (
				<IconButton
					theme={currentPage.theme}
					height={40}
					isContextual={true}
					icon={selectedTile.type}
					onTap={e => {
						onToolbarButtonTap(e, selectedTile.type);
					}}
					active={panelName === selectedTile.type && sidePanelOpen}
					//color={currentPage.theme.colors.accent}
					showBorder={true}
					// style={{pointerEvents: "auto"}}
				/>
			)}

			<IconButton
				key={"add-tile-panel"}
				icon="Add"
				theme={currentPage.theme}
				height={40}
				onTap={e => {
					onToolbarButtonTap(e, panelNames.ADD_TILE.name);
				}}
				active={panelName === panelNames.ADD_TILE.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			<IconButton
				key={"record-panel"}
				theme={currentPage.theme}
				height={40}
				icon="Record"
				onTap={e => {
					onToolbarButtonTap(e, panelNames.RECORD.name);
				}}
				active={panelName === panelNames.RECORD.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			<IconButton
				key={"theme"}
				theme={currentPage.theme}
				height={40}
				icon="ColorPaletteFill"
				onTap={e => {
					onToolbarButtonTap(e, panelNames.THEME.name);
				}}
				active={panelName === panelNames.THEME.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			<IconButton
				key={"page"}
				theme={currentPage.theme}
				height={40}
				icon="Preferences"
				onTap={e => {
					onToolbarButtonTap(e, panelNames.PAGE.name);
				}}
				active={panelName === panelNames.PAGE.name && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/>

			{/* <IconButton
				key={"annotate-panel"}
				theme={currentPage.theme}
				height={40}
				icon="GridFilled"
				onTap={e => {
					onToolbarButtonTap(e, panelNames.ANNOTATIONS);
				}}
				active={panelName === panelNames.ANNOTATIONS && sidePanelOpen}
				// style={{pointerEvents: "auto"}}
			/> */}
		</Wrap>
	);
};
