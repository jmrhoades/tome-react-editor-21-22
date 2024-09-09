import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { BuildStates, InputStates } from "./Prompt";
import { Spinner, SpinnerStates } from "./Spinner";

const Bar = styled(motion.div)`
	position: absolute;
	bottom: 80px;
	left: 50%;
`;

const Content = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const Label = styled(motion.div)`
	position: relative;
	width: 100%;
`;

const MotionLabel = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
`;

// const item = {
// 	start: { y: 10, opacity: 0 },
// 	enter: { y: 0, opacity: 1 },
// 	exit: { y: -10, opacity: 0 },
// };

export const Status = props => {
	const colors = props.theme.colors;

	const inputStyle = {
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "17px",
		lineHeight: "26px",
	};

	//const label1Animation = useAnimation();

	//const show = props.inputState === InputStates.HIDING && props.promptIsOpen;

	return (
		<Bar
			//animate={{ }}
			//transition={props.transition}
			//initial={false}
			style={{
				...inputStyle,
				...props.barBackgroundStyles,
				width: 320,
				padding: "20px 24px",
				x: "-50%",
				pointerEvents: "none",
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
				scale: 0.9,
			}}
		>
			<Content style={{ height: 26, overflow: "hidden" }}>
				<Label
					initial={false}
					animate={{
						color: colors.t9,
					}}
				>
					{props.statusText}

					{/* <MotionLabel
						key="waiting"
						variants={item}
						animate={props.buildState === BuildStates.WAITING ? "enter" : "exit"}
						initial={"start"}
					>
						{props.waitingText}
					</MotionLabel>
					<MotionLabel
						key="progress"
						animate={props.buildState === BuildStates.BUILDING ? "enter" : "exit"}
						initial={"start"}
					>
						{props.statusText}
					</MotionLabel>
					<MotionLabel
						key="finished"
						animate={props.buildState === BuildStates.FINISHED ? "enter" : "exit"}
						initial={"start"}
					>
						{props.finishedText}
					</MotionLabel> */}
				</Label>

				<Spinner theme={props.theme} state={props.buildState} size={26} />
			</Content>
		</Bar>
	);
};
