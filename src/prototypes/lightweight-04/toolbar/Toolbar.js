import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { transitions, TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	right: 12px;
`;

const ButtonWrap = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: column;
	& > button {
		margin: 4px 0;
	}
`;

const editorModeVariants = {
	editing: {
		opacity: 1,
		x: 0,
	},
	posted: {
		opacity: 0,
		x: 80,
	},
};

const toolbarVariants = {
	show: {
		opacity: 1,
	},
	hide: {
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
		<Wrap
			animate={tome.showUI ? "show" : "hide"}
			variants={toolbarVariants}
			transition={transitions.defaultTransition}
		>
			<ButtonWrap animate={tome.documentStatus} variants={editorModeVariants} transition={{ duration: 0.5 }}>
				<Button
					kind="icon"
					icon="Add"
					onMouseUp={e => {
						onButtonTap("Add");
						e.stopPropagation();
					}}
					selected={props.panelName === "Add"}
				/>
				<Button
					kind="icon"
					icon="Record"
					onMouseUp={e => {
						onButtonTap("Record");
						tome.clickCount.set(Math.random());
						e.stopPropagation();
					}}
					selected={tome.panelName === "Record"}
				/>
				<Button
					kind="icon"
					icon="Annotate"
					onMouseUp={e => {
						onButtonTap("Annotate");
						tome.clickCount.set(Math.random());
						e.stopPropagation();
					}}
					selected={tome.panelName === "Annotate"}
				/>
				<Button
					kind="icon"
					icon="MagicWand"
					onMouseUp={e => {
						e.stopPropagation();
					}}
					selected={tome.panelName === "Emphasis"}
				/>
			</ButtonWrap>
		</Wrap>
	);
};
