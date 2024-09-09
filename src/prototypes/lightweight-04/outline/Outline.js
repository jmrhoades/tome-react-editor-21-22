import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { Overlay } from "../overlay/Overlay";
import { Icon } from "../../../ds/Icon";

const OutlineWrap = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 24px;
	display: flex;
	justify-content: center;
	z-index: 100;
`;

const PagesScrollView = styled(motion.div)`
	position: relative;
	overflow-x: scroll;
	display: flex;
	justify-content: center;
	background-color: #1f1f1f;
	max-width: 75%;
	/* background-color: #191919; */
	/* background: #141414; */
	border-radius: 16px;
	padding: 16px 16px;
	/* box-shadow:  0px 0px 8px rgba(0, 0, 0, 0.5); */
`;

const PageWrap = styled(motion.div)`
	position: relative;
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
	border: 1px solid rgba(255, 255, 255, 0.4);
	border-radius: 3px;
`;

const AddPageButtonInline = styled(motion.div)`
	border-radius: 5px;
	background: #292929;
	display: flex;
	flex: none;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 2;
	margin-left: 4px;
	position: relative;
`;

const AddPageButtonHover = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.04);
`;

const outlineVariants = {
	show: {
		opacity: 1,
		y: 0,
	},
	hide: {
		opacity: 0,
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

const iconColor = "white";
const iconVariants = {
	default: {
		opacity: 0.4,
		fill: iconColor,
	},
};

const hoverVariants = {
	default: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	active: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0,
	},
};

const pageVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.95,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0.5,
	},
};

export const Outline = props => {
	const { clickCount, showPage, pages, currentPage, showOutline, addPageToEnd } = useContext(TomeContext);
	const { pageWidth, pageHeight, isPortrait } = useContext(MetricsContext).metrics;

	const scrollRef = useRef();

	return (
		<OutlineWrap
			animate={showOutline ? "show" : "hide"}
			variants={outlineVariants}
			transition={transitions.layoutTransition}
		>
			<AnimateSharedLayout>
				<PagesScrollView ref={scrollRef} layout>
					<AnimatePresence>
						{pages.map(page => (
							<motion.div
								layout
								key={page.id}
								transition={transitions.defaultTransition}
								initial={{ opacity: 0, y: 0, scale: 1 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
							>
								<Page
									layout
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

					<AddPageButtonInline
						layout="position"
						whileTap="active"
						whileHover="hover"
						initial={"default"}
						variants={pageVariants}
						onTap={addPageToEnd}
						style={{
							width: metricConstants.cPageThumbnailWidth,
							height: metricConstants.cPageThumbnailHeight,
						}}
					>
						<AddPageButtonHover variants={hoverVariants} />
						<Icon size={28} name="Add" variants={iconVariants} />
					</AddPageButtonInline>
				</PagesScrollView>
			</AnimateSharedLayout>
		</OutlineWrap>
	);
};

const Page = ({ isSelected, onMouseUp, transition, page, width, height, isPortrait }) => {
	return (
		<PageWrap
			layout
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
					<Tile key={tile.id} tile={tile} isThumbnail={true} />
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
