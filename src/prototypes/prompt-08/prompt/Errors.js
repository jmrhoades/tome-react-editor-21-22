import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { InputErrorStates } from "./Prompt";

const Wrap = styled(motion.div)`
	font-family: "Inter";
	font-size: 13px;
	line-height: 20px;
	width: 100%;
	position: relative;
`;

const Content = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
`;

const Title = styled(motion.div)``;

const Accessory = styled(motion.div)``;

const Button = styled(motion.div)`
	cursor: pointer;
`;

const Divider = styled(motion.div)`
	position: absolute;
	top: 0;
	left: -24px;
	right: -24px;
	height: 1px;
`;

export const Errors = props => {
	const colors = props.theme.colors;
	const [isHovering, setIsHovering] = React.useState(false);

	const isModeration = props.inputErrorState === InputErrorStates.MODERATION;
	const isUnknown = props.inputErrorState === InputErrorStates.UNKNOWN;

	let label = "We’re casting a lot of spells right now. Try again in a few minutes.";
	if (isModeration) label = "Out of moderation policy, rephrase and try again.";
	if (isUnknown) label = "Something went wrong, please try again.";

	return (
		<Wrap
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 44 }}
			exit={{ opacity: 0, height: 0 }}
			transition={props.transition}
		>
			<Divider style={{ backgroundColor: colors.t2, y: 11 }} />
			<Content
				style={{
					paddingTop: 24,
				}}
			>
				<Title
					style={{
						color: isModeration ? props.theme.colors.warning : props.theme.colors.warning,
					}}
				>
					{label}
				</Title>
				{/* {!isModeration && (
					<Accessory
						onHoverStart={e => {
							setIsHovering(true);
						}}
						onHoverEnd={e => {
							setIsHovering(false);
						}}
						style={{
							x: 10,
							display: "none",
						}}
					>
						<Button onTap={props.resubmit}>
							<Icon name="Retake" size={20} opacity={1} color={isHovering ? colors.t9 : colors.t6} />
						</Button>
					</Accessory>
				)} */}
				{/* {isModeration && <Icon name="Report" size={20} opacity={1} color={colors.warning} />} */}
			</Content>
		</Wrap>
	);
};
