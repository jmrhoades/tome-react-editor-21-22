import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Control = styled(motion.div)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: auto;
    user-select: auto;
	cursor: text;

`;

const Field = styled(motion.div)`
	position: relative;
    ::selection {
		background: ${props => props.t_selectioncolor};
        color: white;
	}
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

const ContainerVariants = {
	default: {
		scale: 1,
	},
	active: {
		scale: 1,
	},
	pressing: {
		scale: 1,
		transition: { duration: 0.08 },
	},
	hovering: {
		scale: 1,
	},
};

export const TitleField = ({
	theme,
	height = 32,
	borderRadius = 8,
	paddingX = 6,
	onTap = null,
	active = false,
	label = "Label",
	hasBackground = false,
}) => {
	const background = hasBackground ? theme.colors.t2 : theme.colors.t0;
	const backgroundHover = theme.colors.t3;

	const backgroundVariants = {
		default: {
			backgroundColor: background,
			transition: { type: "tween", duration: 0.5 },
		},
		hovering: {
			backgroundColor: backgroundHover,
			transition: { type: "tween", duration: 0.08 },
		},
	};

	return (
		<Control
			variants={ContainerVariants}
			initial={"default"}
			whileHover={"hovering"}
			//whileTap={"pressing"}
			
			style={{
				paddingLeft: paddingX,
				paddingRight: paddingX,
				height,
				borderRadius,
				background: theme.colors.controls.canvasMaterial,
				backdropFilter: "blur(30px)",
			}}
			//onTap={onTap}
		>
			<SelectedBackground variants={backgroundVariants} />

			<Field
                t_selectioncolor={theme.colors.text.selection}
				contentEditable={true}
				suppressContentEditableWarning={true}
				style={{
					color: theme.colors.t9,
					fontFamily: "Inter",
					fontStyle: "normal",
					fontWeight: 500,
					fontSize: "15px",
					lineHeight: "20px",
					caretColor: theme.colors.accent,
				}}
			>
				{label}
			</Field>
		</Control>
	);
};
