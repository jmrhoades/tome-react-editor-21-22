import React from "react";
import styled from "styled-components";

import { IconButton } from "../controls/IconButton";
import { defaultLayoutTransition } from "../index";

import { motion } from "framer-motion";

const ToolBarWrap = styled(motion.div)`
	position: absolute;
	bottom: 4px;
    display: flex;
`;

const editorModeVariants = {
	editing: {
		opacity: 0,
		y: 56,
	},
	presenting: {
		opacity: 1,
		y: 0,
	},
};

const toolbarButtons = [
	{
		name: "emphasisPointer",
		toolTip: "Click Focus",
		shortcut: "1",
	},
	{
		name: "emphasisSelect",
		toolTip: "Draw Focus",
		shortcut: "2",
	},
    {
		name: "emphasisScribble",
		toolTip: "Scribble",
		shortcut: "3",
        activeColor: "rgba(255, 229, 0, 1)",
        activeBackgroundColor: "rgba(255, 229, 0, 0.1)",
	},
    {
		name: "emphasisShine",
		toolTip: "Shine",
		shortcut: "4",
	},
];

export const EmphasisToolbar = props => {



	return (
		<ToolBarWrap
			animate={props.editorState}
			variants={editorModeVariants}
			transition={defaultLayoutTransition}
            initial={false}
		>
			{toolbarButtons.map(({ name, toolTip, shortcut, activeColor, activeBackgroundColor }, i) => (

				<IconButton
					key={i}
					width={64}
					height={64}
                    center={true}
                    active={props.activeEmphasisTool === name}
                    activeColor={activeColor}
                    activeBackgroundColor={activeBackgroundColor}
					name={name}
					tooltipLabel={toolTip}
					tooltipShortcut={shortcut}
					tooltipAlignment="TopMiddle"
					showTooltip={props.showTooltip}
					hideTooltip={props.hideTooltip}
					onTap={() => {
						props.setActiveEmphasisTool(name)
					}}
				/>
			))}

			
		</ToolBarWrap>
	);
};
