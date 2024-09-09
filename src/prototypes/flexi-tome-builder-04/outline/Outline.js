import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { Icon } from "../../../ds/Icon";
import { transitions } from "../../../ds/Transitions";
import { TomeContext, permissions } from "../tome/TomeContext";
import { TitleBarHeight } from "../titlebar/Titlebar";
import { OutlinePage } from "./OutlinePage";

const OutlineComponentWidth = 134;

const OutlineWrap = styled(motion.div)`
	position: fixed;
	left: 0;
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
	overflow-y: auto;
	::-webkit-scrollbar-thumb {
		background-color: #aaa;
	}
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


const addButtonVariants = {
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
		currentPage,
		setCurrentPage,
		permission,
		addPage,
		tomeData,
	} = useContext(TomeContext);

	const scrollRef = useRef();

	return (
		<OutlineWrap
			animate={editorState}
			variants={editorModeVariants}
			transition={transitions.defaultTransition}
			style={{
				width: OutlineComponentWidth,
				top: TitleBarHeight,
				bottom: 0,
			}}
		>
			<AnimateSharedLayout>
				<Pages layout="position">
					<PagesScrollView
						ref={scrollRef}
						style={{
							maxHeight: "calc(100vh - 166px)",
						}}
					>
						<AnimatePresence>
							{tomeData.pages.map(page => (
								<motion.div
									key={page.id}
									transition={transitions.defaultTransition}
									initial={{ opacity: 0, y: 50, scale: 0.3 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
								>
									<OutlinePage
										key={page.id}
										tomeData={tomeData}
										page={page}
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
									variants={addButtonVariants}
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


