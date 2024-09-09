import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { TomeContext, transitions } from "../tome/TomeContext";
import { DiagramContext } from "../diagram/DiagramContext";
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

const list = {
	visible: {
		opacity: 1,
		x: 0,
	},
	hidden: {
		opacity: 0,
		x: 50,
	},
};

export const Toolbar = props => {
	const {
		panelName,
		setPanelName,
		panelOpen,
		setPanelOpen,
		setPanelPosition,
		clickCount,
		selectedTile,
	} = useContext(TomeContext);

	const { diagramExpanded } = useContext(DiagramContext);

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
		<Wrap>
			<ButtonWrap
				initial="visible"
				animate={diagramExpanded ? "hidden" : "visible"}
				variants={list}
				transition={transitions.layoutTransition}
			>
				{selectedTile && selectedTile.type.name !== tiles.NULL.name && (
					<motion.div
						key={"tile-icon"}
						style={{
							marginTop: -40,
						}}
					>
						<Button
							kind="icon"
							icon={selectedTile.type.icon}
							onMouseUp={e => {
								onToolbarButtonTap(e, selectedTile.type.name);
							}}
							selected={panelName === selectedTile.type.name && panelOpen}
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
			</ButtonWrap>
		</Wrap>
	);
};
