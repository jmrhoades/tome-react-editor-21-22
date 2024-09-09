import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

import { colors } from "../ds/Colors";
import { metricConstants } from "../tome/MetricsContext";
import { transitions } from "../../../ds/Transitions";

const Container = styled(motion.div)`
	display: flex;
	flex-direction: column;
	/* align-items: flex-start; */
	padding: 12px;
	gap: 12px;

	pointer-events: auto;
`;

const Title = styled(motion.div)``;

export const Section = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const SectionTitle = props => {
	return (
		<div
			style={{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 400,
				fontSize: "11px",
				lineHeight: "14px",
				color: props.theme.colors.t7,
			}}
		>
			{props.children}
		</div>
	);
};

export const ControlGroup = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const ColorRow = styled(motion.div)`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

export const ButtonStack = styled(motion.div)`
	/*
    display: flex;
	flex-direction: row;
    flex-wrap: wrap;
	gap: 6px;
    */

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 6px;
`;

export const ButtonPair = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 6px;
`;

export const PanelContainer = props => {
	return (
		<Container
			key={"panel_container"}
			style={{
				background: props.theme.colors.backgrounds.panel,
				borderRadius: 16,
				width: metricConstants.cPanelWidth,
				boxShadow: props.theme.shadows.medium,
			}}
			exit={{
				x: 72,
				scale: 0.9,
				opacity: 0,
				transition: {
					duration: 0.15,
				},
			}}
			initial={{
				x: 72,
				scale: 0.9,
				opacity: 0,
				
			}}
			animate={{
				x: 0,
				scale: 1,
				opacity: 1,
			}}
			transition={{
				scale: {
					type: "spring",
					stiffness: 450,
					damping: 40,
				},
				x: {
					type: "spring",
					stiffness: 450,
					damping: 40,
				},
				opacity: {
					type: "tween",
					ease: "easeOut",
					duration: 0.2,
				},
			}}
			// transition={transitions.layoutTransition}
		>
			<Title
				style={{
					fontFamily: "Inter",
					fontStyle: "normal",
					fontWeight: 700,
					fontSize: "15px",
					lineHeight: "20px",
					color: props.theme.colors.t9,
				}}
			>
				{props.name}
			</Title>
			{props.children}
		</Container>
	);
};
