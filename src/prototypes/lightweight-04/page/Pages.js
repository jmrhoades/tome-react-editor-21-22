import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { Overlay } from "../overlay/Overlay";

/*
Container element is centered in the viewport by its containing element
(see Wrap in ../index.js)
*/

const PagesWrap = styled(motion.div)`
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
	opacity: 0;
`;

export const Pages = props => {
	const { pages, currentPage, previousPage, currentNewPage } = useContext(TomeContext);
	const { pageWidth, pageHeight, pageLeft, isPortrait } = useContext(MetricsContext).metrics;

	const direction = previousPage && previousPage.order > currentPage.order ? "left" : "right";

	const getScale = id => {
		if (currentNewPage && currentNewPage.id === id) {
			return [0.9, 1];
		}
		return 1;
	}

	const getX = id => {
		if(previousPage && previousPage.id === id) {
			return direction === "left" ? [null, 100] : [null, -100]
		}
		if (currentNewPage && currentNewPage.id === id) {
			return 0;
		} else if (currentPage.id === id) {
			return direction === "left" ? [-100, 0] : [100, 0];
		}
		return 0;
	};

	const getOpacity = id => {
		if (previousPage && previousPage.id === id) {
			return [null, 0];
		}
		if (currentPage.id === id) {
			return [0, 1];
		}
		return 0;
	};
	return (
		<PagesWrap
			style={{
				width: pageWidth,
				height: pageHeight,
				left: pageLeft,
			}}
		>
			{pages.map(page => (
				<PageContainer
					key={page.id}
					style={{
						flexDirection: isPortrait ? "column" : "row",
						zIndex: currentPage.id === page.id ? 1 : 0,
						pointerEvents: currentPage.id === page.id ? "auto" : "none",
					}}
					animate={{
						opacity: getOpacity(page.id),
						x: getX(page.id),
						scale: getScale(page.id),
					}}
					transition={{duration: 0.4}}
				>
					{page.tiles.map(tile => (
						<Tile key={tile.id} tile={tile} />
					))}
					{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />}
				</PageContainer>
			))}
		</PagesWrap>
	);
};
