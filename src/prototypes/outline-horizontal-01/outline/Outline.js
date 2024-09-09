import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence, useMotionValue } from "framer-motion";

import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { ThumbnailSeenHeads } from "../page/ThumbnailSeenHeads";
import { Overlay } from "../overlay/Overlay";
import { clamp } from "lodash";

const OutlineWrap = styled(motion.div)`
	position: absolute;
	transform: translateX(-50%);
	bottom: 0px;
	padding-bottom: 8px;
	max-width: calc(100% - 16px);
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const PageWrap = styled(motion.div)`
	position: relative;
	margin: 0 5px;
	flex: 0 0 auto;
`;

const PageThumbnailWrap = styled(motion.div)`
	position: relative;
	transform-origin: 50% 50%;
	border-radius: 3px;
	overflow: hidden;
`;

const PageThumbnailWrapHover = styled(motion.div)`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;

const PageThumbnailWrapFrame = styled(motion.div)`
	position: relative;
	overflow: hidden;
	/* Fix for Safari border-radius + overflow + child transform
	https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
	*/
	mask-image: -webkit-radial-gradient(white, black);
	backface-visibility: hidden;
	transform: translate3d(0, 0, 0);
`;

const PageThumbnail = styled(motion.div)`
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
	border: 1px solid hsl(0, 0%, 30%);
	border: 1px solid #ed00eb;
	border-radius: 3px;
`;

const CurrentPageIndicator = styled(motion.div)`
	position: absolute;
	bottom: -7px;
	width: 40px;
	left: calc(50% - 20px);
	height: 2px;
	pointer-events: none;

	border-radius: 2px;
	background-color: hsl(0, 0%, 50%);
	background-color: #ed00eb;
`;

const PageNumber = styled(motion.div)`
	text-align: center;
	width: 100%;
	pointer-events: none;
	font-weight: 700;
	font-size: 12px;
	line-height: 1;
	padding-top: 4px;
	color: hsl(0, 0%, 25%);
`;

export const Outline = props => {
	const {
		clickCount,
		showPage,
		pages,
		currentPage,
		showComments,
		selectedThumbnail,
		setSelectedThumbnail,
		setSelectedTile,
	} = useContext(TomeContext);
	const { pageWidth, pageHeight, isPortrait, colors, scale } = useContext(MetricsContext).metrics;

	const scrollRef = useRef();

	// const transition = { duration: 1 };
	const transition = transitions.layoutTransition;

	useEffect(() => {
		if (scrollRef.current) {

			const scrollAmount = pages.length * (metricConstants.cPageThumbnailWidth + 8) + 140 - window.innerWidth;
			if (scrollAmount > 0) {
				scrollRef.current.scrollTo({
					top: 0,
					left: scrollAmount,
					behavior: "smooth",
				});
			}
		}
	}, [currentPage, pages.length]);

	const tWidth = Math.round(clamp(metricConstants.cPageThumbnailWidth * scale, 40, 100));
	const tHeight = tWidth * 0.5;

	return (
		<AnimateSharedLayout>
			<OutlineWrap
				ref={scrollRef}
				style={{
					left: showComments ? "calc(50% - 164px)" : "50%",
				}}
			>
				<AnimatePresence>
					{pages.map(page => (
						<Page
							key={page.id}
							number={page.order}
							page={page}
							totalPages={pages.length}
							isSelected={currentPage.id === page.id}
							isThumbnailSelected={selectedThumbnail === page.id}
							onMouseUp={e => {
								setSelectedTile(null);
								showPage(page, false);
								setSelectedThumbnail(page.id);
								clickCount.set(Math.random());
								e.stopPropagation();
							}}
							pageWidth={pageWidth}
							pageHeight={pageHeight}
							thumbnailWidth={tWidth}
							thumbnailHeight={tHeight}
							isPortrait={isPortrait}
							transition={transition}
							colors={colors}
							scale={scale}
						/>
					))}
				</AnimatePresence>
			</OutlineWrap>
		</AnimateSharedLayout>
	);
};

const Page = ({
	isSelected,
	onMouseUp,
	transition,
	page,
	pageWidth,
	pageHeight,
	thumbnailWidth,
	thumbnailHeight,
	isPortrait,
	colors,
	totalPages,
	isThumbnailSelected,
	scale,
}) => {
	const borderWidth = 1.5;
	const hoverOpacity = useMotionValue(0);
	return (
		<PageWrap
			onMouseUp={onMouseUp}
			onMouseEnter={() => hoverOpacity.set(1)}
			onMouseLeave={() => hoverOpacity.set(0)}
			layout
			transition={transition}
			style={{
				width: thumbnailWidth,
				zIndex: isSelected ? 1 : 0,
			}}
		>
			<PageThumbnailWrap
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1, y: totalPages > 3 ? 0 : 10 }}
				exit={{ opacity: 0, scale: 0 }}
				transition={transition}
				style={{
					width: thumbnailWidth,
					height: thumbnailHeight,
					background: colors.tileBackground,
				}}
			>
				<PageThumbnailWrapHover
					style={{
						width: thumbnailWidth,
						height: thumbnailHeight,
						background: isSelected ? "rgba(237, 0, 235, 0.0)" : "rgba(255, 255, 255, 0.0)",
						opacity: hoverOpacity,
					}}
				/>
				<PageThumbnailWrapFrame
					style={{
						width: thumbnailWidth - borderWidth * 2,
						height: thumbnailHeight - borderWidth * 2,
						x: borderWidth,
						y: borderWidth,
						backgroundColor: colors.tileBackground,
					}}
				>
					<PageThumbnail
						style={{
							width: pageWidth,
							height: pageHeight,
							scale: (thumbnailWidth - borderWidth * 2) / pageWidth,
							flexDirection: isPortrait ? "column" : "row",
						}}
					>
						{page.tiles.map(tile => (
							<Tile key={tile.id} tile={tile} isThumbnail={true} />
						))}
						{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />}
					</PageThumbnail>
					{page.presense && <ThumbnailSeenHeads info={page.presense} scale={scale} />}
				</PageThumbnailWrapFrame>
				{isThumbnailSelected && <CurrentPageOutline transition={transition} />}
			</PageThumbnailWrap>
			<PageNumber
				animate={{
					color: isSelected ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.25)",
					opacity: totalPages > 3 ? 1 : 0,
					scale: 1,
				}}
				initial={{
					opacity: 0,
					scale: 0,
				}}
			>
				{page.order}
			</PageNumber>
			{isSelected && <CurrentPageIndicator layoutId="underline" transition={{duration: 0.2}}/>}
		</PageWrap>
	);
};
