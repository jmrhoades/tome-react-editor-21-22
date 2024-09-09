import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
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

const PlaceholderClickTarget = styled(motion.div)``;

export const TileAirtable = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap>
			<MediaPlaceholder
				style={{
					//backgroundColor: "rgba(47, 28, 30, 1)",
					backgroundColor: colors.z2,
				}}
			>
				<PlaceholderClickTarget>
					<Icon name={"Airtable"} size={102 * scale} opacity={0.2} forceColor={true} />
				</PlaceholderClickTarget>
			</MediaPlaceholder>
		</Wrap>
	);
};
