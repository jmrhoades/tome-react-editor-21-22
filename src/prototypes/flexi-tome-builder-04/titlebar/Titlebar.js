import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useViewportScroll, useTransform } from "framer-motion";

// import { colors } from "../../../ds/Colors";
import { Button } from "../../../ds/Button";
import { transitions } from "../../../ds/Transitions";

import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { TitlebarSeenHeads } from "./TitlebarSeenHeads";

export const TitleBarHeight = 56;

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 10;
	

	/* background-color: rgba(0, 0, 0, 0.15); */
	/* backdrop-filter: blur(10px); */
`;

const NavBarScrim = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 112px;
	background: linear-gradient(
		to bottom,
		hsl(0, 0%, 0%) 0%,
		hsla(0, 0%, 0%, 0.987) 8.1%,
		hsla(0, 0%, 0%, 0.951) 15.5%,
		hsla(0, 0%, 0%, 0.896) 22.5%,
		hsla(0, 0%, 0%, 0.825) 29%,
		hsla(0, 0%, 0%, 0.741) 35.3%,
		hsla(0, 0%, 0%, 0.648) 41.2%,
		hsla(0, 0%, 0%, 0.55) 47.1%,
		hsla(0, 0%, 0%, 0.45) 52.9%,
		hsla(0, 0%, 0%, 0.352) 58.8%,
		hsla(0, 0%, 0%, 0.259) 64.7%,
		hsla(0, 0%, 0%, 0.175) 71%,
		hsla(0, 0%, 0%, 0.104) 77.5%,
		hsla(0, 0%, 0%, 0.049) 84.5%,
		hsla(0, 0%, 0%, 0.013) 91.9%,
		hsla(0, 0%, 0%, 0) 100%
	);
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
	const { pageTop } = useContext(MetricsContext).metrics;

	const { scrollY } = useViewportScroll();
	const scrimOpacity = useTransform(scrollY, [0, 144], [0, 0.75]);
	const barY = useTransform(scrollY, [pageTop - 56, pageTop], [0, 0]);

	// console.log(scrollY)

	return (
		<Wrap
			style={{
				height: TitleBarHeight,
				y: barY,
				// backgroundColor: colors.z0,
			}}
		>
			<NavBarScrim style={{ opacity: scrimOpacity }} />

			<Left initial="visible" variants={list} transition={transitions.layoutTransition}>
				<Button kind="icon" icon="ChevronLeft" to="/" />
				<TomeTitle>{props.title}</TomeTitle>
				<Button kind="icon" icon="More" height={28} minWidth={28} padding={"0 2px"} />
			</Left>

			<Right initial="visible" variants={list} transition={transitions.layoutTransition}>
				<TitlebarSeenHeads />
				<Button kind="link" type="default" size="lg" height={40} label="Share" />
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

				<Button kind="icon" icon="PlaybackPlay" onMouseUp={enterFullscreen} />
			</Right>
		</Wrap>
	);
};
