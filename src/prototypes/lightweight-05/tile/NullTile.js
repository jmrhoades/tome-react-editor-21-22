import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Icon } from "../../../ds/Icon";

import { MetricsContext } from "../metrics/MetricsContext";
import { TomeContext, transitions } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const MediaPlaceholder = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PlaceholderLabel = styled(motion.div)`
	font-weight: 500;
	font-size: ${props => props.fontSize}px;
	color: rgba(255, 255, 255, 0.25);
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
`;

const PlaceholderClickTarget = styled(motion.div)`
	& svg {
		fill: none;
		& path {
			fill: rgba(255, 255, 255, 0.2);
		}
	}
`;

const buttonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.95,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0.5,
	},
};

export const NullTile = props => {
	const { scale } = useContext(MetricsContext).metrics;
	const { setPanelName, setPanelOpen, setPanelPosition, showUI } = useContext(TomeContext);
	return (
		<Wrap
			animate={{
				opacity: showUI ? 1 : 0,
			}}
			transition={transitions.defaultTransition}
		>
			<MediaPlaceholder>
				<PlaceholderClickTarget
					whileTap="active"
					whileHover="hover"
					initial="default"
					variants={buttonVariants}
					onTap={e => {
						setPanelOpen(true);
						setPanelName("Add");
						setPanelPosition("tile-half-2");
						e.preventDefault();
					}}
				>
					<Icon size={64 * scale} name={"Grid"} opacity={1} />
				</PlaceholderClickTarget>
				<PlaceholderLabel fontSize={15 * scale}>Drag in files or paste a URL</PlaceholderLabel>
			</MediaPlaceholder>
		</Wrap>
	);
};
