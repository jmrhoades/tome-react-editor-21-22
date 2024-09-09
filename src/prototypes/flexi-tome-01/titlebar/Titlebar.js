import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { transitions } from "../../../ds/Transitions";
import { TomeContext } from "../tome/TomeContext";
import { TitlebarSeenHeads } from "./TitlebarSeenHeads";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	height: 56px;
	pointer-events: none;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.15);
	/* backdrop-filter: blur(10px); */
`;

const Left = styled(motion.div)`
	position: absolute;
	left: 8px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: auto;

	font-weight: 500;
	font-size: 15px;
	line-height: 18px;
	color: rgba(255, 255, 255, 0.8);
`;

const TomeTitle = styled(motion.div)``;

const Right = styled(motion.div)`
	position: absolute;
	right: 12px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: auto;
	& > * {
		margin-left: 8px;
	}
`;

const list = {
	visible: {
		opacity: 1,
	},
	hidden: {
		opacity: 0,
	},
};

export const Titlebar = props => {
	const { enterFullscreen } = useContext(TomeContext);

	return (
		<Wrap
			style={{
				
			}}
		>
			<Left initial="visible" variants={list} transition={transitions.layoutTransition}>
				<Button kind="icon" icon="ChevronLeft" to="/" />
				<TomeTitle>{props.title}</TomeTitle>
				<Button kind="icon" icon="More" height={28} minWidth={28} padding={"0 2px"} />
			</Left>

			<Right initial="visible" variants={list} transition={transitions.layoutTransition}>
				<TitlebarSeenHeads />
				<Button
					kind="icon"
					icon="CommentFill"
					//selected={showComments}
					onTap={() => {
						//setShowComments(!showComments);
					}}
					withBadge={true}
					withCount={3}
				/>
				<Button kind="link" type="default" size="lg" height={40} label="Share" />
				<Button kind="icon" icon="PlaybackPlay" onMouseUp={enterFullscreen} />
			</Right>
		</Wrap>
	);
};
