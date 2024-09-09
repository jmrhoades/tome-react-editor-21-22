import React from "react";
import styled from "styled-components";

import { IconButton } from "../controls/IconButton";
import { toolbarButtons, defaultLayoutTransition } from "../index";

import { motion } from "framer-motion";

const ToolBarWrap = styled(motion.div)`
	position: absolute;
	right: 0;
`;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

export const Toolbar = props => {

	const onButtonTap = (name, id) => {
		if (name === props.panelName) {
			props.setPanelState(false);
			props.setActivePanelName("");
		} else {
			props.setPanelState(true);
			props.setActivePanelName(name);
		}
	};

	return (
		<ToolBarWrap
			animate={props.editorState}
			variants={editorModeVariants}
			transition={defaultLayoutTransition}
		>
			{toolbarButtons.map(({ type, name, toolTip, shortcut }, i) => (

				<IconButton
					key={i}
					type={type}
					width={64}
					height={52}
					name={name}
					active={props.panelName === name}
					tooltipLabel={toolTip}
					tooltipShortcut={shortcut}
					tooltipAlignment="MiddleLeft"
					showTooltip={props.showTooltip}
					hideTooltip={props.hideTooltip}
					onTap={() => {
						onButtonTap(name, i);
						props.hideTooltip();
					}}
				/>
			))}

			
		</ToolBarWrap>
	);
};
