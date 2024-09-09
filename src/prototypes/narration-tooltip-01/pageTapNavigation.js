import React from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Back = styled(motion.div)`
	position: absolute;
	width: 40%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Gradient = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.00441837) 8.07%, rgba(0, 0, 0, 0.017427) 15.54%, rgba(0, 0, 0, 0.038656) 22.5%, rgba(0, 0, 0, 0.0677357) 29.04%, rgba(0, 0, 0, 0.104296) 35.26%, rgba(0, 0, 0, 0.147968) 41.25%, rgba(0, 0, 0, 0.198381) 47.1%, rgba(0, 0, 0, 0.255166) 52.9%, rgba(0, 0, 0, 0.317952) 58.75%, rgba(0, 0, 0, 0.38637) 64.74%, rgba(0, 0, 0, 0.460051) 70.96%, rgba(0, 0, 0, 0.538624) 77.5%, rgba(0, 0, 0, 0.62172) 84.46%, rgba(0, 0, 0, 0.708968) 91.93%, rgba(0, 0, 0, 0.8) 100%);
	);
`;

const Forward = styled(motion.div)`
	position: absolute;
	width: 60%;
	height: 100%;
	top: 0;
	left: 40%;
	/* background: green; */
	/* opacity: 0.2; */
`;

export const PageTapNavigation = props => {
	//const data = props.page;
	//const isSelected = props.currentPage.id === data.id;

	const prevPage = e => {
		const prevOrder = props.currentPage.order - 1;
		const prevPage = props.pages.find(p => p.order === prevOrder);
		if (prevPage) {
			props.setCurrentPage(prevPage);
		}
	};

	const nextPage = e => {
		const nextOrder = props.currentPage.order + 1;
		const nextPage = props.pages.find(p => p.order === nextOrder);
		if (nextPage) {
			props.setCurrentPage(nextPage);
		}
	};
	const backGradientAnimation = useAnimation();

	return (
		<Wrap>
			<Back
				onTap={prevPage}
				onMouseDown={e => {
					backGradientAnimation.start({
						opacity: props.currentPage.theme.mode === "dark" ? 0.5 : 0.15,
						transition: { type: "tween", duration: 0.2 },
					});
				}}
				onMouseUp={e => {
					backGradientAnimation.start({
						opacity: 0,
						transition: { type: "tween", duration: 0.2 },
					});
				}}
			>
				<Gradient initial={{ opacity: 0 }} animate={backGradientAnimation} />
			</Back>
			<Forward onTap={nextPage} />
		</Wrap>
	);
};
