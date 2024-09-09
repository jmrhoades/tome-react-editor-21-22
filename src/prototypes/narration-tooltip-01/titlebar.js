import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.div)`
	width: 390px;
	height: 62px;
	position: absolute;
	top: 44px;
	left: 0;
	/* pointer-events: none; */
	/* background-image: url("/images/narration-mobile-header-01.png"); */
	/* background-size: 390px 62px; */
`;

const Paging = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 24px 0px;
	gap: 4px;
`;

const TopBar = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 24px;
	width: 100%;
	height: 52px;
`;

const Title = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
`;

const TryTome = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 6px;
`;

export const Titlebar = props => {
	return (
		<Wrap
		//initial={{ opacity: 0 }}
		//animate={{ opacity: 1 }}
		//transition={{ delay: 0.75, duration: 0 }}
		>
			<Paging>
				{props.pages.map(page => (
					<PageIndicator key={page.id} page={page} currentPage={props.currentPage} />
				))}
			</Paging>
			<TopBar
				style={{
					color: props.currentPage.theme.contrast40,
				}}
			>
				<Title>Tap to advance test</Title>
				<TryTome>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path
							d="M17.9007 8.27719L16.316 2.61437C16.2539 2.39243 16.1357 2.19023 15.9727 2.02726C15.8098 1.86429 15.6076 1.74606 15.3856 1.68394L9.72266 0.0992488C9.24972 -0.0330829 8.74954 -0.0330829 8.27661 0.0992488L2.61453 1.68372C2.39255 1.7458 2.19031 1.86402 2.0273 2.02699C1.86429 2.18996 1.74602 2.39218 1.68389 2.61415L0.0992163 8.27719C-0.0330721 8.75006 -0.0330721 9.25016 0.0992163 9.72303L1.68322 15.3861C1.74541 15.6081 1.86378 15.8104 2.02691 15.9734C2.19004 16.1363 2.39243 16.2545 2.61453 16.3165L8.27773 17.9008C8.75066 18.0331 9.25084 18.0331 9.72377 17.9008L15.3863 16.3165C15.6083 16.2544 15.8105 16.1361 15.9735 15.9731C16.1364 15.8101 16.2546 15.6078 16.3167 15.3859L17.9007 9.72303C18.0331 9.25017 18.0331 8.75005 17.9007 8.27719ZM16.4332 9.63269L9.63232 16.4337C9.54927 16.5167 9.45066 16.5826 9.34215 16.6276C9.23363 16.6725 9.11732 16.6957 8.99986 16.6957C8.8824 16.6957 8.76609 16.6725 8.65757 16.6276C8.54905 16.5826 8.45045 16.5167 8.3674 16.4337L1.5665 9.63269C1.48344 9.54964 1.41756 9.45104 1.3726 9.34252C1.32765 9.234 1.30452 9.11769 1.30452 9.00022C1.30452 8.88276 1.32765 8.76645 1.3726 8.65793C1.41756 8.54941 1.48344 8.45081 1.5665 8.36775L8.3674 1.56655C8.45045 1.48349 8.54905 1.4176 8.65757 1.37265C8.76609 1.3277 8.8824 1.30457 8.99986 1.30457C9.11732 1.30457 9.23363 1.3277 9.34215 1.37265C9.45066 1.4176 9.54927 1.48349 9.63232 1.56655L16.4332 8.36775C16.5163 8.45081 16.5822 8.54941 16.6271 8.65793C16.6721 8.76645 16.6952 8.88276 16.6952 9.00022C16.6952 9.11769 16.6721 9.234 16.6271 9.34252C16.5822 9.45104 16.5163 9.54964 16.4332 9.63269V9.63269Z"
							fill={props.currentPage.theme.contrast40}
						/>
					</svg>
					Try Tome
				</TryTome>
			</TopBar>
		</Wrap>
	);
};

const Indicator = styled(motion.div)`
	height: 2px;

	border-radius: 4px;
	/* Inside auto layout */
	flex: none;
	order: 0;
	flex-grow: 1;
`;
const PageIndicator = props => {
	const visited = props.page.order <= props.currentPage.order;

	const theme = props.currentPage.theme;
	console.log(props.currentPage.theme.contrast60, props.currentPage.theme.contrast16);
	return (
		<Indicator
			style={{
				background: visited ? theme.contrast60 : theme.contrast16,
			}}
		></Indicator>
	);
};
