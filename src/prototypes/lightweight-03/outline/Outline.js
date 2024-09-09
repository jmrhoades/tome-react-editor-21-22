import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext, metricConstants } from "../metrics/MetricsContext";
import { Tile } from "../tile/Tile";
import { Overlay } from "../overlay/Overlay";


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

const ProgressBar = styled(motion.div)`
	background-color: white;
	border-radius: 2px;
	transform-origin: 0 0;
	position: absolute;
	top: 0px;
	left: 0px;
	pointer-events: none;
`;

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
		<AnimateSharedLayout>
			<PagesScrollView ref={scrollRef}>
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
							transition={transitions.defaultTransition}
							width={pageWidth}
							height={pageHeight}
							isPortrait={isPortrait}
							showOutline={showOutline}
						/>
					))}
				</AnimatePresence>
			</PagesScrollView>
		</AnimateSharedLayout>
	);
};

const Page = ({ isSelected, onMouseUp, transition, page, width, height, isPortrait, showOutline }) => {
	return (
		<PageWrap
			onMouseUp={onMouseUp}
			whileTap="active"
			whileHover="hover"
			initial={"default"}
			variants={buttonVariants}
			transition={transitions.layoutTransition}
			layout={"fade"}
			style={{
				width: showOutline ? metricConstants.cPageThumbnailWidth : 32,
				height: showOutline ? metricConstants.cPageThumbnailHeight : 3,
				top: showOutline ? 0 : 58,
				margin: showOutline ? "0 4px" : "0 2px",
			}}
		>
			<ProgressBar
				transition={transitions.layoutTransition}
				style={{
					backgroundColor: isSelected ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
					width: 32,
					height: 3,
				}}
				animate={{
					opacity: showOutline ? 0 : 1,
				}}
			/>
			<PageThumbnail
				style={{
					width: width,
					height: height,
					scale: metricConstants.cPageThumbnailWidth / width,
					flexDirection: isPortrait ? "column" : "row",
				}}
				transition={transitions.layoutTransition}
				animate={{
					opacity: showOutline ? 1 : 0,
				}}
			>
				{page.tiles.map(tile => (
					<Tile key={tile.id} tile={tile} isThumbnail={true} />
				))}
				{page.overlay && <Overlay id={page.overlay.id} video={page.overlay.video} />}
			</PageThumbnail>
			 <CurrentPageOutline
				
				style={{
					opacity: (isSelected && showOutline) ? 1 : 0,
				}}
				
			/> 
		</PageWrap>
	);
};
