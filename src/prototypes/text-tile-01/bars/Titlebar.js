import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";

// import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { TitlebarSeenHeads } from "./TitlebarSeenHeads";
import { TitlebarProgressIndicator } from "./TitlebarProgressIndicator";
import { IconButton, LabelButton } from "../ds/Buttons";
import { TitleField } from "../ds/Fields";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 10;
	height: 48px;
`;

const EditorBar = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const PlayBar = styled(EditorBar)``;

const LeftGroup = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 10px;
	height: 100%;
	gap: 4px;
`;

const RightGroup = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 10px;
	height: 100%;
	gap: 8px;
`;

export const Titlebar = props => {
	const { isPlayMode, enterPlayMode, exitPlayMode, tomeData, currentPage } = useContext(TomeContext);

	const fade = transitions.playModeFade;


	return (
		<Wrap>
			<EditorBar
				initial={false}
				transition={fade}
				animate={{
					opacity: isPlayMode ? 0 : 1,
				}}
			>
				<LeftGroup
					style={{
						pointerEvents: isPlayMode ? "none" : "auto",
					}}
				>
					<IconButton icon="ChevronLeft" theme={currentPage.theme} to="/" width={32} />
					<TitleField label={tomeData.title} theme={currentPage.theme} />
				</LeftGroup>

				<RightGroup
					style={{
						pointerEvents: isPlayMode ? "none" : "auto",
					}}
				>
					<IconButton icon="PlaybackPlay" theme={currentPage.theme} height={32} onTap={enterPlayMode} />
					<IconButton icon="More" theme={currentPage.theme} />
					<LabelButton label="Share" theme={currentPage.theme} hasBackground={true} />
					<IconButton icon="CommentFill" theme={currentPage.theme} />
					<TitlebarSeenHeads theme={currentPage.theme} />
				</RightGroup>
			</EditorBar>
			<PlayBar
				initial={{ opacity: 0 }}
				transition={fade}
				whileHover={{ opacity: 1 }}
				style={{
					pointerEvents: !isPlayMode ? "none" : "auto",
				}}
			>
				<TitlebarProgressIndicator theme={currentPage.theme} />
				<RightGroup>
					<IconButton icon="Close" theme={currentPage.theme} height={32} onTap={exitPlayMode} />
				</RightGroup>
			</PlayBar>
		</Wrap>
	);
};
