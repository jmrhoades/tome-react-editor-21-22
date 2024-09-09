import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence, useMotionValue } from "framer-motion";

import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { Overlay } from "../overlay/Overlay";
import { Icon } from "../../../ds/Icon";

const OutlineWrap = styled(motion.div)`
	position: absolute;
	transform: translateX(-50%);
	bottom: 0px;
	padding-bottom: 20px;
	display: flex;
	flex-wrap: nowrap;
`;

const PageWrap = styled(motion.div)`
	position: relative;
	margin: 0 2px;
	flex: 0 0 auto;
`;

const PageThumbnailWrap = styled(motion.div)`
	position: relative;
	transform-origin: 50% 50%;
	border-radius: 3.5px;
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
	border-radius: 3px;
	overflow: hidden;
	background: #191919;
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
	border: 1px solid rgba(255, 255, 255, 0.4);
	border-radius: 3.5px;
	display: none;
`;

/*
const CurrentPageIndicator = styled(motion.div)`
	position: absolute;
	bottom: -1px;
	left: calc(50% - 54px);
	width: 108px;
	height: 1px;
	pointer-events: none;

	border-radius: 2px;
	background-color: rgba(255, 255, 255, 0.8);
	background-color: #ED00EB;
`;
*/

const AddPageButtonInline = styled(PageWrap)`
	background: rgba(255, 255, 255, 0.12);
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
	const { clickCount, showPage, pages, currentPage, addPage, showComments } = useContext(TomeContext);
	const { pageWidth, pageHeight, isPortrait } = useContext(MetricsContext).metrics;

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
							isSelected={currentPage.id === page.id}
							onMouseUp={e => {
								showPage(page, false);
								clickCount.set(Math.random());
								e.stopPropagation();
							}}
							width={pageWidth}
							height={pageHeight}
							isPortrait={isPortrait}
							transition={transition}
						/>
					))}
				</AnimatePresence>

				<AddPageButtonInline
					layout="position"
					whileTap="active"
					whileHover="hover"
					initial={"default"}
					variants={pageVariants}
					onTap={addPage}
					style={{
						width: metricConstants.cPageThumbnailWidth,
						height: metricConstants.cPageThumbnailHeight,
					}}
					transition={transition}
				>
					<AddPageButtonHover variants={hoverVariants} />
					<Icon size={22} name="Add" variants={iconVariants} />
				</AddPageButtonInline>
			</OutlineWrap>
		</AnimateSharedLayout>
	);
};

const Page = ({ isSelected, onMouseUp, transition, page, width, height, isPortrait }) => {
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
				width: metricConstants.cPageThumbnailWidth,
				height: metricConstants.cPageThumbnailHeight,
				zIndex: isSelected ? 1 : 0,
			}}
		>
			<PageThumbnailWrap
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				transition={transition}
				style={{
					width: metricConstants.cPageThumbnailWidth,
					height: metricConstants.cPageThumbnailHeight,
					background: isSelected ? "rgba(237, 0, 235, 0.75)" : "rgba(255, 255, 255, 0.2)",
				}}
			>
				<PageThumbnailWrapHover
					style={{
						width: metricConstants.cPageThumbnailWidth,
						height: metricConstants.cPageThumbnailHeight,
						background: isSelected ? "rgba(237, 0, 235, 1.0)" : "rgba(255, 255, 255, 0.1)",
						opacity: hoverOpacity,
					}}
				/>
				<PageThumbnailWrapFrame
					style={{
						width: metricConstants.cPageThumbnailWidth - borderWidth * 2,
						height: metricConstants.cPageThumbnailHeight - borderWidth * 2,
						x: borderWidth,
						y: borderWidth,
					}}
				>
					<PageThumbnail
						style={{
							width: width,
							height: height,
							scale: (metricConstants.cPageThumbnailWidth - borderWidth * 2) / width,
							flexDirection: isPortrait ? "column" : "row",
						}}
					>
						{page.tiles.map(tile => (
							<Tile key={tile.id} tile={tile} isThumbnail={true} />
						))}
						{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />}
					</PageThumbnail>
				</PageThumbnailWrapFrame>

				<CurrentPageOutline animate={{ opacity: isSelected ? 1 : 0 }} transition={{ duration: 0.5 }} />
				{/* {isSelected && <CurrentPageOutline layoutId="outline" transition={transition} />} */}
				{/* {isSelected && <CurrentPageIndicator layoutId="underline" />} */}
			</PageThumbnailWrap>
		</PageWrap>
	);
};
