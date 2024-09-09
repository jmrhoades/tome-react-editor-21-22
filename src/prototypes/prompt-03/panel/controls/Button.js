import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../../ds/Icon";

export const buttonType = {
	ICON: "icon",
	LABEL: "label",
};

const Wrap = styled(motion.div)`
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	height: 30px;
	background: ${props => props.theme_background};
	//flex-basis: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	width: 100%;
`;

const Label = styled(motion.div)`
	line-height: 1;
	pointer-events: none;
	font-family: Inter, sans-serif;
	font-size: 13px;
	font-weight: 400;
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: ${props => props.theme_color};
`;



const variants = {
	active: {
		scale: 1,
	},
	pressing: {
		scale: 0.975,
	},
	hovering: {
		scale: 1,
	},
};

export const Button = props => {
	return (
		<Wrap
			theme_background={props.theme.colors.t2}
			key={props.id}
			variants={variants}
			whileHover={"hovering"}
			whileTap={"pressing"}
			onTap={props.onTap}
		>
			<SelectedBackground
				theme_color={props.theme.colors.t2}
				initial={{ opacity: 0 }}
				animate={{ opacity: props.active ? 1 : 0 }}
				whileHover={{ opacity: 1 }}
				transition={{
					type: "tween",
					duration: 0.2,
				}}
			/>

			{props.type === buttonType.ICON && (
				<Icon
					name={props.iconName}
					size={24}
					opacity={1}
					color={props.active ? props.theme.colors.t9 : props.theme.colors.t7}
					// animate={{ color: props.active ? props.theme.colors.t9 : props.theme.colors.t7 }}
					transition={{
						type: "tween",
						duration: props.active ? 0.4 : 0.2,
					}}
				/>
			)}

			{props.type === buttonType.LABEL && (
				<Label
					style={{ 
						...props.labelStyle, y: -0.5 }}
					animate={{ color: props.active ? props.theme.colors.t9 : props.theme.colors.t7 }}
					transition={{
						type: "tween",
						duration: props.active ? 0.4 : 0.2,
					}}
				>
					{props.label}
				</Label>
			)}
		</Wrap>
	);
};
