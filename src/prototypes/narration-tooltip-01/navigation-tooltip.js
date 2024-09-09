import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Tooltip = styled(motion.div)`
	position: absolute;
	bottom: 180px;
	right: 48px;

	display: flex;
	flex-basis: auto;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px 16px 11px;
	gap: 4px;

	background: #333333;
	box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
	pointer-events: none;
`;

const TooltipLabel = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 500;
	font-size: 15px;
	line-height: 20px;
	color: #ffffff;
	white-space: nowrap;
`;

export const NavigationTooltip = props => {
	const tooltipAnimation = useAnimation();
	const iconAnimation = useAnimation();

	React.useEffect(() => {
		tooltipAnimation.start({
			opacity: 1,
			scale: 1,
			transition: { type: "spring", duration: 0.35, delay: 0.5 },
		});
		setTimeout(() => {
			tooltipAnimation.start({
				scale: [1, 0.9, 1],

				transition: { ease: "easeInOut", duration: 0.4 },
			});
		}, 2000);
		
		setTimeout(() => {
			tooltipAnimation.start({
				opacity: 0,
				transition: { ease: "easeOut", duration: 1 },
			});
		}, 4000);
	}, []);

	return (
		<Tooltip
			initial={{ opacity: 0, scale: 0.5 }}
			animate={tooltipAnimation}
			//animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }}
			//transition={{ times: [0, 0.075, 0.9, 1], duration: 6, ease: "easeOut",  delay: 0.5}}
		>
			<TooltipLabel>Tap to continue</TooltipLabel>
			<motion.svg width="20" height="20" viewBox="0 0 20 20" animate={iconAnimation} style={{originX:1,}}>
				<path
					d="M12.0084 15.1427C11.7643 15.3871 11.3683 15.3874 11.1238 15.1432C10.8794 14.8991 10.8792 14.5031 11.1233 14.2586L14.7549 10.6315H3.75293C3.40775 10.6315 3.12793 10.3517 3.12793 10.0065C3.12793 9.66131 3.40775 9.38148 3.75293 9.38148H14.7443L11.1233 5.76489C10.8792 5.52047 10.8794 5.12443 11.1238 4.8803C11.3683 4.63617 11.7643 4.63641 12.0084 4.88083L16.7029 9.56974C16.9471 9.81336 16.9475 10.2088 16.7038 10.4529L16.7029 10.4538L12.0084 15.1427Z"
					fill="white"
				/>
			</motion.svg>
		</Tooltip>
	);
};
