import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";

import { Icon } from "../../../ds/Icon";
import { transitions } from "../../../ds/Transitions";
import { TomeContext, permissions } from "../tome/TomeContext";
import { OutlinePage, OutlinePageHeight, OutlinePageWidth } from "./OutlinePage";
import { colors } from "../../../ds/Colors";

const OutlineComponentWidth = 114;

const OutlineWrap = styled(motion.div)``;

const PagesScroller = styled(motion.div)`
	/* display: flex;
	align-items: center;
	flex-direction: column; */
	position: relative;
	overflow-y: auto;
	max-height: 100vh;
	overscroll-behavior-y: contain;
	overflow-x: hidden;
	::-webkit-scrollbar { 
    	display: none;  /* Safari and Chrome */
	}
}
`;

const AddPageContainer = styled(motion.div)`
	pointer-events: none;
	background: linear-gradient(
		to top,
		hsl(0, 0%, 4%) 0%,
		hsla(0, 0%, 4%, 0.987) 8.1%,
		hsla(0, 0%, 4%, 0.951) 15.5%,
		hsla(0, 0%, 4%, 0.896) 22.5%,
		hsla(0, 0%, 4%, 0.825) 29%,
		hsla(0, 0%, 4%, 0.741) 35.3%,
		hsla(0, 0%, 4%, 0.648) 41.2%,
		hsla(0, 0%, 4%, 0.55) 47.1%,
		hsla(0, 0%, 4%, 0.45) 52.9%,
		hsla(0, 0%, 4%, 0.352) 58.8%,
		hsla(0, 0%, 4%, 0.259) 64.7%,
		hsla(0, 0%, 4%, 0.175) 71%,
		hsla(0, 0%, 4%, 0.104) 77.5%,
		hsla(0, 0%, 4%, 0.049) 84.5%,
		hsla(0, 0%, 4%, 0.013) 91.9%,
		hsla(0, 0%, 4%, 0) 100%
	);
`;

const AddPageButton = styled(motion.div)`
	pointer-events: auto;
`;

const AddPageButtonHover = styled(motion.div)`
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
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
		setSelectedTile,
		currentPage,
		setCurrentPage,
		permission,
		addPage,
		tomeData,
	} = useContext(TomeContext);

	const scrollRef = useRef();
	const borderRadius = 3;

	return (
		<OutlineWrap
			animate={editorState}
			variants={editorModeVariants}
			transition={transitions.defaultTransition}
			style={{
				width: OutlineComponentWidth,
				top: 0,
				bottom: 0,
				left: 0,
				position: "fixed",
				display: "flex",
				alignItems: "center",
			}}
		>
			<AnimateSharedLayout>
				<PagesScroller
					layout="position"
					style={{
						paddingTop: 64,
						paddingRight: 2,
					}}
					ref={scrollRef}
				>
					{tomeData.pages.map(page => (
						<motion.div
							key={page.id}
							transition={transitions.layoutTransition}
							initial={{ opacity: 0, y: 50, scale: 0.3 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
							style={{
								flexShrink: 0,
							}}
						>
							<OutlinePage
								key={page.id}
								tomeData={tomeData}
								page={page}
								number={page.order}
								isCurrent={currentPage === page}
								isSelected={selectedOutlinePage === page}
								onMouseUp={e => {
									setCurrentPage(page);
									setSelectedOutlinePage(page);
									setSelectedTile(null);
									// window.scrollTo({top:0, left:0});
								}}
								transition={transitions.layoutTransition}
								borderRadius={borderRadius}
							/>
						</motion.div>
					))}

					{permission === permissions.EDITOR && (
						<AddPageContainer
							style={{
								flexShrink: 0,
								zIndex: 2,
								padding: 0,
								marginTop: -54,
								position: "sticky",
								bottom: 0,
								height: 112,
								// backgroundColor: colors.z0,
							}}
						>
							<AddPageButton
								layout="position"
								whileTap="active"
								whileHover="hover"
								initial={"default"}
								variants={addButtonVariants}
								onTap={addPage}
								style={{
									position: "absolute",
									height: OutlinePageHeight,
									width: OutlinePageWidth,
									bottom: 16,
									left: 28,
									borderRadius: borderRadius,
									background: colors.z1,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									boxShadow: `0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
		0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
		0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)`,
								}}
							>
								<AddPageButtonHover
									variants={hoverVariants}
									style={{
										borderRadius: borderRadius,
									}}
								/>
								<Icon size={24} name="Add" variants={iconVariants} />
							</AddPageButton>
						</AddPageContainer>
					)}
				</PagesScroller>
			</AnimateSharedLayout>
		</OutlineWrap>
	);
};
