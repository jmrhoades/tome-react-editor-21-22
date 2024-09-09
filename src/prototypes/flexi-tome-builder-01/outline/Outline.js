import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { Icon } from "../../../ds/Icon";
import { transitions } from "../../../ds/Transitions";
import { TomeContext, permissions } from "../tome/TomeContext";

const OutlineWrap = styled(motion.div)`
	position: fixed;
	left: 0;
	top: 0px;
	bottom: 0px;
	display: flex;
	align-items: center;
	width: 160px;
	/* background-color: rgba(115, 150, 256, 0.5); */
`;

const Pages = styled(motion.div)`
	display: flex;
	align-items: center;
	position: relative;
	flex-direction: column;
`;

const PagesScrollView = styled(motion.div)`
	position: relative;
	max-height: calc(100vh - 80px);
	/* overflow-y: auto; */
	overflow: hidden;
`;

const PageWrap = styled(motion.div)`
	position: relative;
	width: 134px;
	height: 64px;
	cursor: pointer;
`;

const PageHover = styled(motion.div)`
	position: absolute;
	top: 2px;
	left: 2px;
	right: 4px;
	bottom: 2px;
	border-radius: 4px;
	background: rgba(255, 255, 255, 0.04);
`;

const PageSelected = styled(PageHover)`
	background: rgba(255, 255, 255, 0.08);
`;

const PageCurrent = styled(motion.div)`
	position: absolute;
	left: 4px;
	width: 3px;
	top: 10px;
	height: 44px;
	border-radius: 3px;
	background-color: rgba(237, 0, 235, 1);
`;

const PageNumber = styled(motion.div)`
	position: absolute;
	left: 6px;
	width: 24px;
	top: 8px;
	height: 48px;
	line-height: 48px;
	font-size: 10px;
	font-weight: 500;
	color: white;
	text-align: center;
`;

const PageThumbnail = styled(motion.div)`
	position: absolute;
	left: 30px;
	top: 8px;
	width: 94px;
	height: 48px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.04);
	/* background: #141414; */
`;

const AddPageButtonInline = styled(motion.div)`
	width: 94px;
	height: 48px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.04);
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 2;
	margin: 8px 0 0 20px;
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

const iconColor = "white";
const iconVariants = {
	default: {
		opacity: 0.4,
		fill: iconColor,
	},
};

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
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
	const {
		editorState,
		selectedOutlinePage,
		setSelectedOutlinePage,
		pages,
		currentPage,
		setCurrentPage,
		permission,
		addPage,
	} = useContext(TomeContext);



	const scrollRef = useRef();

	return (
		<OutlineWrap animate={editorState} variants={editorModeVariants} transition={transitions.defaultTransition}>
			<AnimateSharedLayout>
				<Pages layout="position">
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
										isCurrent={currentPage === page}
										isSelected={selectedOutlinePage === page.id}
										onMouseUp={e => {
											setCurrentPage(page);
											setSelectedOutlinePage(page.id);
											e.stopPropagation();
										}}
										transition={transitions.defaultTransition}
									/> 

									{/* 
									<motion.div
										style={{
											width: 100,
											height: 100,
											overflow: "hidden",
										}}
									>
										<PageContent
											id="pageContent"
											key={page.id}
											style={{
												backgroundColor: colors.z1,
												marginLeft: 0,
												width: pageWidth,
												minHeight: minPageHeight,
												borderRadius: pageCornerRadius,
												display: "grid",
												gridTemplate: page.gridTemplate,
												columnGap: columnGap,
												rowGap: rowGap,
												scale: 100 / pageWidth,
												transformOrigin: "0% 0%",
											}}
											
											transition={transitions.layoutTransition}
										>
											{page.tiles.map(tile => (
												<Tile key={tile.id} tile={tile} />
											))}
										</PageContent>
									</motion.div>
									*/}

								</motion.div>
							))}
						</AnimatePresence>
					</PagesScrollView>
					<AnimatePresence>
						{permission === permissions.EDITOR && (
							<motion.div
								transition={transitions.defaultTransition}
								initial={{ opacity: 0, y: 50, scale: 0.3 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
							>
								<AddPageButtonInline
									layout="position"
									whileTap="active"
									whileHover="hover"
									initial={"default"}
									variants={pageVariants}
									onTap={addPage}
								>
									<AddPageButtonHover variants={hoverVariants} />
									<Icon size={28} name="Add" variants={iconVariants} />
								</AddPageButtonInline>
							</motion.div>
						)}
					</AnimatePresence>
				</Pages>
			</AnimateSharedLayout>
		</OutlineWrap>
	);
};

const Page = ({ number, isCurrent, isSelected, onMouseUp, transition }) => {
	return (
		<PageWrap
			onMouseUp={onMouseUp}
			whileTap="active"
			whileHover="hover"
			initial={"default"}
			variants={buttonVariants}
			transition={transition}
		>
			<PageSelected initial={false} animate={{ opacity: isSelected ? 1 : 0 }} transition={{ duration: 0.2 }} />
			<PageHover variants={hoverVariants} />
			<PageCurrent
				initial={false}
				animate={{ opacity: isCurrent ? 1 : 0 }}
				transition={{ duration: isCurrent ? 0.1 : 0.4 }}
			/>
			<PageNumber animate={{ opacity: isCurrent ? 1 : 0.4 }} transition={transition} layout>
				{number}
			</PageNumber>
			<PageThumbnail variants={pageVariants} />
		</PageWrap>
	);
};
