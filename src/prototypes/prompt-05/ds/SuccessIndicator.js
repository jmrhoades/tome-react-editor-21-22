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

export const SuccessIndicator = ({ theme, size = 64 }) => {
	return (
		<AnimatePresence>
			<Control
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0 }}
				transition={{ ease: "easeOut", duration: 0.2 }}
			>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
					<circle cx="16" cy="16" r="14.5" stroke="#21B12F" strokeWidth="3" />
					<path
						d="M10.5781 16.0625L14.2422 21.0625L21.3125 11.0859"
						stroke="#21B12F"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</Control>
			</AnimatePresence>
	);
};
