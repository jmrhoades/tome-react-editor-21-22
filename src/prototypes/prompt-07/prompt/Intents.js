import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { InputStates } from "./Prompt";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 24px;

	width: 100%;
`;

const IntentWrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
    gap: 4px;
`;

const Label = styled(motion.div)`
	font-family: "Inter";
	font-size: 11px;
	line-height: 22px;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.24px;
`;

const Button = styled(motion.div)`
	cursor: pointer;
`;

const transition = {
	type: "spring",
	bounce: 0,
	duration: 0.2,
};

export const Intents = props => {
	const colors = props.theme.colors;

	return (
		<Wrap
			style={{
				paddingTop: 16,
			}}
		>
			<Intent label="PITCH DECK" theme={props.theme} />
			<Intent label="XL" theme={props.theme} />
			<Intent label="FRIENDLY" theme={props.theme} />
			<Intent label="CYBERPUNK IMAGERY" theme={props.theme} />
		</Wrap>
	);
};

export const Intent = props => {
	const colors = props.theme.colors;

	return (
		<IntentWrap>
			<Label
				style={{
					color: colors.t7,
				}}
			>
				{props.label}
			</Label>
			<Icon name="Dropdown" size={12} opacity={1} color={colors.t7} />
		</IntentWrap>
	);
};
