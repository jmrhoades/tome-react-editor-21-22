import React, { useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { TomeContext, transitions } from "../tome/TomeContext";

const Wrap = styled(motion.div)``;

const Bars = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(4, 32px);
	column-gap: 4px;
	height: 3px;
`;

const Bar = styled(motion.div)`
	background-color: white;
	border-radius: 2px;
	transform-origin: 0 0;
`;

export const Progress = props => {
	const { pages, currentPage } = useContext(TomeContext);

	return (
		<Wrap>
			<AnimateSharedLayout>
				<Bars
					layout="position"
					transition={transitions.layoutTransition}
					style={{
						gridTemplateColumns: `repeat(${pages.length}, 32px)`,
						opacity: pages.length > 1 ? 1 : 0,
					}}
				>
					<AnimatePresence>
						{pages.map(page => (
							<Bar
								layout
								key={page.id}
								transition={transitions.layoutTransition}
								initial={{ opacity: 0, scaleX: 0 }}
								animate={{ opacity: 1, scaleX: 1 }}
								exit={{ opacity: 0}}
								style={{
									backgroundColor:
										currentPage.id === page.id ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
								}}
							/>
						))}
					</AnimatePresence>
				</Bars>
			</AnimateSharedLayout>
		</Wrap>
	);
};
