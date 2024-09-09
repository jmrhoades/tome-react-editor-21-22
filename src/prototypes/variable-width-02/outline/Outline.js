import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import { Icon } from "../../../ds/Icon";
import { transitions } from "../../../ds/Transitions";
import { TomeContext } from "../tome/TomeContext";
//import { MetricsContext } from "../tome/MetricsContext";
import { OutlinePage, OutlinePageHeight, OutlinePageWidth, outlineCornerRadius } from "./OutlinePage";


const OutlineComponentWidth = 128;

const OutlineWrap = styled(motion.div)`
	margin-left: 1px;
	user-select: none; 
`;

const PagesScroller = styled(motion.div)`
	/* display: flex;
	align-items: center;
	flex-direction: column; */
	position: relative;
	overflow-x: visible;
	overflow-y: auto;
	max-height: 100vh;
	overscroll-behavior-y: contain;
	pointer-events: none;
	::-webkit-scrollbar { 
    	display: none;  /* Safari and Chrome */
	}
}
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

	//const [scrimOpacity, setScrimOpacity] = useState(0);
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
					paddingTop: 64,
					paddingBottom: 64,
					pointerEvents: "auto",
					overflowX: "visible",
					paddingRight: 2,
				}}
				//ref={scrollRef}
				transition={transitions.layoutTransition}
			>
				{tomeData.pages.map((page, i) => (
					<motion.div
						key={"outline_page_wrap_" + page.id}
						transition={transitions.layoutTransition}
						initial={{ opacity: 0, y: 0, scale: 0 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						style={{
							flexShrink: 0,
							pointerEvents: "auto",
							// position: "sticky",
							// bottom: -64 + 8,
							// zIndex: 999 - i,
						}}
					>
						<OutlinePage
							id={"outline_page_" + page.id}
							tomeData={tomeData}
							currentPage={currentPage}
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

				<AddPageButton
					whileTap="active"
					whileHover="hover"
					initial={"default"}
					variants={addButtonVariants}
					onTap={addPage}
					style={{
						height: OutlinePageHeight,
						width: OutlinePageWidth,
						position: "relative",
						borderRadius: outlineCornerRadius,
						background: currentPage.theme.colors.backgrounds.newPage,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						marginLeft: 28,
						marginTop: 8,

						// position: "sticky",
						// 	bottom: -64 + 8,
						// 	zIndex: 999,
					}}
				>
					<AddPageButtonHover
						variants={hoverVariants}
						style={{
							borderRadius: outlineCornerRadius,
							background: currentPage.theme.colors.t1,
						}}
					/>
					<Icon size={24} name="Add" variants={iconVariants} color={currentPage.theme.colors.t7} opacity={1} />
				</AddPageButton>
			</PagesScroller>
		</OutlineWrap>
	);
};
