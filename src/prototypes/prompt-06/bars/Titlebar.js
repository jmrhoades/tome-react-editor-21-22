import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../ds/Transitions";

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
	gap: 8px;
`;

const BrandingContainer = styled(motion.div)`
	position: absolute;
`;
const BrandingAsset = styled(motion.div)`
	img {
		display: block;
	}
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
	margin-top: -2px;
`;

const RightInnerGroup = styled(motion.div)`
	position: relative;
`;

export const Titlebar = props => {
	const {
		isPlayMode,
		enterPlayMode,
		exitPlayMode,
		tomeData,
		currentPage,
		menuInfo,
		setMenuInfo,
		sidePanelOpen,
		setSidePanelOpen,
		setContextMenuInfo,
		setShowContextMenu,
		isGenerating,
	} = useContext(TomeContext);

	const fade = transitions.basic;
	const [isHovering, setIsHovering] = React.useState(true);

	return (
		<Wrap
		animate={{
			opacity: isGenerating ? 0.25 : 1,
		}}
		onContextMenu={e => {
		

			setContextMenuInfo({
				x: e.clientX,
				y: e.clientY,
				items: ["Dynamic Background"],
			});
			setShowContextMenu(true);

			e.preventDefault();
		}}
		>
			<EditorBar
				animate={{
					opacity: !isPlayMode ? 1 : isHovering ? 1 : 0,
				}}
				onHoverStart={() => {
					setIsHovering(true);
				}}
				onHoverEnd={() => {
					setIsHovering(false);
				}}
				style={{
					pointerEvents: "auto",
				}}
			>
				<LeftGroup
					style={{
						pointerEvents: isPlayMode ? "none" : "auto",
					}}
					initial={false}
					transition={fade}
					animate={{
						opacity: isPlayMode ? 0 : 1,
					}}
				>
					<IconButton icon="ChevronLeft" theme={currentPage.theme} to="/" width={32} />
					<TitleField label={tomeData.title} theme={currentPage.theme} />
				</LeftGroup>

				<BrandingContainer
					style={{
						pointerEvents: !isPlayMode ? "none" : "auto",
						height: 24,
						width: 128,
						// background: "red",
						top: 12,
						left: 16,
					}}
					initial={false}
					transition={fade}
					animate={{
						opacity: !isPlayMode ? 0 : 1,
					}}
				>
					<motion.img
						height="24"
						src="/logos/tome-combo-mark-horizontal-dark-mode.svg"
						alt=""
						style={{ opacity: currentPage.theme.mode === "light" ? 0 : 1 }}
					/>
					<motion.img
						height="24"
						src="/logos/tome-combo-mark-horizontal-light-mode.svg"
						alt=""
						style={{ opacity: currentPage.theme.mode === "light" ? 1 : 0, position: "absolute", top: 0, left: 0 }}
					/>
				</BrandingContainer>

				<TitlebarProgressIndicator theme={currentPage.theme} />

				<RightGroup>
					<RightInnerGroup>
						<RightInnerGroup
							style={{
								pointerEvents: isPlayMode ? "none" : "auto",
							}}
							initial={false}
							transition={fade}
							animate={{
								opacity: isPlayMode ? 0 : 1,
							}}
						>
							<IconButton icon="PlaybackPlay" theme={currentPage.theme} height={32} onTap={enterPlayMode} />
						</RightInnerGroup>
						<RightInnerGroup
							style={{
								pointerEvents: !isPlayMode ? "none" : "auto",
								position: "absolute",
								top: 0,
							}}
							initial={false}
							transition={fade}
							animate={{
								opacity: !isPlayMode ? 0 : 1,
							}}
						>
							<IconButton icon="Close" theme={currentPage.theme} height={32} onTap={exitPlayMode} />
						</RightInnerGroup>
					</RightInnerGroup>

					<IconButton
						icon="More"
						theme={currentPage.theme}
						active={menuInfo.show}
						activeColor={currentPage.theme.colors.controls.icon}
						onTap={e => {
							if (sidePanelOpen) setSidePanelOpen(false);
							menuInfo.show = true;
							menuInfo.x = window.innerWidth - 276;
							menuInfo.y = 54;
							setMenuInfo({ ...menuInfo });
						}}
					/>
					<LabelButton label="Share" theme={currentPage.theme} />

					<RightInnerGroup
						style={{
							pointerEvents: isPlayMode ? "none" : "auto",
						}}
						initial={false}
						transition={fade}
						animate={{
							opacity: isPlayMode ? 0 : 1,
						}}
					>
						<IconButton icon="CommentFill" theme={currentPage.theme} />
						{/* <TitlebarSeenHeads theme={currentPage.theme} /> */}
					</RightInnerGroup>
				</RightGroup>
			</EditorBar>
			{/* <PlayBar
				initial={{ opacity: 0 }}
				transition={fade}
				whileHover={{ opacity: 1 }}
				style={{
					pointerEvents: !isPlayMode ? "none" : "auto",
				}}
			>
				<TitlebarProgressIndicator theme={currentPage.theme} />
				<RightGroup></RightGroup>
			</PlayBar> */}
		</Wrap>
	);
};
