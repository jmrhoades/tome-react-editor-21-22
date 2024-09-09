import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { defaultLayoutTransition } from "../index";
import { TomeContext } from "../tome/TomeContext";



const Wrap = styled(motion.div)`
	position: absolute;
	right: 12px;
	top: 50%;
	transform: translateY(-50%);
	/* background-color: rgba(115, 150, 256, 0.5); */
`;

const ButtonWrap = styled(motion.div)`
	display: flex;
	flex-direction: column;
	& > button {
		margin: 4px 0;
	}
`;

// const Separator = styled(motion.div)`
// 	position: relative;
// 	height: 1px;
// 	background-color: rgba(255, 255, 255, 0.16);
// 	width: 24px;
// 	left: calc(50% - 12px);
// 	margin: 8px 0;
// `;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

export const Toolbar = props => {

	const tome = useContext(TomeContext);
	
	const onButtonTap = name => {
		if (name === tome.panelName) {
			tome.setPanelOpen(false);
			tome.setPanelName("");
		} else {
			tome.setPanelOpen(true);
			tome.setPanelName(name);
		}
	};

	return (
		<Wrap animate={tome.editorState} variants={editorModeVariants} transition={defaultLayoutTransition}>
			<ButtonWrap>
				<Button
					kind="icon"
					icon="Text"
					onMouseUp={e => {
						onButtonTap("Text");
						e.stopPropagation();
					}}
					selected={tome.panelName === "Text"}
				/>
				<Button
					kind="icon"
					icon="Photo"
					onMouseUp={e => {
						onButtonTap("Photo");
						e.stopPropagation();
					}}
					selected={tome.panelName === "Photo"}
				/>
				{/* <Separator /> */}
				<Button
					kind="icon"
					icon="Add"
					onMouseUp={e => {
						onButtonTap("Add");
						e.stopPropagation();
					}}
					selected={tome.panelName === "Add"}
				/>
				<Button
					kind="icon"
					icon="Record"
					onMouseUp={e => {
						onButtonTap("Record");
						e.stopPropagation();
					}}
					selected={tome.panelName === "Record"}
				/>
				<Button
					kind="icon"
					icon="Annotate"
					// selectedColor="rgba(255, 229, 0, 1)"
					onMouseUp={e => {
						onButtonTap("Annotate");
						e.stopPropagation();
					}}
					selected={tome.panelName === "Annotate"}
				/>
			</ButtonWrap>
		</Wrap>
	);
};
