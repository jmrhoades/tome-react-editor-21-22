import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../metrics/MetricsContext";
import { ThumbnailSeenHeads } from "../page/ThumbnailSeenHeads";
import { Icon } from "../../../ds/Icon";

const OutlineWrap = styled(motion.div)`
	display: flex;
	justify-content: center;
	flex-wrap: nowrap;
	overflow-x: auto;
	overflow-y: visible;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const PageWrap = styled(motion.div)`
	position: relative;
	flex: 0 0 auto;
	pointer-events: auto;
`;

const PageThumbnailWrap = styled(motion.div)`
	position: relative;
	transform-origin: 50% 50%;
	padding: 2px;
`;

const CurrentPageOutline = styled(motion.div)`
	position: absolute;
	top: 0px;
	right: 0px;
	left: 0px;
	bottom: 0px;
	pointer-events: none;
	border-radius: 5px;
`;

const PageThumbnailWrapFrame = styled(motion.div)`
	position: relative;
	overflow: hidden;
	border-radius: 4px;
`;

const PageThumbnail = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	transform-origin: 0 0;
	pointer-events: none;
`;

const PageNumber = styled(motion.div)`
	text-align: center;
	width: 100%;
	pointer-events: none;
	font-weight: 600;
	font-size: 12px;
	line-height: 18px;
	padding-top: 4px;
`;

const CurrentPageIndicator = styled(motion.div)`
	height: 2px;
	pointer-events: none;
	border-radius: 2px;
	background-color: #ed00eb;
	max-width: 48px;
	margin-left: 50%;
	transform: translateX(-50%);
	margin-bottom: 4px;
`;

const AddPageButtonWrap = styled(motion.div)`
	padding: 2px 4px;
	pointer-events: auto;
	position: sticky;
	right: 0;
`;

const AddPageButton = styled(motion.div)`
	position: relative;
	border-radius: 3.5px;
	& svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const AddPageButtonHover = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	border-radius: 3.5px;
	background: rgba(255, 255, 255, 0.04);
`;

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

const iconColor = "white";
const iconVariants = {
	default: {
		opacity: 0.6,
		fill: iconColor,
	},
};

export const Outline = props => {
	const {
		clickCount,
		showPage,
		pages,
		currentPage,
		addPage,
		showComments,
		selectedThumbnail,
		setSelectedThumbnail,
		setSelectedTile,
	} = useContext(TomeContext);
	const { pageWidth, pageHeight, pageCornerRadius, pagePadding, isPortrait, colors, scale } =
		useContext(MetricsContext).metrics;

	const scrollRef = useRef();

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

	// const tWidth = Math.round(clamp(metricConstants.cPageThumbnailWidth * scale, 40, 100));

	const thumbnailScale = 0.0667;
	const ratio = pageHeight / pageWidth;
	// const thumbnailWidth = Math.round(clamp(pageWidth * thumbnailScale, 36, 72));
	const thumbnailWidth = 72;
	const thumbnailHeight = Math.round(thumbnailWidth * ratio);
	//const addIconSize = Math.round(clamp(22 * scale, 12, 22));
	const addIconSize = 22;

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
							thumbnailWidth={thumbnailWidth}
							thumbnailHeight={thumbnailHeight}
							thumbnailScale={thumbnailScale}
							isPortrait={isPortrait}
							colors={colors}
							scale={scale}
							pageCornerRadius={pageCornerRadius}
							pagePadding={pagePadding}
						/>
					))}
				</AnimatePresence>

				<AddPageButtonWrap layout="position">
					<AddPageButton
						whileTap="active"
						whileHover="hover"
						initial={"default"}
						variants={pageVariants}
						onTap={addPage}
						style={{
							width: thumbnailWidth,
							height: thumbnailHeight,
							backgroundColor: colors.pageBackground,
						}}
					>
						<AddPageButtonHover variants={hoverVariants} />
						<Icon name="Add" size={addIconSize} variants={iconVariants} />
					</AddPageButton>
				</AddPageButtonWrap>
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
	thumbnailScale,
	thumbnailHeight,
	isPortrait,
	colors,
	totalPages,
	isThumbnailSelected,
	scale,
	pageCornerRadius,
	pagePadding,
}) => {
	const spacing = Math.round(scale * 2);

	return (
		<PageWrap
			onMouseUp={onMouseUp}
			layout
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			style={{
				zIndex: isSelected ? 1 : 0,
				margin: `0 ${spacing}px`,
			}}
		>
			<PageThumbnailWrap>
				<CurrentPageOutline
					style={{
						backgroundColor: isThumbnailSelected ? "#ed00eb" : colors.pageThumbnailSelectedBackground,
					}}
					animate={{
						opacity: isSelected ? 1 : 0,
					}}
					transition={{ duration: 0.1 }}
				/>

				<PageThumbnailWrapFrame
					style={{
						width: thumbnailWidth,
						height: thumbnailHeight,
					}}
				>
					<PageThumbnail
						initial={false}
						style={{
							width: pageWidth,
							height: pageHeight,
							borderRadius: pageCornerRadius,
							backgroundColor: colors.tileBackground,
							padding: pagePadding,
							scale: thumbnailWidth / pageWidth,
							// flexDirection: isPortrait ? "column" : "row",
							position: "relative",
						}}
					>
{/* 						
						{page.tiles.map(tile => (
							<Tile key={tile.id} tile={tile} isThumbnail={true} />
						))}
						{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />} */}
					</PageThumbnail>
					{page.presense && <ThumbnailSeenHeads info={page.presense} scale={scale} />}
				</PageThumbnailWrapFrame>
			</PageThumbnailWrap>
			{/* <EnclosedPageNumber>
				<PageNumberCircle
				style={{
					color: isSelected ? "#ed00eb" : "rgba(255, 255, 255, 0.4)",
					backgroundColor: isSelected ? "#592458" : "rgba(255, 255, 255, 0.0)",
				}}
				>
				{page.order}</PageNumberCircle>
			</EnclosedPageNumber> */}
			<PageNumber
				animate={{
					color: isSelected ? "#ed00eb" : "rgba(255, 255, 255, 0.25)",
					opacity: 1,
					scale: 1,
				}}
				initial={{
					opacity: 0,
					scale: 0,
				}}
				transition={{ duration: 0.1 }}
			>
				{page.order}
			</PageNumber>
			{isSelected && (
				<CurrentPageIndicator
					transition={{ duration: 0.1 }}
					initial={{ opacity: 0 }}
					animate={{
						opacity: isSelected ? 1 : 0,
					}}
				/>
			)}
		</PageWrap>
	);
};
