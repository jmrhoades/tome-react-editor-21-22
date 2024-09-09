import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "../../../ds/Icon";
import { MetricsContext } from "../tome/MetricsContext";

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

const PlaceholderClickTarget = styled(motion.div)`
	
`;

export const TileFigma = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap>
			<MediaPlaceholder
				style={{
					backgroundColor: "rgba(24, 44, 36, 1)",
				}}
			>
				<PlaceholderClickTarget>
					<Icon name={"Figma"} size={102 * scale} opacity={1} />
				</PlaceholderClickTarget>
			</MediaPlaceholder>
		</Wrap>
	);
};
