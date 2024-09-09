import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { TomeContext, transitions } from "../tome/TomeContext";
import { TitlebarSeenHeads } from "./TitlebarSeenHeads";
import { DiagramContext } from "../diagram/DiagramContext";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 56px;
	pointer-events: none;
	overflow: hidden;
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

const DiagramRight = styled(Right)`
	& > * {
		margin-left: 12px;
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
	const { enterFullscreen, setShowComments, showComments, clickCount } = useContext(TomeContext);
	const { setDiagramExpanded, diagramExpanded } = useContext(DiagramContext);
	return (
		<Wrap>
			<Left
				initial="visible"
				animate={diagramExpanded ? "hidden" : "visible"}
				variants={list}
				transition={transitions.layoutTransition}
			>
				<Button kind="icon" icon="ChevronLeft" to="/" />
				<TomeTitle onTap={diagramExpanded ? () => setDiagramExpanded(false) : null}>{props.title}</TomeTitle>
				<Button kind="icon" icon="More" height={28} minWidth={28} padding={"0 2px"} />
			</Left>

			<Right
				initial="visible"
				animate={diagramExpanded ? "hidden" : "visible"}
				variants={list}
				transition={transitions.layoutTransition}
			>
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
					withCount={3}
				/>
				<Button kind="link" type="default" size="lg" height={40} label="Share" />
				<Button kind="icon" icon="PlaybackPlay" onMouseUp={enterFullscreen} />
			</Right>

			<DiagramRight
				initial="hidden"
				animate={diagramExpanded ? "visible" : "hidden"}
				variants={list}
				transition={transitions.layoutTransition}
			>
				<Button kind="icon" icon="Share" />

				<Button kind="icon" icon="Diagram" />

				<Button
					kind="icon"
					icon="Clear"
					onMouseUp={e => {
						setDiagramExpanded(!diagramExpanded);
					}}
				/>
			</DiagramRight>
		</Wrap>
	);
};
