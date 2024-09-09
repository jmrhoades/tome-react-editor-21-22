import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";

const Wrap = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	gap: 4px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	cursor: pointer;
`;

const IconContainer = styled(motion.div)`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
`;

const Label = styled(motion.div)`
	pointer-events: none;
`;

export const Minibar = props => {
	const colors = props.theme.colors;
	const [isHovering, setIsHovering] = React.useState(false);
    const foreground = colors.t75;
	return (
		<Wrap
			style={{
				height: 36,
			}}
		>
			<IconContainer>
				<Icon name="DoubleSparkle" opacity={1} color={foreground} size={18} />
			</IconContainer>
			<Label
				style={{
					color: foreground,
                    paddingRight: 5,
                    y: 0,
				}}
			>
				Create
			</Label>
		</Wrap>
	);
};
