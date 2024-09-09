import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../ds/Button";
import { TomeContext } from "./TomeContext";
import { panels } from "./Panel";

const Wrap = styled(motion.div)`
	position: absolute;
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
	const { sidePanelOpen, setSidePanelOpen, panelName, setPanelName } = useContext(TomeContext);

	return (
		<Wrap
			style={{
				y: -144 / 2,
			}}
		>
			<ButtonWrap>
				<Button
					key={"add-tile-panel"}
					kind="icon"
					icon="Add"
					onMouseUp={e => {
						setSidePanelOpen(!sidePanelOpen);
						setPanelName(panels.TILES);
					}}
					selected={panelName === panels.TILES && sidePanelOpen}
				/>

				<Button
					key={"record-panel"}
					kind="icon"
					icon="Record"
					onMouseUp={e => {
						// onToolbarButtonTap(e, panels.OVERLAY);
					}}
					// selected={panelName === panels.OVERLAY && panelOpen}
				/>

				<Button
					key={"annotate-panel"}
					kind="icon"
					icon="Annotate"
					onMouseUp={e => {
						// onToolbarButtonTap(e, panels.ANNOTATIONS);
					}}
					// selected={panelName === panels.ANNOTATIONS && panelOpen}
				/>
			</ButtonWrap>
		</Wrap>
	);
};
