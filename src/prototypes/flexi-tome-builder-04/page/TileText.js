import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

//import { useObserver } from "../../../hooks/use-resize-observer";
import useResizeObserver from "use-resize-observer";


import { textBlockType } from "../page/TileConstants";

const Wrap = styled(motion.div)`
	position: relative;
`;

const TextBlock = styled(motion.div)``;

const H1 = styled(motion.div)`
	position: relative;
	font-weight: 900;

	font-size: ${props => props.fontSize}px;
	line-height: 1.1;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: 0 0;
	letter-spacing: -0.015em;
	-webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto;
`;

const H2 = styled(motion.div)`
	position: relative;

	font-size: ${props => props.fontSize}px;
	font-weight: 800;
	line-height: 1.2;
	letter-spacing: -0.015em;
	margin-bottom: ${props => props.marginBottom}px;

	color: rgba(255, 255, 255, 1);
	transform-origin: 0 0;

	-webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto;
`;

const H3 = styled(motion.div)`
	position: relative;

	font-size: ${props => props.fontSize}px;
	font-weight: 700;
	line-height: 1.2;
	letter-spacing: -0.015em;
	margin-bottom: ${props => props.marginBottom}px;

	color: rgba(255, 255, 255, 1);

	transform-origin: 0 0;
	-webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto;
`;

const P = styled(motion.div)`
	position: relative;

	font-size: ${props => props.fontSize}px;
	line-height: 1.4;
	font-weight: 400;
	letter-spacing: -0.0109em;
	margin-bottom: ${props => props.marginBottom}px;

	color: rgba(166, 166, 166, 1);
`;

const UL = styled(motion.ul)`
	position: relative;
	font-size: ${props => props.fontSize}px;
	line-height: 1.3;
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

const Placeholder = styled(motion.div)``;
const PlaceholderHeader = styled(H1)`
	color: rgba(255, 255, 255, 0.25);
`;
const PlaceholderBody = styled(P)`
	color: rgba(255, 255, 255, 0.25);
`;

export const TileText = props => {
	// const { scale } = useContext(MetricsContext).metrics;
	const scale = props.scale;
	// const ref = useRef(null);

	const { ref } = useResizeObserver({
		onResize: ({ width, height }) => {
			props.onContentSizeChange(width, height)
		},
	});

	// useObserver({ callback: props.onContentSizeChange, element: ref });

	let textTilePadding = 20 * scale;

	let fontSizeH1 = 48 * scale;
	let fontSizeH2 = 32 * scale;
	let fontSizeH3 = 23 * scale;
	let fontSizeP = 22 * scale;
	let marginBottomH1 = 16 * scale;
	let marginBottomH2 = 16 * scale;
	let marginBottomH3 = 16 * scale;
	let marginBottomP = 16 * scale;

	switch (props.tileSize) {
		case "full":
			break;
		case "two-thirds":
			break;
		case "half":
			fontSizeH1 = 48 * scale;
			fontSizeH2 = 32 * scale;
			fontSizeH3 = 24 * scale;
			break;
		case "one-third":
			fontSizeH1 = 28 * scale;
			fontSizeH2 = 24 * scale;
			fontSizeH3 = 18 * scale;
			break;
		default:
			break;
	}

	return (
		<Wrap
			style={{
				padding: textTilePadding,
			}}
			ref={ref}
		>
			{props.blocks &&
				props.blocks.map(block => (
					<TextBlock key={"b" + Math.random()}>
						{block.type === textBlockType.H1 && (
							<H1 fontSize={fontSizeH1} marginBottom={marginBottomH1} key={"b" + Math.random()}>
								{block.content}
							</H1>
						)}

						{block.type === textBlockType.H2 && (
							<H2 fontSize={fontSizeH2} marginBottom={marginBottomH2} key={"b" + Math.random()}>
								{block.content}
							</H2>
						)}

						{block.type === textBlockType.H3 && (
							<H3 fontSize={fontSizeH3} marginBottom={marginBottomH3} key={"b" + Math.random()}>
								{block.content}
							</H3>
						)}

						{block.type === textBlockType.P && (
							<P fontSize={fontSizeP} marginBottom={marginBottomP} key={"b" + Math.random()}>
								{block.content}
							</P>
						)}

						{block.type === textBlockType.LI && (
							<UL fontSize={fontSizeP} marginBottom={marginBottomP} key={"b" + Math.random()}>
								{block.content.map(li => (
									<li key={"b" + Math.random()}>{li}</li>
								))}
							</UL>
						)}
					</TextBlock>
				))}
			{!props.blocks && (
				<Placeholder>
					<PlaceholderHeader
						fontSize={fontSizeH1}
						marginBottom={marginBottomH1}
						// contentEditable={props.isSelected}
					>
						Title
					</PlaceholderHeader>
					<PlaceholderBody
						fontSize={fontSizeP}
						marginBottom={marginBottomP}
						// contentEditable={props.isSelected}
					>
						{/* Body text */}
					</PlaceholderBody>
				</Placeholder>
			)}
		</Wrap>
	);
};
