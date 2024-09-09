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

const TomeTitle = styled(motion.div)`

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
		margin-left: 8px;
	}
`;

const Slash = styled(motion.div)`
	padding: 0 8px;
	color: rgba(255, 255, 255, 0.4);
`;

const Breadcrumb = styled(motion.div)`
	padding: 0 4px 0 0;
`;

const DiagramRight = styled(Right)`
	& > * {
		margin-left: 12px;
	}
`;

const list = {
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.02,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			staggerChildren: 0.01,
		},
	},
};

const item = {
	visible: { opacity: 1, y: 0 },
	hidden: { opacity: 0, y: -100 },
};

export const Titlebar = props => {
	const { enterFullscreen, setShowComments, showComments, clickCount } = useContext(TomeContext);
	const { setDiagramExpanded, diagramExpanded } = useContext(DiagramContext);
	return (
		<Wrap>
			<Left>
				<Button kind="icon" icon="ChevronLeft" to="/" />

				<TomeTitle onTap={diagramExpanded ? () => setDiagramExpanded(false) : null}>{props.title}</TomeTitle>

				<motion.div
					style={{
						overflow: "hidden",
					}}
					animate={{
						width: diagramExpanded ? 97 : 0,
						opacity: diagramExpanded ? 1 : 0,
					}}
					initial={{
						width: 0,
						opacity: 0,
					}}
					transition={transitions.layoutTransition}
				>
					<motion.div
						style={{
							display: "flex",
							width: 97,
						}}
					>
						<Slash>/</Slash>
						<Breadcrumb>Diagram 1</Breadcrumb>
					</motion.div>
				</motion.div>

				<Button kind="icon" icon="More" height={28} minWidth={28} padding={"0 2px"} />
			</Left>

			<Right
				initial="visible"
				animate={diagramExpanded ? "hidden" : "visible"}
				variants={list}
				transition={transitions.layoutTransition}
			>
				<motion.div variants={item} transition={transitions.layoutTransition}>
					<TitlebarSeenHeads />
				</motion.div>
				<motion.div variants={item} transition={transitions.layoutTransition}>
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
				</motion.div>
				<motion.div variants={item} transition={transitions.layoutTransition}>
					<Button kind="link" type="default" size="lg" height={40} label="Share" />
				</motion.div>
				<motion.div variants={item} transition={transitions.layoutTransition}>
					<Button kind="icon" icon="ExpandFlipped" onMouseUp={enterFullscreen} />
				</motion.div>
			</Right>

			<DiagramRight
				initial="hidden"
				animate={diagramExpanded ? "visible" : "hidden"}
				variants={list}
				transition={transitions.layoutTransition}
			>
				<motion.div variants={item} transition={transitions.layoutTransition}>
					<Button kind="icon" icon="Share" />
				</motion.div>
				<motion.div variants={item} transition={transitions.layoutTransition}>
					<Button kind="icon" icon="Diagram" />
				</motion.div>
				<motion.div variants={item} transition={transitions.layoutTransition}>
					<Button
						kind="icon"
						icon="Clear"
						onMouseUp={e => {
							setDiagramExpanded(!diagramExpanded);
						}}
					/>
				</motion.div>
			</DiagramRight>
		</Wrap>
	);
};
