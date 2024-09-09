import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { defaultLayoutTransition } from "../index";
import { IconButton } from "../controls/IconButton";

const BottomBarWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	height: 72px;
	line-height: 72px;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.4);
`;

const Center = styled.div`
	position: absolute;
	left: 100px;
	right: 100px;
	height: 100%;
	text-align: center;
`;
const CurrentPage = styled.span``;

const Left = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	padding: 16px 0 0 24px;
	/* & path {
		fill: rgba(255, 255, 255, 1.0);
	} */
`;

const Right = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	padding-top: 16px;
`;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

export const BottomBar = props => {
	return (
		<BottomBarWrap animate={props.editorState} variants={editorModeVariants} transition={defaultLayoutTransition}>
			<Left>
				<IconButton
					name={"addPage"}
					width={64}
					tooltipLabel="New Page"
					tooltipShortcut="N"
					tooltipAlignment="MiddleRight"
					showTooltip={props.showTooltip}
					hideTooltip={props.hideTooltip}
					onTap={() => {
						props.hideTooltip();
					}}
				/>
			</Left>
			<Center>
				<CurrentPage>1 of 3</CurrentPage>
			</Center>
			<Right>
				<IconButton
					name={"help"}
					width={64}
					tooltipLabel="Help & Settings"
					tooltipShortcut="H"
					tooltipAlignment="MiddleLeft"
					showTooltip={props.showTooltip}
					hideTooltip={props.hideTooltip}
				/>
			</Right>
		</BottomBarWrap>
	);
};
