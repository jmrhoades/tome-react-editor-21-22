import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { MetricsContext } from "./MetricsContext";

export const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
};

const Wrap = styled(motion.div)`
	position: relative;
	height: 100%;
`;

const TextBlock = styled(motion.div)``;

const H1 = styled(motion.div)`
	position: relative;
	font-size: ${props => props.fontSize}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: 0 0;
	font-weight: 800;
	/* font-family: TestBold; */
`;

const P = styled(motion.div)`
	/* font-family: TestRegular; */
	position: relative;
	font-size: ${props => props.fontSize}px;
	line-height: 1.3;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
`;

const UL = styled(motion.ul)`
	/* font-family: TestRegular; */
	position: relative;
	font-size: ${props => props.fontSize}px;
	line-height: 1.3;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
	padding-inline-start: 0;
	padding: 0 0 0 1em;
	margin: 0;
	list-style-type: disc;
	& li {
		padding: 0.05em 0;
		&::marker {
			color: rgb(166, 166, 166);
		}
	}
`;

const PlaceholderHeader = styled(H1)`
	color: rgba(255, 255, 255, 0.25);
`;

export const TextTile = props => {
	const { scale } = useContext(MetricsContext).metrics;

	const textTilePadding = 16 * scale;
	const fontSizeH1 = 37 * scale;
	const fontSizeP = 22 * scale;
	const marginBottomH1 = 16 * scale;
	const marginBottomP = 16 * scale;

    const blocks = [
        {
            type: textBlockType.H1,
            content: "The Dolomites",
        },
        {
            type: textBlockType.P,
            content: `Marmolada is a mountain in northeastern Italy and the highest mountain of the
                Dolomites (a section of the Alps). It lies between the borders of Trentino and
                Veneto. The Marmolada is an ultra-prominent peak (Ultra).`,
        },
    ];


	return (
		<Wrap
			transition={transitions.layoutTransition}
			style={{
				padding: textTilePadding,
			}}
		>
			{blocks &&
				blocks.map(block => (
					<TextBlock key={"b" + Math.random()}>
						{block.type === textBlockType.H1 && (
							<H1
								fontSize={fontSizeH1}
								marginBottom={marginBottomH1}
								key={"b" + Math.random()}
								contenteditable={true}
							>
								{block.content}
							</H1>
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
			{!blocks && (
				<PlaceholderHeader fontSize={fontSizeH1} marginBottom={marginBottomH1}>
					Type something…
				</PlaceholderHeader>
			)}
		</Wrap>
	);
};
