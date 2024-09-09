import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Control = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none;
`;

export const LoadingIndicator = ({ theme, size = 64 }) => {
	return (
		<AnimatePresence>
			<Control
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ ease: "easeOut", duration: 0.5 }}
			>
				{size !== 32 && (
					<motion.svg
						key="bigguy"
						width="64"
						height="64"
						viewBox="0 0 64 64"
						animate={{
							rotate: 360,
						}}
						transition={{
							ease: "linear",
							repeat: Infinity,
							duration: 2,
						}}
					>
						<circle cx="31.9998" cy="31.9988" r="24.033" stroke="#3D3D3D" strokeWidth="3" fill="none" />
						<path
							d="M39.1869 54.9329C35.8171 55.9889 32.2561 56.2893 28.7571 55.8128C25.2581 55.3363 21.9071 54.0946 18.9424 52.1759C15.9778 50.2573 13.4724 47.7089 11.6045 44.7121C9.73656 41.7152 8.55202 38.3436 8.13511 34.8369C7.71821 31.3303 8.07919 27.7749 9.19238 24.4236C10.3056 21.0724 12.1436 18.0076 14.5757 15.4473C17.0079 12.8871 19.9743 10.8943 23.2641 9.61064C26.5539 8.32702 30.0861 7.78415 33.6095 8.02064"
							stroke="#7a7a7a"
							strokeWidth="3"
							strokeLinecap="round"
							fill="none"
						/>
					</motion.svg>
				)}
				{size === 32 && (
					<motion.svg
						key="tinyguy"
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						animate={{
							rotate: 360,
						}}
						transition={{
							ease: "linear",
							repeat: Infinity,
							duration: 2,
						}}
					>
						<circle cx="20.0001" cy="19.9992" r="14.2581" stroke="#3D3D3D" strokeWidth="3" />
						<path
							d="M24.2638 33.6056C21.3942 34.5049 18.3138 34.4739 15.4629 33.5169C12.612 32.56 10.1367 30.7262 8.39083 28.2777C6.64497 25.8292 5.71797 22.8914 5.74237 19.8843C5.76677 16.8772 6.74132 13.9548 8.52669 11.535C10.3121 9.11513 12.8168 7.32173 15.6828 6.41119C18.5489 5.50065 21.6294 5.5196 24.484 6.46533C27.3386 7.41105 29.8211 9.23513 31.5766 11.6768C33.332 14.1184 34.2706 17.0525 34.258 20.0597"
							stroke="#ED00EB"
							strokeWidth="3"
							strokeLinecap="round"
							fill="none"
						/>
					</motion.svg>
				)}
			</Control>
		</AnimatePresence>
	);
};
