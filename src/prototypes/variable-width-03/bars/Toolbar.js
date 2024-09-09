import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import { TomeContext } from "../tome/TomeContext";
import { panels } from "../panel/Panel";
import { transitions } from "../../../ds/Transitions";

import { IconButton } from "../ds/Buttons";

const Wrap = styled(motion.div)`
	position: fixed;
	right: 10px;
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
		if (selectedTile && selectedTile.type !== name) {
			setSelectedTile(null);
		}
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
			transition={transitions.playModeFade}
			
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
							// style={{pointerEvents: "auto"}}
						/>
					
				)}

				<IconButton
					key={"add-tile-panel"}
					icon="Add"
					theme={currentPage.theme}
					height={40}
					
					onTap={e => {
						onToolbarButtonTap(e, panels.TILES);
					}}
					active={panelName === panels.TILES && sidePanelOpen}
					// style={{pointerEvents: "auto"}}
				/>

				<IconButton
					key={"record-panel"}
					theme={currentPage.theme}
					height={40}
					icon="Record"
					onTap={e => {
						onToolbarButtonTap(e, panels.OVERLAY);
					}}
					active={panelName === panels.OVERLAY && sidePanelOpen}
					// style={{pointerEvents: "auto"}}
				/>

				<IconButton
					key={"annotate-panel"}
					theme={currentPage.theme}
					height={40}
					icon="Annotate"
					onTap={e => {
						onToolbarButtonTap(e, panels.ANNOTATIONS);
					}}
					active={panelName === panels.ANNOTATIONS && sidePanelOpen}
					// style={{pointerEvents: "auto"}}
				/>

				<IconButton
					key={"theme"}
					theme={currentPage.theme}
					height={40}
					icon="ColorPaletteFill"
					onTap={e => {
						onToolbarButtonTap(e, panels.THEME);
					}}
					active={panelName === panels.THEME && sidePanelOpen}
					// style={{pointerEvents: "auto"}}
				/>
				
				

			
		</Wrap>
	);
};
