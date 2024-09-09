import React, { useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "../../../ds/Button";
import { TomeContext, transitions } from "../tome/TomeContext";
import { panels } from "../panel/Panel";
import { tiles } from "../tile/Tile";

const Wrap = styled(motion.div)`
	position: absolute;
	right: 12px;
	height: 144px;
	pointer-events: auto;
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
	const {
		panelName,
		setPanelName,
		panelOpen,
		setPanelOpen,
		setPanelPosition,
		clickCount,
		showComments,
		selectedTile,
		addPage,
	} = useContext(TomeContext);

	const onToolbarButtonTap = (e, name) => {
		if (panelOpen && panelName !== name) {
			setPanelName(name);
		} else if (panelOpen && panelName === name) {
			setPanelOpen(false);
			setPanelName(null);
		} else if (!panelOpen) {
			setPanelOpen(true);
			setPanelName(name);
		}

		clickCount.set(Math.random());
		setPanelPosition("toolbar");
		e.stopPropagation();
	};

	return (
		<Wrap
			animate={{
				opacity: showComments ? 0 : 1,
			}}
			transition={transitions.layoutTransition}
		>
			<ButtonWrap>
				<AnimatePresence>
					{selectedTile && selectedTile.type.name !== tiles.NULL.name && (
						<motion.div
							key={"tile-icon"}
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ duration: 0.15 }}
							style={{
								marginTop: -40,
							}}
						>
							<Button
								kind="icon"
								isContextual={true}
								icon={selectedTile.type.icon}
								onMouseUp={e => {
									onToolbarButtonTap(e, selectedTile.type.name);
								}}
								selected={panelName === selectedTile.type.name && panelOpen}
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
						selected={panelName === panels.TILES && panelOpen}
					/>

					<Button
						key={"record-panel"}
						kind="icon"
						icon="Record"
						onMouseUp={e => {
							onToolbarButtonTap(e, panels.OVERLAY);
						}}
						selected={panelName === panels.OVERLAY && panelOpen}
					/>
					<Button
						key={"annotate-panel"}
						kind="icon"
						icon="Annotate"
						onMouseUp={e => {
							onToolbarButtonTap(e, panels.ANNOTATIONS);
						}}
						selected={panelName === panels.ANNOTATIONS && panelOpen}
					/>

					<Button
						key={"add-page"}
						kind="icon"
						icon="PlusLandscape"
						onMouseUp={e => {
							addPage();
							clickCount.set(Math.random());
							e.stopPropagation();
						}}
						selected={panelName === "AddPage"}
					/>
				</AnimatePresence>
			</ButtonWrap>
		</Wrap>
	);
};
