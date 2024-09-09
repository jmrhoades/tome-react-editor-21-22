import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

const Indicator = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 9999;
`;

const IndicatorGroup = styled(motion.div)`
	position: absolute;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 0;
	gap: 6px;
	border-radius: 8px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
`;

const Separator = styled(motion.div)`
	width: 1px;
	height: 16px;
	border-radius: 2px;
`;

const IconLabelGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 4px;
	gap: 4px;
	&.left {
		padding-left: 8px;
	}
	&.right {
		padding-right: 8px;
	}
`;

export const TileWidthIndicator = props => {
	const { metrics } = useContext(MetricsContext);

	const { pageMargin, columnWidth, columnGutter } = metrics;
	const { rowResizing, currentPage } = useContext(TomeContext);

	

	/*
	Colors
	*/
	const colors = {};
	colors.indicatorForeground = currentPage.theme.colors.controls.resize.indicatorForeground;
	colors.indicatorWarning = currentPage.theme.colors.controls.resize.indicatorWarning;
	const show = rowResizing && rowResizing.isResizingWidth;
	return (
		<Indicator
			style={{
				position: "fixed",
				left: 0,
				//top: 0,
				top: rowResizing ? rowResizing.indicatorY : undefined,
				//display: "none",
			}}
			animate={{
				x: 400
			}}
			transition={transitions.layoutTransition}
		>
			<IndicatorGroup
				initial={false}
				animate={{
					opacity: show ? 1 : 0,
					scale: show ? 1 : 0,
				}}
				transition={show ? transitions.instant : transitions.instant}
				style={{
					background:currentPage.theme.colors.controls.resize.indicatorBackground,
					boxShadow: currentPage.theme.shadows.small,
					// backdropFilter: "blur(50px)",
					left: "50%",
					x: "-50%",
					y: "-50%",
					paddingLeft: 4,
					paddingRight: 4,
				}}
			>
				<IconLabelGroup
					className="left"
					style={{
						color: rowResizing ? rowResizing.warningMinWidthColor : undefined,
					}}
				>
					0
				</IconLabelGroup>
				<Separator
					style={{
						backgroundColor: currentPage.theme.colors.t2,
					}}
				/>
				<IconLabelGroup
					className="right"
					style={{
						color: rowResizing ? rowResizing.warningMaxWidthColor  : undefined,
					}}
				>
					0
				</IconLabelGroup>
			</IndicatorGroup>
		</Indicator>
	);
};
