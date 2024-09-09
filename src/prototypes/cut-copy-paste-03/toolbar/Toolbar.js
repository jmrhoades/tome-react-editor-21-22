import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { TomeContext } from "../tome/TomeContext";
import { panels } from "../panel/Panel";
import { transitions } from "../../../ds/Transitions";

const Wrap = styled(motion.div)`
	position: fixed;
	right: 16px;
	top: 50%;
`;

const ButtonWrap = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: column;
	& > button {
		margin: 4px 0;
	}
`;

export const Toolbar = props => {
	const { sidePanelOpen, setSidePanelOpen, panelName, setPanelName, selectedTile, setSelectedTile, isPlayMode } =
		useContext(TomeContext);
	const addTileButton = selectedTile ? true : false;

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
			style={{
				y: -144 / 2,
			}}
		>
			<ButtonWrap>
				{addTileButton && (
					<motion.div
						key={"tile-icon"}
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						transition={transitions.layoutTransition}
						style={{
							marginTop: -40,
						}}
					>
						<Button
							kind="icon"
							isContextual={true}
							icon={selectedTile.type}
							onMouseUp={e => {
								onToolbarButtonTap(e, selectedTile.type);
							}}
							selected={panelName === selectedTile.type && sidePanelOpen}
							color="rgba(237, 0, 235, 0.75)"
							selectedColor={"rgba(237, 0, 235, 1.0)"}
						/>
					</motion.div>
				)}

				<Button
					key={"add-tile-panel"}
					kind="icon"
					icon="Add"
					onMouseUp={e => {
						onToolbarButtonTap(e, panels.TILES);
					}}
					selected={panelName === panels.TILES && sidePanelOpen}
				/>

				<Button
					key={"record-panel"}
					kind="icon"
					icon="Record"
					onMouseUp={e => {
						onToolbarButtonTap(e, panels.OVERLAY);
					}}
					selected={panelName === panels.OVERLAY && sidePanelOpen}
				/>

				<Button
					key={"annotate-panel"}
					kind="icon"
					icon="Annotate"
					onMouseUp={e => {
						onToolbarButtonTap(e, panels.ANNOTATIONS);
					}}
					selected={panelName === panels.ANNOTATIONS && sidePanelOpen}
				/>

<Button
					key={"annotate-theme"}
					kind="icon"
					icon="Theme"
					onMouseUp={e => {
						onToolbarButtonTap(e, panels.THEME);
					}}
					selected={panelName === panels.THEME && sidePanelOpen}
				/>



			</ButtonWrap>
		</Wrap>
	);
};
