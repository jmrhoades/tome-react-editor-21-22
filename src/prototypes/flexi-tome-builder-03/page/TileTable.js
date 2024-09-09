import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";

const Wrap = styled(motion.div)`
	position: relative;
`;

const TableHeader = styled(motion.div)`
	position: relative;
	font-weight: 800;

	font-size: ${props => props.fontSize}px;
	line-height: 1;
	color: rgba(255, 255, 255, 0.25);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: 0 0;
	letter-spacing: -0.405634px;
	-webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto;
`;

const PlaceholderTable = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
`;

const TableCell = styled(motion.div)`
	background-color: rgba(255, 255, 255, 0.04);
	border-radius: 2px;

`;

export const TileTable = props => {
	const { scale } = useContext(MetricsContext).metrics;

	let textTilePadding = 24 * scale;
	let fontSizeH2 = 27 * scale;
	let marginBottomH2 = 24 * scale;
	let cellHeight = 40 * scale;
    const cellGap = 4 * scale;

	const cells = [];
	for (var i = 0; i < 9; i++) {
		cells.push(
			<TableCell
				key={i}
				style={{
					height: cellHeight,
					backgroundColor: colors.z2,
				}}
			/>
		);
	}

	return (
		<Wrap
			style={{
				padding: textTilePadding,
			}}
		>
			<TableHeader fontSize={fontSizeH2} marginBottom={marginBottomH2}>
				Untitled
			</TableHeader>
			<PlaceholderTable
            
            style={{
                columnGap: cellGap,
                rowGap: cellGap,
            }}
            >
				{cells}
			</PlaceholderTable>
		</Wrap>
	);
};
