import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";
import { transitions } from "../../../ds/Transitions";
import { TileResizeHandle2Up, TileResizeHandle3Up } from "./TileResizeHandle";
import { TilePlacementIndicator2Up } from "./TilePlacementIndicator";

const Wrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
	/* background-color: cornflowerblue; */
`;

const PageContent = styled(motion.div)`
	position: relative;
	/* overflow: hidden; */
	pointer-events: none;
`;

export const Page = props => {
	const { pageWidth, pageLeft, pageTop, minPageHeight, pageCornerRadius } = useContext(MetricsContext).metrics;
	const { pages, currentPage } = useContext(TomeContext);

	return (
		<Wrap
			transition={transitions.layoutTransition}
			layout
			style={{
				paddingTop: pageTop,
				paddingBottom: pageTop,
			}}
		>
			{pages.map(
				page =>
					currentPage.id === page.id && (
						<PageContent
							id="pageContent"
							key={page.id}
							style={{
								backgroundColor: colors.z1,
								marginLeft: pageLeft,
								width: pageWidth,
								minHeight: minPageHeight,
								borderRadius: pageCornerRadius,
							}}
							transition={transitions.layoutTransition}
							layout
						>
							{page.tiles.map(tile => (
								<Tile key={tile.id} tile={tile} />
							))}
							{/* <RowResizeHandle /> */}
						</PageContent>
					)
			)}
			
			{currentPage.tiles.length === 2 && <TileResizeHandle2Up />}
			{currentPage.tiles.length === 3 && <TileResizeHandle3Up />}
			<TilePlacementIndicator2Up />

		</Wrap>
	);
};
