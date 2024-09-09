import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
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


export const Page = props => {
	const { currentPage, previousPage } = useContext(TomeContext);
	const { pageWidth, pageHeight, pageLeft, pagePadding, isPortrait } = useContext(MetricsContext).metrics;

	const initialX = (previousPage && previousPage.order > currentPage.order) ? -200 : 200
	// const exitX = (previousPage && previousPage.order > currentPage.order) ? 200 : -200

	return (
		<Pages
			style={{
				width: pageWidth,
				height: pageHeight,
				left: pageLeft,
			}}
		>
			<AnimatePresence>
				<PageContainer
					key={currentPage.id}
					layout
					initial={{ x: initialX, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 0, opacity: 0 }}
					style={{
						padding: pagePadding,
						flexDirection: isPortrait ? "column" : "row",
					}}
					transition={transitions.layoutTransition}
				>
					{currentPage.tiles.map(tile => (
						<Tile key={tile.id} tile={tile} />
					))}
					{currentPage.overlay && <Overlay id={currentPage.overlay.id} video={currentPage.overlay.video} />}
				</PageContainer>
			</AnimatePresence>
		</Pages>
	);
};
