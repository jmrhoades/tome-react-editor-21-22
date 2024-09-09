import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "../../../ds/Icon";
import { transitions } from "../../../ds/Transitions";
import { TomeContext } from "../tome/TomeContext";

import { OutlinePage, OutlinePageHeight, OutlinePageWidth, outlineCornerRadius } from "./OutlinePage";
import { colors } from "../ds/Colors";

const OutlineComponentWidth = 128;

const OutlineWrap = styled(motion.div)``;

const PagesScroller = styled(motion.div)`
	/* display: flex;
	align-items: center;
	flex-direction: column; */
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	max-height: 100vh;
	overscroll-behavior-y: contain;
	
	::-webkit-scrollbar { 
    	display: none;  /* Safari and Chrome */
	}
}
`;

const AddPageContainer = styled(motion.div)`
	pointer-events: none;
`;

const AddPageScrim = styled(motion.div)`
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
	const { isPlayMode, selectedOutlinePage, selectOutlinePage, currentPage, addPage, tomeData } =
		useContext(TomeContext);

		// const {
		// 	viewportHeight
		// } = useContext(MetricsContext).metrics;

	//const scrollRef = useRef();

	/* eslint-disable no-unused-vars */
	const [scrimOpacity, setScrimOpacity] = useState(0);
	//const { scrollYProgress } = useElementScroll(scrollRef)

	/*
	// Checks whether or not list is "overflowed" or not
	// check when page data changes or when viewport resizes
	const checkOverflow = () => {
		if (scrollRef.current) {
			const sH = scrollRef.current.scrollHeight - 20;
			const cH = scrollRef.current.clientHeight;
			if (sH > cH) {
				setScrimOpacity(1);
			} else if (sH <= cH) {
				setScrimOpacity(0);
			}
			// console.log("Is overflowed ", isOverflowed, sH, cH);
		}
	}
	useEffect(() => {
		checkOverflow();
	}, [scrollRef, tomeData, viewportHeight]);
	*/

	/*
	// Listen for scroll events
	// if the list is scrolled, show the scrim
	// if the list is all the way scrolled, hide the scrim
	useEffect(() => {
		function updateOpacity() {
		  const p = scrollYProgress.get();
		  if (p === 1) {
			setScrimOpacity(0);
		  } else {
			setScrimOpacity(1);
		  }
		}
		const unsubscribe = scrollYProgress.onChange(updateOpacity)
		return () => {
			unsubscribe()
		}
	  }, [scrollYProgress])
	  */
	  

	return (
		<OutlineWrap
			// animate={editorState}
			// variants={editorModeVariants}
			animate={{
				opacity: isPlayMode ? 0 : 1,
			}}
			initial={false}
			transition={transitions.playModeFade}
			style={{
				width: OutlineComponentWidth,
				top: 0,
				bottom: 0,
				left: 0,
				position: "fixed",
				display: "flex",
				alignItems: "center",
				pointerEvents: "none",
			}}

		>
			
				<PagesScroller
					//layout
					style={{
						marginTop: 64,
						pointerEvents: "auto",
					}}
					//ref={scrollRef}
					transition={transitions.layoutTransition}
				>
					{tomeData.pages.map((page, i) => (
						<motion.div
							key={page.id}
							transition={transitions.layoutTransition}
							initial={{ opacity: 0, y: 0, scale: 0 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							style={{
								flexShrink: 0,
								pointerEvents: "auto",
								// position: "sticky",
								// bottom: 60,
								// zIndex: 999 - i,
							}}
						>
							<OutlinePage
								tomeData={tomeData}
								page={page}
								number={page.order}
								isCurrent={currentPage === page}
								isSelected={selectedOutlinePage === page}
								onMouseUp={e => {
									selectOutlinePage(page);
								}}
								transition={transitions.layoutTransition}
							/>
						</motion.div>
					))}

					{/* {permission === permissions.EDITOR && ( */}
						<AddPageContainer
							style={{
								flexShrink: 0,
								zIndex: 1000,
								padding: 0,
								marginTop: -44,
								position: "sticky",
								bottom: 0,
								height: 112,
							}}
							//layout
							transition={transitions.layoutTransition}
						>
							<motion.div 
								style={{
									position: "absolute",
									bottom: 0,
									left: 0,
									width: "100%",
									height: 56,
									backgroundColor: colors.z0,
									
								}}
								animate={{
									opacity: scrimOpacity,
								}}
								transition={transitions.layoutTransition}
								initial={false}
							/>
							<AddPageScrim
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: 56,
									opacity: scrimOpacity,
								}}
								animate={{
									opacity: scrimOpacity,
								}}
								transition={transitions.layoutTransition}
								initial={false}
							/>

							<AddPageButton
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
									borderRadius: outlineCornerRadius,
									background: colors.z1,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.25)",
								}}
							>
								<AddPageButtonHover variants={hoverVariants} style={{
					
									borderRadius: outlineCornerRadius}} />
								<Icon size={24} name="Add" variants={iconVariants} />
							</AddPageButton>
						</AddPageContainer>
					{/* )} */}
				</PagesScroller>
			
		</OutlineWrap>
	);
};
