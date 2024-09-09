import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { Icon } from "../../../ds/Icon";
import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

export const TileTwitter = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap
			style={{
				// backgroundColor: colors.nullTileBackgrounds.twitter,
				backgroundColor: colors.z2,
			}}
		>
	<NullMediaTile
				rowHeight={props.rowHeight}
				tileWidth={props.tileWidth}
				scale={scale}
				iconName={"Twitter"}
				isEmbed={true}
				inputPlaceholder={"Paste Twitter link..."}
			/>


		</Wrap>
	);
};
