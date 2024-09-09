import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
//import { TomeContext } from "../tome/TomeContext";
//import { makeTome } from "./PromptScript";
//import { LoadingIndicator } from "../ds/LoadingIndicator";
//import { SuccessIndicator } from "../ds/SuccessIndicator";
//import { PromptPlaceholders } from "./PromptPlaceholders";
//import { Suggestions } from "./Suggestions";
import { Icon } from "../../../ds/Icon";

const Bar = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px 24px;
	gap: 0px;
	width: 100%;
	position: absolute;
	top: 22px;
	left: 0;
`;

const ChipWrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	/* padding: 4px 6px;
	border-radius: 6px; */

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	/* font-style: italic; */

	/* cursor: pointer; */
`;

const Button = styled(motion.div)`
	position: absolute;
	right: 50px;
	top: 0;
	cursor: pointer;
`;

const Shortcut = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	position: absolute;
	right: 20px;
	top: 0;
`;

const IconWrap = styled(motion.div)`
	position: absolute;
	left: 2px;
	top: 0;
`;

const transition = {
ease: "easeOut",
duration: 0.2,
};



export const ChipBar = props => {
	const colors = props.theme.colors;

	return (
		<Bar animate={{  y: props.show ? 0 : -8 }} transition={transition}>
			<ChipWrap
				animate={{ color: props.show ? colors.t7 : colors.t6, fontSize: props.show ? "20px" : "13px" }}
				initial={false}
				transition={transition}
			>
				{props.chipText}
			</ChipWrap>
			<Shortcut
				animate={{ color: props.show ? colors.t6 : colors.t5, fontSize: props.show ? "20px" : "13px" }}
				initial={false}
				transition={transition}
				style={{
					color: props.theme.colors.t6,
				}}
			>
				⌘K
			</Shortcut>
			{/* <CloseButton theme={props.theme} setPromptIsOpen={props.setPromptIsOpen} show={props.show} /> */}
		</Bar>
	);
};

const CloseButton = props => {
	const [isHovering, setIsHovering] = React.useState(false);
	const colors = props.theme.colors;
	return (
		<Button
			transition={transition}
			onTap={() => {
				props.setPromptIsOpen(false);
			}}
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
		>
			
			<IconWrap initial={"default"} transition={transition} animate={{ opacity: isHovering ? 1 : 0 }}>
				<Icon name="Close" opacity={1} color={props.theme.colors.t6} size={20} />
			</IconWrap>
		</Button>
	);
};
