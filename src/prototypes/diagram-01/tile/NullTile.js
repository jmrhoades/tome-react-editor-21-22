import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Icon } from "../../../ds/Icon";

import { MetricsContext } from "../metrics/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { panels } from "../panel/Panel";

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
	color: rgba(255, 255, 255, 0.4);
	position: absolute;
	bottom: 16px;
	left: 50%;
	transform: translateX(-50%);
`;

const PlaceholderClickTarget = styled(motion.div)`

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
	const { setPanelOpen, setPanelName } = useContext(TomeContext);
	return (
		<Wrap>
			<MediaPlaceholder>
				<PlaceholderClickTarget
					whileTap="active"
					whileHover="hover"
					initial="default"
					variants={buttonVariants}
					onTap={e => {
						setPanelOpen(true);
						setPanelName(panels.TILES);
						// setPanelPosition("tile-half-2");
						e.preventDefault();
					}}
				>
					<Icon size={48 * scale} name={"Add"} opacity={0.4} />
				</PlaceholderClickTarget>
				<PlaceholderLabel fontSize={13 * scale}>Drag in files or paste a URL</PlaceholderLabel>
			</MediaPlaceholder>
		</Wrap>
	);
};
