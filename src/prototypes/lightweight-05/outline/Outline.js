import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { Overlay } from "../overlay/Overlay";
import { Icon } from "../../../ds/Icon";

const OutlineWrap = styled(motion.div)`
	text-align: center;
	position: relative;
	width: 100%;
	white-space: nowrap;
	bottom: 0;
	vertical-align: top;
`;

const PagesScrollView = styled(motion.div)`
	max-width: calc(100% - 140px);
	overflow-x: auto;
	overflow-y: hidden;
	text-align: center;
	white-space: nowrap;
	display: inline-block;
	padding-bottom: 16px;
`;

const PageWrap = styled(motion.div)`
	position: relative;
	cursor: pointer;
	margin: 0 4px;
	border-radius: 2px;
	display: inline-block;
`;

const PageThumbnailWrap = styled(motion.div)`
	transform-origin: 50% 50%;
`;

const PageThumbnail = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	transform-origin: 0 0;
	pointer-events: none;
	overflow: hidden;
`;

const CurrentPageOutline = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border: 1px solid rgba(255, 255, 255, 0.4);
	border-radius: 2px;
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
	background: #232323;
	background: #191919;
	cursor: pointer;
	margin-bottom: 16px;
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
		y: 50,
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

const iconColor = "white";
const iconVariants = {
	default: {
		opacity: 0.4,
		fill: iconColor,
	},
};

export const Outline = props => {
	const { clickCount, showPage, pages, currentPage, showOutline, addPage, showComments } = useContext(TomeContext);
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
				animate={showOutline ? "show" : "hide"}
				initial={"hide"}
				variants={outlineVariants}
				transition={showOutline ? transitions.layoutTransition : {duration: 0.35}}
				style={{
					width: showComments ? "calc(100% - 328px)" : "100%",
				}}
			>
				<PagesScrollView
					ref={scrollRef}
					style={{
						height: metricConstants.cPageThumbnailHeight + 16,
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
				</PagesScrollView>
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
					<Icon size={28} name="Add" variants={iconVariants} />
				</AddPageButtonInline>
			</OutlineWrap>
		</AnimateSharedLayout>
	);
};

const Page = ({ isSelected, onMouseUp, transition, page, width, height, isPortrait }) => {
	return (
		<PageWrap
			onMouseUp={onMouseUp}
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
					animate={{opacity: isSelected ? 1 : 0}}
					transition={{duration:0.5}}
				/> 
				{/* {isSelected && <CurrentPageOutline layoutId="outline" transition={transition} />} */}
				{/* {isSelected && <CurrentPageIndicator layoutId="underline" />} */}

			</PageThumbnailWrap>
		</PageWrap>
	);
};
