import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "../tile/Tile";
import { TextTile } from "../tile/TextTile";
import { LargeLetterTile } from "../tile/LargeLetterTile";

/*
Container element is centered in the viewport by its containing element
(see Wrap in ../index.js)
*/
const Wrap = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: space-between;
`;

const PageBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/* background: cornflowerblue; */
	background-color: #191919;
`;

export const TempPage = props => {
	const tome = useContext(TomeContext);
	const { pageWidth, pageHeight, pageOffsetX, pagePadding, pageCornerRadius, isPortrait } = tome.metrics;

	return (
		<Wrap
			layout
			style={{
				width: pageWidth,
				height: pageHeight,
				marginLeft: pageOffsetX,
				padding: pagePadding,
				flexDirection: isPortrait ? "column" : "row",
			}}
            transition={tome.layoutTransition}
		>
			<PageBackground
				style={{
					borderRadius: pageCornerRadius,
				}}
				animate={{
					opacity: tome.editorState === "presenting" ? 0 : 1,
				}}
				transition={tome.layoutTransition}
			/>
			<Tile id="tileA">
                <TextTile />
            </Tile>
			<Tile id="tileB">
                <LargeLetterTile />
            </Tile>
		</Wrap>
	);
};
