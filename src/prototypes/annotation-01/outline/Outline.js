import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { defaultLayoutTransition } from "../index";
import { Icon } from "../../../ds/Icon";

const OutlineWrap = styled(motion.div)`
	position: absolute;
	left: 0;
	top: 0px;
	bottom: 0px;
	display: flex;
	align-items: center;
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
	background: rgba(255, 255, 255, 0.08	);
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
	background: #141414;
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

// const pages = [1, 2, 3, 4, 5];

export const Outline = props => {
	const [pages, setPages] = useState([{ id: Math.random(), order: 1 }]);
	const [current, setCurrent] = useState(pages[0].id);
	const scrollRef = useRef();

	const addPage = () => {
		console.log("addPage", pages);

		// Find the current page
		const currentPage = pages.find(({ id }) => id === current);

		// Insert new page after current page
		const newPage = { id: Math.random(), order: currentPage.order + 1 };
		const index = pages.indexOf(currentPage);
		pages.splice(index + 1, 0, newPage);

		// Increment order value for every page after new page
		for (let i = 0; i < pages.length; i++) {
			if (index + 1 < i) {
				pages[i].order++;
			}
		}

		// Sort array by order
		pages.sort(function (a, b) {
			return a.order - b.order;
		});

		// Set current page to new page
		setCurrent(newPage.id);
		setPages(pages);
	};

	return (
		<OutlineWrap animate={props.editorState} variants={editorModeVariants} transition={defaultLayoutTransition}>
			<AnimateSharedLayout>
				<Pages layout="position">
					<PagesScrollView ref={scrollRef}>
						<AnimatePresence>
							{pages.map(page => (
								<motion.div
									key={page.id}
									transition={defaultLayoutTransition}
									initial={{ opacity: 0, y: 50, scale: 0.3 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
								>
									<Page
										key={page.id}
										number={page.order}
										isCurrent={current === page.id}
										isSelected={props.selectedOutlinePage === page.id}
										onMouseUp={e => {
											setCurrent(page.id);
											props.setSelectedOutlinePage(page.id);
											e.stopPropagation();
										}}
									/>
								</motion.div>
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
					>
						<AddPageButtonHover variants={hoverVariants} />
						<Icon size={28} name="Add" variants={iconVariants} />
					</AddPageButtonInline>
				</Pages>
			</AnimateSharedLayout>
		</OutlineWrap>
	);
};

const Page = ({ number, isCurrent, isSelected, onMouseUp }) => {
	return (
		<PageWrap
			onMouseUp={onMouseUp}
			whileTap="active"
			whileHover="hover"
			initial={"default"}
			variants={buttonVariants}
			transition={defaultLayoutTransition}
		>
			<PageSelected
				initial={false}
				animate={{ opacity: isSelected ? 1 : 0 }}
				transition={{ duration: 0.2 }}
			/>
			<PageHover variants={hoverVariants} />
			<PageCurrent
				initial={false}
				animate={{ opacity: isCurrent ? 1 : 0 }}
				transition={{ duration: isCurrent ? 0.1 : 0.4 }}
			/>
			<PageNumber animate={{ opacity: isCurrent ? 1 : 0.4 }} transition={defaultLayoutTransition} layout>
				{number}
			</PageNumber>
			<PageThumbnail variants={pageVariants} />
		</PageWrap>
	);
};
