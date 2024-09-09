import React, { useContext } from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { TomeContext, transitions } from "../tome/TomeContext";
import { MetricsContext } from "../metrics/MetricsContext";

const Wrap = styled(motion.div)`
	display: flex;
	justify-content: center;
	width: 100%;
	position: relative;
`;

const Bars = styled(motion.div)`
	display: flex;
	justify-content: center;
	flex-wrap: nowrap;
	flex-direction: row;
	width: 100%;
`;

const Bar = styled(motion.div)`
	border-radius: 2px;
	transform-origin: 50% 0;
	height: 3px;
	width: 32px;
	margin: 0 2px;
`;

export const Progress = props => {
	const { pages, currentPage, showComments } = useContext(TomeContext);
	const { pageWidth } = useContext(MetricsContext).metrics;

	return (
		<Wrap
			style={{
				width: showComments ? "calc(100% - 328px)" : "100%",
				y: -24,
			}}
		>
			<AnimateSharedLayout>
				<Bars
					layout
					transition={transitions.layoutTransition}
					style={{
						// gridTemplateColumns: `repeat(${pages.length}, 32px)`,
						opacity: pages.length > 1 ? 1 : 0,
						width: pageWidth,
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
								exit={{ opacity: 0 }}
								style={{
									backgroundColor:
										currentPage.id === page.id ? "rgba(255,255,255,.8)" : "rgba(255,255,255,0.25)",
								}}
							/>
						))}
					</AnimatePresence>
				</Bars>
			</AnimateSharedLayout>
		</Wrap>
	);
};
