import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { InputStates } from "./Prompt";

const Wrap = styled(motion.div)`
	font-family: "Inter";
	font-size: 15px;
	line-height: 20px;
	width: 100%;
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

const transition = {
	type: "spring",
	bounce: 0,
	duration: 0.2,
};

export const Errors = props => {
	const colors = props.theme.colors;
	const [isHovering, setIsHovering] = React.useState(false);
	const infoOpacity = useMotionValue(0);

	const isModeration = props.inputState === InputStates.MODERATION;
    const label = isModeration ? "Out of moderation policy, rephrase and try again" : "Something went wrong, please try again"
	return (
		<Wrap
			transition={transition}
			animate={{ opacity: props.show ? 1 : 0, height: props.show ? 24 : 0 }}
			initial={false}
		>
			<Content
				style={{
					paddingTop: 8,
				}}
			>
				<Title
					style={{
						color: isModeration ? props.theme.colors.warning : props.theme.colors.t7,
					}}
				>
					{label}
				</Title>
				{!isModeration && (
					<Accessory
						onHoverStart={e => {
							setIsHovering(true);
						}}
						onHoverEnd={e => {
							setIsHovering(false);
						}}
						style={{}}
					>
						<Button onTap={props.resubmit}>
							<Icon
								name="Retake"
								size={20}
								opacity={1}
								color={isHovering ? props.theme.colors.t8 : props.theme.colors.t7}
							/>
						</Button>
					</Accessory>
				)}
				{isModeration && <Icon name="Report" size={20} opacity={1} color={props.theme.colors.warning} />}
			</Content>
		</Wrap>
	);
};
