import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { Overlay } from "../overlay/Overlay";

/*
Container element is centered in the viewport by its containing element
(see Wrap in ../index.js)
*/

const Pages = styled(motion.div)`
	position: relative;
`;

const PageContainer = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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

export const Page = props => {
	const { editorState, currentPage, pages } = useContext(TomeContext);

	const { pageWidth, pageHeight, pageLeft, pagePadding, pageCornerRadius, isPortrait } =
		useContext(MetricsContext).metrics;

	return (
		<Pages
			style={{
				width: pageWidth,
				height: pageHeight,
				left: pageLeft,
			}}
		>
			{pages.map(page => (
				<PageContainer
					key={page.id}
					layout
					style={{
						padding: pagePadding,
						flexDirection: isPortrait ? "column" : "row",
						display: page.id === currentPage.id ? "flex" : "none",
					}}
					transition={transitions.layoutTransition}
				>
					<PageBackground
						style={{ borderRadius: pageCornerRadius }}
						animate={{ opacity: editorState === "presenting" ? 0 : 1 }}
						transition={transitions.layoutTransition}
					/>

					{page.tiles.map(tile => (
						<Tile key={tile.id} tile={tile} />
					))}

					{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />}
				</PageContainer>
			))}
		</Pages>
	);
};
