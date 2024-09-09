import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { Overlay } from "../overlay/Overlay";

const OutlineWrap = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 80px;
	background-color: #090909;
`;

const PagesScrollView = styled(motion.div)`
	position: relative;
	width: 100%;
	height: 100%;
	overflow-x: scroll;
	display: flex;
	justify-content: center;
`;

const PageWrap = styled(motion.div)`
	position: relative;
	cursor: pointer;
	margin: 0 4px;
	border-radius: 2px;
	overflow: hidden;
`;

const PageThumbnail = styled(motion.div)`
	position: absolute;
	top: 1px;
	left: 1px;
	display: flex;
	justify-content: space-between;
	transform-origin: 0 0;
	pointer-events: none;
`;

const CurrentPageOutline = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border: 1px solid rgba(255, 255, 255, 0.8);
	border-radius: 2px;
`;

const outlineVariants = {
	show: {
		opacity: 1,
		y: 0,
	},
	hide: {
		opacity: 1,
		y: 80,
	},
};

const buttonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		opacity: 1,
	},
	disabled: {
		opacity: 0.5,
	},
};

export const Outline = props => {
	const { clickCount, showPage, pages, currentPage, showOutline } = useContext(TomeContext);
	const { pageWidth, pageHeight, isPortrait } = useContext(MetricsContext).metrics;

	const scrollRef = useRef();

	return (
		<OutlineWrap
			animate={showOutline ? "show" : "hide"}
			variants={outlineVariants}
			transition={transitions.layoutTransition}
			style={{
				display: pages.length > 1 ? "block" : "none",
			}}
		>
			<AnimateSharedLayout>
				<PagesScrollView ref={scrollRef}>
					<AnimatePresence>
						{pages.map(page => (
							<motion.div
								key={page.id}
								transition={transitions.defaultTransition}
								initial={{ opacity: 0, y: 50, scale: 0.3 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
							>
								<Page
									key={page.id}
									number={page.order}
									page={page}
									isSelected={currentPage.id === page.id}
									onMouseUp={e => {
										showPage(page, false);
										clickCount.set(Math.random());
										e.stopPropagation();
									}}
									transition={transitions.defaultTransition}
									width={pageWidth}
									height={pageHeight}
									isPortrait={isPortrait}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</PagesScrollView>
			</AnimateSharedLayout>
		</OutlineWrap>
	);
};

const Page = ({ isSelected, onMouseUp, transition, page, width, height, isPortrait }) => {
	return (
		<PageWrap
			onMouseUp={onMouseUp}
			whileTap="active"
			whileHover="hover"
			initial={"default"}
			variants={buttonVariants}
			transition={transition}
			style={{
				width: metricConstants.cPageThumbnailWidth + 2,
				height: metricConstants.cPageThumbnailHeight + 2,
			}}
		>
			<PageThumbnail
				style={{
					width: width,
					height: height,
					scale: metricConstants.cPageThumbnailWidth / width,
					flexDirection: isPortrait ? "column" : "row",
				}}
			>
				{page.tiles.map(tile => (
					<Tile key={tile.id} tile={tile} />
				))}
				{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />}
			</PageThumbnail>
			<CurrentPageOutline
				animate={{
					opacity: isSelected ? 1 : 0,
				}}
				transition={transition}
			/>
		</PageWrap>
	);
};
