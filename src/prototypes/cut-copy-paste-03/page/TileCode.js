import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";



import { MetricsContext } from "../tome/MetricsContext";
import { colors } from "../ds/Colors";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
`;

const Code = styled(motion.code)`
	position: relative;
	display: flex;
	font-family: Menlo, monospace;
`;

const LineNumbers = styled(motion.div)`
	text-align: right;
	padding-right: 1em;
`;
const CodeBlocks = styled(motion.div)``;

export const TileCode = props => {
	const { scale } = useContext(MetricsContext).metrics;

	let textTilePadding = 24 * scale;
	let fontSize = 24 * scale;

	// const tokenBlue = "rgb(0, 187, 255)";
	const tokenGray1 = "rgb(255, 255, 255, 0.4)";
	// const tokenGray2 = "rgb(255, 255, 255, 0.4)";
	// const tokenPurple = "rgb(187, 136, 255)";
	// const tokenYellow = "rgb(255, 204, 102)";

	return (
		<Wrap
			style={{
				padding: textTilePadding,
				backgroundColor: colors.z2,
			}}
		>
			<Code
				style={{
					fontSize: fontSize,
				}}
			>
				<LineNumbers>
					<span style={{ color: tokenGray1 }}>1</span>
				</LineNumbers>
				<CodeBlocks>
					<span style={{ color: tokenGray1 }}>Add code…</span>
				</CodeBlocks>
			</Code>
		</Wrap>
	);
};
