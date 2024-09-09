import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";

const Wrap = styled(motion.div)`
	position: relative;
    pointer-events: none;
	/* background-color: cornflowerblue; */
`;

const PageContent = styled(motion.div)`
	position: relative;
    overflow: hidden;
`;

export const Page = props => {
	const { scale, pageWidth, pageLeft, pageTop, minPageHeight } =
		useContext(MetricsContext).metrics;

	const { pages, currentPage } = useContext(TomeContext);

	//console.log("render")
	//const pageHeight = 1600;

	const pageCornerRadius = metricConstants.cPageCornerRadius * scale;
    const columnGap = 2 * scale;
    const rowGap = 2 * scale;

	//const columnGap = 0;
	//const rowGap = 0;

	return (
		<Wrap
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
								display: "grid",
								gridTemplate: page.gridTemplate,
                                columnGap: columnGap,
                                rowGap: rowGap,
							}}
                            layout
							transition={transitions.layoutTransition}
						>
							{page.tiles.map(tile => (
								<Tile key={tile.id} tile={tile} />
							))}
						</PageContent>
					)
			)}
		</Wrap>
	);
};
