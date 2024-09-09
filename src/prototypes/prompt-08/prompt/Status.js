import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { BuildStates, InputStates } from "./Prompt";
import { Spinner, SpinnerStates } from "./Spinner";
import { LabelButton } from "../ds/Buttons";

const Bar = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: absolute;
`;

const Label = styled(motion.div)`
	position: relative;
`;

const SpinnerWrap = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ButtonGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	gap: 8px;
`;

const labelStyle = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
};


export const Status = props => {
	const colors = props.theme.colors;

	return (
		<Bar
			layout
			style={{
				...props.barBackgroundStyles,
				padding: "20px",
				gap: 32,
				minWidth: 280,
			}}
			initial={{
				opacity: 0,
				scale: 0.9,
			}}
			animate={{
				opacity: 1,
				scale: 1,
			}}
			exit={{
				opacity: 0,
				scale: 1,
			}}
			transition={props.transition}
		>
			<Label
				layout="position"
				transition={props.transition}
				style={{
					...labelStyle,
					lineHeight: "24px",
					fontSize: "15px",
					color: colors.t9,
				}}
			>
				{props.statusText}
			</Label>
			<AnimatePresence>
				{props.buildState !== BuildStates.REVIEW && (
					<SpinnerWrap
						style={{ height: 28 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={props.transition}
					>
						<Spinner
							theme={props.theme}
							state={props.buildState === BuildStates.FINISHED ? BuildStates.FINISHED : BuildStates.WAITING}
							size={26}
						/>
					</SpinnerWrap>
				)}

				{props.buildState === BuildStates.REVIEW && (
					<ButtonGroup
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={props.transition}
					>
						<LabelButton
							label="Try again"
							//icon="TwoArrowCirclePathCounterclockwise"
							//iconSize={16}
							theme={props.theme}
							height={28}
							width={84}
							fontSize={13}
							backgroundColor={props.theme.colors.t2}
							labelColor={props.theme.colors.t7}
							borderRadius={8}
							onTap={() => {
								props.tryAgain();
							}}
							style={{
								pointerEvents: "auto",
							}}
						/>
						<LabelButton
							label="Keep"
							//icon="Checkmark"
							//iconSize={16}
							//width={104}
							theme={props.theme}
							height={28}
							width={84}
							fontSize={13}
							backgroundColor={props.theme.colors.t2}
							labelColor={props.theme.colors.t7}
							borderRadius={8}
							onTap={()=>{props.accept()}}
							style={{
								pointerEvents: "auto",
							}}
						/>
					</ButtonGroup>
				)}
			</AnimatePresence>
		</Bar>
	);
};
