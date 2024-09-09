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

const PagesWrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
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

export const Pages = props => {
	const { currentPage, imageExpanded } = useContext(TomeContext);
	const { pagePadding, pageWidth, pageHeight, pageOffsetX, pageCornerRadius, colors } =
		useContext(MetricsContext).metrics;

	return (
		<PagesWrap
			layout
			style={{
				width: pageWidth,
				height: pageHeight,
				left: pageOffsetX,
				borderRadius: pageCornerRadius,
			}}
			transition={transitions.layoutTransition}
			animate={{
				backgroundColor: imageExpanded ? colors.z0 : colors.z1,
			}}
			initial={{
				backgroundColor: colors.z1,
			}}
		>
			<PageContainer
				key={currentPage.id}
				style={{
					// flexDirection: isPortrait ? "column" : "row",
					pointerEvents: "auto",
					padding: pagePadding,
					// display: "flex",
					position: "relative",
				}}
			>
				{currentPage.tiles.map(tile => (
					<Tile key={tile.id} tile={tile} />
				))}
				{currentPage.overlay && <Overlay id={currentPage.overlay.id} video={currentPage.overlay.video} />}
			</PageContainer>

			{/* {pages.map(page => (
				<PageContainer
					key={page.id}
					style={{
						flexDirection: isPortrait ? "column" : "row",
						zIndex: currentPage.id === page.id ? 1 : 0,
						pointerEvents: currentPage.id === page.id ? "auto" : "none",
						padding: pagePadding,
						display: currentPage.id === page.id ? "flex" : "none",
					}}
				>
					{page.tiles.map(tile => (
						<Tile key={tile.id} tile={tile} />
					))}
					{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />}
				</PageContainer>
			))} */}
		</PagesWrap>
	);
};
