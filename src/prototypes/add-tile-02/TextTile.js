import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { MetricsContext } from "./MetricsContext";
import { TomeContext } from "./TomeContext";

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


export const TextTile = props => {
	const { scale, tileHalfSize, tileWideSize } = useContext(MetricsContext).metrics;
	const { addTileDropTarget, showAddTileDropTarget } = useContext(TomeContext);

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

	let wideOpacity = 1;
	let halfOpacity = 0;
	if (showAddTileDropTarget) {
		if (addTileDropTarget === "wide") {
			wideOpacity = 1
			halfOpacity = 0
		} else {
			wideOpacity = 0
			halfOpacity = 1
		}
	}

	return (
		<motion.div
		layout
			style={{
				width: tileWideSize,
			}}
		>
			<Wrap
			layout
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					padding: textTilePadding,
					width: tileWideSize,
					height: tileHalfSize,
				}}
				transition={transitions.layoutTransition}
				animate={{
					opacity: wideOpacity
				}}
			>
				{blocks &&
					blocks.map(block => (
						<TextBlock key={"b" + Math.random()} layout>
							{block.type === textBlockType.H1 && (
								<H1
									fontSize={fontSizeH1}
									marginBottom={marginBottomH1}
									key={"b" + Math.random()}
									contenteditable={true}
									layout
								>
									{block.content}
								</H1>
							)}

							{block.type === textBlockType.P && (
								<P fontSize={fontSizeP} marginBottom={marginBottomP} key={"b" + Math.random()} layout>
									{block.content}
								</P>
							)}

							{block.type === textBlockType.LI && (
								<UL fontSize={fontSizeP} marginBottom={marginBottomP} key={"b" + Math.random()} layout>
									{block.content.map(li => (
										<li key={"b" + Math.random()}>{li}</li>
									))}
								</UL>
							)}
						</TextBlock>
					))}
			</Wrap>

			<Wrap
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					padding: textTilePadding,
					width: tileHalfSize,
					height: tileHalfSize,
				}}
				layout
				animate={{
					opacity: halfOpacity
				}}
				transition={transitions.layoutTransition}
			>
				{blocks &&
					blocks.map(block => (
						<TextBlock key={"b" + Math.random()} layout>
							{block.type === textBlockType.H1 && (
								<H1
									fontSize={fontSizeH1}
									marginBottom={marginBottomH1}
									key={"b" + Math.random()}
									contenteditable={true}
									layout
								>
									{block.content}
								</H1>
							)}

							{block.type === textBlockType.P && (
								<P fontSize={fontSizeP} marginBottom={marginBottomP} key={"b" + Math.random()} layout>
									{block.content}
								</P>
							)}

							{block.type === textBlockType.LI && (
								<UL fontSize={fontSizeP} marginBottom={marginBottomP} key={"b" + Math.random()} layout>
									{block.content.map(li => (
										<li key={"b" + Math.random()} layout>{li}</li>
									))}
								</UL>
							)}
						</TextBlock>
					))}
			</Wrap>
		</motion.div>
	);
};
