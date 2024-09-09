import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { gradients } from "../../../ds/Gradients";
import { Button } from "../../../ds/Button";
import { transitions } from "../../../ds/Transitions";

// import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { TitlebarSeenHeads } from "./TitlebarSeenHeads";
import { TitlebarProgressIndicator } from "./TitlebarProgressIndicator";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 10;
	height: 48px;

	/* background-color: rgba(0, 0, 0, 0.15); */
	/* backdrop-filter: blur(10px); */
`;

const NavBarScrim = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 72px;
`;

const Left = styled(motion.div)`
	position: absolute;

	/*
	left: 10px;
	top: 0;
	height: 100%;
	*/

	/*
	display: flex;
	align-items: center;
	pointer-events: auto;
	gap: 4px;

	font-weight: 500;
	font-size: 15px;
	line-height: 18px;
	color: rgba(255, 255, 255, 0.8);
	*/
`;

const BackButton = styled(motion.div)`
	position: absolute;
	top: 8px;
	left: 10px;
	pointer-events: auto;
`;

const AuthorImage = styled(motion.div)`
	position: absolute;
	top: 12px;
	left: 20px;
	width: 24px;
	height: 24px;
	border-radius: 100%;
	background: center / contain no-repeat url(/images/profile-pictures/jesse_chase.png);
`;

const AuthorName = styled(motion.div)`
	position: absolute;
	white-space: nowrap;
	top: 24px;
	left: 54px;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 16px;
	color: rgba(255, 255, 255, 0.6);
`;

const TitleContainer = styled(motion.div)`
	position: absolute;
	left: 54px;
	display: flex;
	/* align-items: center; */
`;
const Title = styled(motion.div)`
	white-space: nowrap;
	font-weight: 500;
	font-size: 15px;
	line-height: 20px;
	color: white;
`;
const TitleAccessory = styled(motion.div)`
	pointer-events: auto;
`;

const EnterPlayModeButton = styled(motion.div)`
	position: absolute;
	top: 8px;
	right: 10px;
	pointer-events: auto;
`;

const ExitPlayModeButton = styled(EnterPlayModeButton)``;

const ShareButton = styled(motion.div)`
	position: absolute;
	top: 8px;
	right: 58px;
`;

const CommentsButton = styled(motion.div)`
	position: absolute;
	top: 8px;
	right: 128px;
`;

const FullscreenButton = styled(CommentsButton)``;

const SeenHeads = styled(motion.div)`
	position: absolute;
	top: 14px;
	right: 192px;
`;

const PreferencesButton = styled(CommentsButton)`
	right: 176px;
`;

export const Titlebar = props => {
	const { isPlayMode, enterPlayMode, exitPlayMode } = useContext(TomeContext);

	const fade = transitions.playModeFade;
	const spring = transitions.playModeSpring;

	return (
		<Wrap>
			<NavBarScrim
				style={{
					background: gradients.scrims.z0Top,
				}}
			/>

			<BackButton animate={{ opacity: isPlayMode ? 0 : 1 }} transition={fade} initial={false}>
				<Button kind="icon" icon="ChevronLeft" to="/" height={32} />
			</BackButton>
			<AuthorImage
				animate={{ opacity: isPlayMode ? 1 : 0, scale: isPlayMode ? 1 : 0.75 }}
				transition={fade}
				initial={false}
			/>
			<AuthorName animate={{ opacity: isPlayMode ? 1 : 0 }} transition={fade} initial={false}>
				Jesse Chase
			</AuthorName>
			<TitleContainer
				transition={fade}
				initial={false}
				animate={{
					y: isPlayMode ? 6 : 14,
				}}
			>
				<Title
					style={{
						originX: 0,
						originY: 0,
					}}
					transition={fade}
					initial={false}
					animate={{
						scale: isPlayMode ? 0.939516129 : 1,
					}}
				>
					{props.title}
				</Title>
				<TitleAccessory
					transition={fade}
					initial={false}
					animate={{
						x: isPlayMode ? -12 : 0,
					}}
				>
					<Button kind="icon" icon="CaretDown" width={20} height={20} padding={0} />
				</TitleAccessory>
			</TitleContainer>

			<EnterPlayModeButton
				transition={fade}
				initial={false}
				animate={{
					
					opacity: isPlayMode ? 0 : 1,
				}}
			>
				<Button kind="icon" icon="PlaybackPlay" height={32} onTap={enterPlayMode} />
			</EnterPlayModeButton>
			<ExitPlayModeButton
				transition={spring}
				initial={false}
				animate={{
					scale: isPlayMode ? 1 : 0,
					opacity: isPlayMode ? 1 : 0,
				}}
			>
				<Button kind="icon" icon="Close" height={32} onTap={exitPlayMode} />
			</ExitPlayModeButton>

			<ShareButton>
				<Button kind="link" type="default" size="lg" height={32} label="Share" />
			</ShareButton>
			<CommentsButton
				transition={fade}
				initial={false}
				animate={{
					opacity: isPlayMode ? 0 : 1,
				}}
			>
				<Button
					kind="icon"
					icon="CommentFill"
					onTap={() => {
						//setShowComments(!showComments);
					}}
					withCount={3}
					height={32}
				/>
			</CommentsButton>

			<FullscreenButton
				transition={fade}
				initial={false}
				animate={{
					opacity: isPlayMode ? 1 : 0,
					scale: isPlayMode ? 1 : 0,
				}}
			>
				<Button kind="icon" icon="Fullscreen" height={32} />
			</FullscreenButton>

			<SeenHeads
				transition={fade}
				initial={false}
				animate={{
					opacity: isPlayMode ? 0 : 1,
				}}
			>
				<TitlebarSeenHeads />
			</SeenHeads>

			<PreferencesButton
				transition={fade}
				initial={false}
				animate={{
					opacity: isPlayMode ? 1 : 0,
					scale: isPlayMode ? 1 : 0,
				}}
			>
				<Button kind="icon" icon="Preferences" onMouseUp={enterPlayMode} height={32} />
			</PreferencesButton>

			<TitlebarProgressIndicator />
		</Wrap>
	);
};
