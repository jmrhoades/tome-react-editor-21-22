import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { TomeContext } from "./TomeContext";
import { TestPages } from "./TestPages";
import { Page } from "./Page";
import { Tile } from "./Tile";

const Container = styled(motion.div)`
	position: absolute;
	top: 44px;
	bottom: 0px;
	left: 0;
	right: 0;
	overflow: hidden;
`;

const PagesList = styled(motion.div)`
	/* background-color: red; */
`;

export const Pages = props => {
	const { isScrolling, currentPage, scrollY, expandedTileID } = useContext(TomeContext);

	const snapToPageAnimation = useAnimation();
	const totalPages = TestPages.length;
	const pageHeight = 678 + 82 + 8;
	const pagesHeight = pageHeight * (totalPages - 1);

	const [shouldScroll, setShouldScroll] = useState(true);

	useEffect(
		() =>
			expandedTileID.onChange(latest => {
				if (latest !== "") {
					setShouldScroll(false);
					isScrolling.set(0);
				} else {
					setShouldScroll(true);
				}
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<Container>
			<PagesList
				drag={shouldScroll ? "y" : false}
				dragConstraints={{ top: -pagesHeight, bottom: 0 }}
				onDragStart={() => {
					isScrolling.set(1);
				}}
				onDragEnd={(event, info) => {
					// scrollY, velocity threshold, newpage
					const velocityThreshold = 300;
					const offsetThreshhold = 100;
					let newPage = currentPage.get();

					// velocity or offset-based paging
					if (info.velocity.y >= velocityThreshold || info.offset.y >= offsetThreshhold) {
						newPage--;
					} else if (info.velocity.y <= -velocityThreshold || info.offset.y <= -offsetThreshhold) {
						newPage++;
					}

					// set new page
					if (newPage > totalPages - 1) newPage = totalPages - 1;
					if (newPage < 0) newPage = 0;

					// console.log("info.velocity.y", info.velocity.y)
					// console.log("info.offset.y", info.offset.y)
					// console.log(currentPage, newPage)
					currentPage.set(newPage);

					// scroll!
					snapToPageAnimation.start({
						y: -pageHeight * newPage,
						transition: {
							type: "spring",
							stiffness: 450,
							damping: 50,
							onComplete: () => {
								isScrolling.set(0);
							},
						},
					});
				}}
				animate={snapToPageAnimation}
				style={{
					y: scrollY,
				}}
			>
				{TestPages.map(page => (
					<Page key={page.id} layout={page.tiles.length > 1 ? "2up" : "responsive"}>
						{page.tiles.map(tile => (
							<Tile key={tile.id} tile={tile} />
						))}
					</Page>
				))}
			</PagesList>
		</Container>
	);
};
