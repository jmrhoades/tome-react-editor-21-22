import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { transitions, textBlockType } from "../tome/TomeContext";
import { MetricsContext } from "../metrics/MetricsContext";

const Wrap = styled(motion.div)`
	position: relative;
	height: 100%;
`;

const TextBlock = styled(motion.div)``;

const H1 = styled(motion.div)`
	position: relative;
	font-weight: 700;
	font-size: ${props => props.fontSize}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: 0 0;
	letter-spacing: -0.405634px;
`;

const P = styled(motion.div)`
	position: relative;
	font-size: ${props => props.fontSize}px;
	line-height: 128%;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
`;

const UL = styled(motion.ul)`
	position: relative;
	font-size: ${props => props.fontSize}px;
	line-height: 128%;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
	padding-inline-start: 16px;
	list-style-type: disc;

	& li {
		padding: 0.35em 0;
		&::marker {
			color: rgb(166, 166, 166);
		}
	}
`;

export const TextTile = props => {
	const { fontSizeH1, fontSizeP, marginBottomH1, marginBottomP } = useContext(MetricsContext).metrics;

	return (
		<Wrap layout transition={transitions.layoutTransition}>
			{props.blocks.map(block => (
				<TextBlock>
					{block.type === textBlockType.H1 && (
						<H1 fontSize={fontSizeH1} marginBottom={marginBottomH1}>
							{block.content}
						</H1>
					)}

					{block.type === textBlockType.P && (
						<P fontSize={fontSizeP} marginBottom={marginBottomP}>
							{block.content}
						</P>
					)}

					{block.type === textBlockType.LI && (
						<UL fontSize={fontSizeP} marginBottom={marginBottomP}>
							{block.content.map(li => (
								<li>{li}</li>
							))}
						</UL>
					)}
				</TextBlock>
			))}
		</Wrap>
	);
};

export const MetricsTile = props => {
	const {
		viewportWidth,
		viewportHeight,
		pageWidth,
		pageHeight,
		tileWidth,
		fontSizeH1,
		fontSizeP,
		marginBottomH1,
		marginBottomP,
	} = useContext(MetricsContext).metrics;

	return (
		<Wrap layout transition={transitions.layoutTransition}>
			<TextBlock layout transition={transitions.layoutTransition}>
				<H1 fontSize={fontSizeH1} marginBottom={marginBottomH1} layout transition={transitions.layoutTransition}>
					Page sizing metrics
				</H1>
				<P fontSize={fontSizeP} marginBottom={marginBottomP} layout transition={transitions.layoutTransition}>
					Viewport dimensions: {viewportWidth}x{viewportHeight}
					<br />
					Page dimensions: {pageWidth}x{pageHeight}
					<br />
					Tile size: {tileWidth}
				</P>
				<UL fontSize={fontSizeP} marginBottom={marginBottomP} layout transition={transitions.layoutTransition}>
					<li>Use as much of the viewport as possible</li>
					<li>Embrace moving &amp; scaling</li>
					<li>No max page size</li>
				</UL>
			</TextBlock>
		</Wrap>
	);
};
