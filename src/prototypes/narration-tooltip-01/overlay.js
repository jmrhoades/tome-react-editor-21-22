import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const AVWrap = styled(motion.div)`
	position: relative;
`;

const AV = styled(motion.div)`
	width: 64px;
	height: 64px;
	border-radius: 32px;
	overflow: hidden;
	background-image: url("/images/narration-mobile-overlay-still-01.png");
	background-size: 64px 64px;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.08);
	cursor: pointer;
	/* border: 1px solid rgba(255, 255, 255, 0.08); */
`;

const AVVideo = styled(motion.video)`
	display: block;
	width: 100%;
	height: 100%;
`;

const AVTooltipWrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const AVTooltip = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 11px 12px 10px;
	gap: 4px;

	background: #333333;
	box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
`;
const AVTLabel = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 500;
	font-size: 15px;
	line-height: 20px;
	color: #ffffff;
	white-space: nowrap;
`;

const AVIconVideo = styled(motion.video)`
	display: block;
	width: 20px;
	height: 20px;
`;

export const Overlay = props => {
	const isRight = true;
	const [showTooltip, setShowTooltip] = React.useState(true);
	const avVideoRefA = React.useRef(null);
	const [avVideoAIsTapped, setAVVideoAIsTapped] = React.useState(false);

	const [isPlaying, setIsPlaying] = React.useState(props.autoPlay ? true : false);
	const [isPaused, setIsPaused] = React.useState(false);
	const [currentTime, setCurrentTime] = React.useState(false);
	const [duration, setDuration] = React.useState(false);

	return (
		<Wrap
			style={{
				x: isRight ? 390 - 64 - 12 : 12,
				y: 136,
			}}
		>
			<AVWrap initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", bounce: 0.4 }}>
				<AV
					whileTap={{ scale: 0.95 }}
					animate={{ scale: isPlaying ? 1.1 : 1 }}
					onTap={() => {
						if (!avVideoAIsTapped) {
							setShowTooltip(false);
							setAVVideoAIsTapped(true);
							if (avVideoRefA.current) {
								avVideoRefA.current.play();
								setIsPlaying(true);
							}
						} else {
							if (isPlaying) {
								if (avVideoRefA.current) {
									avVideoRefA.current.pause();
									setIsPlaying(false);
								}
							} else {
								if (avVideoRefA.current) {
									avVideoRefA.current.play();
									setIsPlaying(true);
								}
							}
						}
					}}
				>
					<AVVideo
						playsInline
						preload="true"
						ref={avVideoRefA}
						animate={{
							opacity: avVideoAIsTapped ? 1 : 0,
						}}
					>
						<source src="/images/aforox/Cube_AForOX.mp4" type="video/mp4" />
					</AVVideo>
				</AV>
			</AVWrap>
			<AVTooltipWrap
				style={{
					x: isRight ? "calc(-100% - 12px)" : 76,
					y: 12,
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: showTooltip ? 1 : 0, scale: showTooltip ? 1 : 0.9 }}
				transition={
					showTooltip
						? { delay: 2.5, duration: 0.5, type: "tween", ease: "easeOut" }
						: { duration: 0.15, type: "tween" }
				}
			>
				<AVTooltip
					animate={{ x: [isRight ? -10 : 10, 0, isRight ? -10 : 10] }}
					transition={{ repeat: Infinity, type: "spring", duration: 3 }}
				>
					<AVTLabel>Tap to play narration </AVTLabel>

					{/* <AVIconVideo
									height="20"
									width="20"
									playsInline
									muted
									autoPlay
									preload="true"
									loop
									style={{
										mixBlendMode: "screen",
									}}
								>
									<source src="/videos/sound01_4.mp4" type="video/mp4" />
								</AVVideo> */}

					{/* <svg width="20" height="20" viewBox="0 0 20 20">
						<path
							d="M2.18801 7.19636C1.67013 7.19623 1.25018 7.61597 1.25 8.13386L1.25 11.8844C1.25014 12.4023 1.67008 12.822 2.18797 12.8219H3.90903C4.24055 12.8219 4.55853 12.9534 4.7931 13.1877L7.3693 15.7611C7.48654 15.8782 7.64545 15.944 7.81116 15.9441C8.15672 15.9443 8.43699 15.6643 8.43716 15.3188V4.69689C8.43707 4.53127 8.3713 4.37245 8.25427 4.25526C8.01018 4.01085 7.61417 4.01058 7.36976 4.25467L4.79095 6.83051C4.5564 7.06478 4.23845 7.19636 3.90695 7.19636H2.18801Z"
							fill="white"
						/>
						<motion.path
							d="M10.25 5.85303C11.866 6.53578 13 8.1355 13 10.0001C13 11.8647 11.866 13.4644 10.25 14.1471"
							fill="none"
							stroke="rgba(255,255,255,1.0)"
							strokeWidth="1.5"
							animate={{ opacity: [0, 1, 1, 0] }}
							transition={{ times: [0.19, 0.2, 0.4, 0.41], duration: 3, repeat: Infinity, type: "linear" }}
						/>
						<motion.path
							d="M12.5 4.25464C14.3135 5.51958 15.5 7.6212 15.5 9.99995C15.5 12.3787 14.3135 14.4803 12.5 15.7453"
							fill="none"
							stroke="rgba(255,255,255,1.0)"
							strokeWidth="1.5"
							animate={{ opacity: [0, 1, 1, 0] }}
							transition={{ times: [0.39, 0.4, 0.6, 0.61], duration: 3, repeat: Infinity, type: "linear" }}
						/>
						<motion.path
							d="M14.6396 2.75C16.6955 4.4926 18.0003 7.09391 18.0003 10C18.0003 12.9061 16.6955 15.5074 14.6396 17.25"
							fill="none"
							stroke="rgba(255,255,255,1.0)"
							strokeWidth="1.5"
							animate={{ opacity: [0, 1, 1, 0] }}
							transition={{ times: [0.59, 0.6, 0.8, 0.81], duration: 3, repeat: Infinity, type: "linear" }}
						/>
					</svg> */}

					<svg width="20" height="20" viewBox="0 0 64 64">
						<path
							d="M7.00164 23.0284C5.3444 23.028 4.00057 24.3712 4 26.0284L4.00001 38.0301C4.00045 39.6874 5.34425 41.0305 7.00151 41.0301H12.5089C13.5698 41.03 14.5873 41.4511 15.3379 42.2007L23.5817 50.4357C23.9569 50.8104 24.4654 51.021 24.9957 51.0213C26.1015 51.0218 26.9984 50.1259 26.9989 49.0201V15.0301C26.9986 14.5002 26.7882 13.9919 26.4137 13.6169C25.6326 12.8348 24.3654 12.834 23.5832 13.615L15.331 21.8577C14.5805 22.6074 13.5631 23.0285 12.5022 23.0284H7.00164Z"
							fill="white"
						/>
						<motion.path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M30.5893 17.7952C31.1051 16.5742 32.5131 16.0026 33.7341 16.5185C39.7623 19.0654 44 25.0349 44 31.9998C44 38.9646 39.7623 44.9342 33.7341 47.4811C32.5131 47.997 31.1051 47.4254 30.5893 46.2044C30.0734 44.9834 30.645 43.5754 31.866 43.0595C36.18 41.2368 39.2 36.9682 39.2 31.9998C39.2 27.0313 36.18 22.7627 31.866 20.94C30.645 20.4241 30.0734 19.0161 30.5893 17.7952Z"
							fill="white"
							animate={{ opacity: [0, 1, 1, 0] }}
							transition={{ times: [0.19, 0.2, 0.4, 0.41], duration: 3, repeat: Infinity, type: "linear" }}
						/>
						<motion.path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M38.0314 12.2418C38.7897 11.1546 40.2857 10.8881 41.3729 11.6464C47.7919 16.1238 51.9998 23.5702 51.9998 31.9998C51.9998 40.4294 47.7919 47.8758 41.3729 52.3532C40.2857 53.1116 38.7897 52.845 38.0314 51.7578C37.2731 50.6707 37.5396 49.1747 38.6268 48.4164C43.814 44.7981 47.1998 38.7942 47.1998 31.9998C47.1998 25.2054 43.814 19.2015 38.6268 15.5833C37.5396 14.8249 37.2731 13.3289 38.0314 12.2418Z"
							fill="white"
							animate={{ opacity: [0, 1, 1, 0] }}
							transition={{ times: [0.39, 0.4, 0.6, 0.61], duration: 3, repeat: Infinity, type: "linear" }}
						/>
						<motion.path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M45.0151 7.2481C45.8721 6.23699 47.3866 6.11211 48.3977 6.96918C55.4913 12.982 60 21.9657 60 32C60 42.0342 55.4913 51.0179 48.3977 57.0307C47.3866 57.8878 45.8721 57.7629 45.0151 56.7518C44.158 55.7407 44.2829 54.2262 45.294 53.3692C51.3576 48.2294 55.2 40.5646 55.2 32C55.2 23.4353 51.3576 15.7705 45.294 10.6307C44.2829 9.77366 44.158 8.25921 45.0151 7.2481Z"
							fill="white"
							animate={{ opacity: [0, 1, 1, 0] }}
							transition={{ times: [0.59, 0.6, 0.8, 0.81], duration: 3, repeat: Infinity, type: "linear" }}
						/>
					</svg>
				</AVTooltip>
			</AVTooltipWrap>
		</Wrap>
	);
};


