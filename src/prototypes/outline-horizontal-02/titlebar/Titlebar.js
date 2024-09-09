import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { TomeContext } from "../tome/TomeContext";
import { TitlebarSeenHeads } from "./TitlebarSeenHeads";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 56px;
	pointer-events: none;
`;

const Left = styled(motion.div)`
	position: absolute;
	left: 8px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: auto;
`;

const TomeTitle = styled(motion.div)`
	font-weight: 500;
	font-size: 15px;
	line-height: 18px;
	color: rgba(255, 255, 255, 0.8);
	padding: 0 4px 0 4px;
	cursor: text;
`;

const Right = styled(motion.div)`
	position: absolute;
	right: 12px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: auto;
	& > * {
		margin-left: 12px;
	}
`;

export const Titlebar = props => {
	const { enterFullscreen, setShowComments, showComments, clickCount } = useContext(TomeContext);

	return (
		<Wrap>
			<Left>
				<Button kind="icon" icon="ChevronLeft" to="/" />

				<TomeTitle>Tome Demo 3</TomeTitle>

				<Button kind="icon" icon="More" height={28} minWidth={28} padding={"0 2px"}/>
			</Left>

			<Right>
				<TitlebarSeenHeads />
				<Button
					kind="icon"
					icon="CommentFill"
					selected={showComments}
					onTap={() => {
						clickCount.set(Math.random());
						setShowComments(!showComments);
					}}
					withBadge={true}
					withCount={13}
				/>

				<Button kind="link" type="default" size="lg" height={40} label="Share" />
				<Button kind="icon" icon="ExpandFlipped" onMouseUp={enterFullscreen} />
			</Right>
		</Wrap>
	);
};
