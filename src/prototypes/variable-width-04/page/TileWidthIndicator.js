import React, { useContext } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

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
	const { rowResizing } = useContext(TomeContext);

	const leftTile = props.tiles[0];
	const rightTile = props.tiles[1];
	const firstTile = props.tiles[0];
	let handleLeft = pageMargin + columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
	if (props.order === 2) {
		const secondTile = props.tiles[1];
		handleLeft += columnGutter + columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
	}

	/*
	Colors
	*/
	const colors = {};
	colors.indicatorForeground = props.page.theme.colors.controls.resize.indicatorForeground;
	colors.indicatorWarning = props.page.theme.colors.controls.resize.indicatorWarning;
	const warningMinWidthColor = useMotionValue(colors.indicatorForeground);
	const warningMaxWidthColor = useMotionValue(colors.indicatorForeground);
	const show = rowResizing && rowResizing.id === props.row.id && rowResizing.isResizingWidth;
	return (
		<Indicator
			style={{
				position: "fixed",
				left: 0,
				//top: 0,
				top: rowResizing ? rowResizing.indicatorY : undefined,
				display: "none",
			}}
			animate={{
				x: handleLeft + columnGutter / 2,
			}}
			transition={transitions.layoutTransition}
		>
			<IndicatorGroup
				initial={false}
				animate={{
					opacity: show ? 1 : 0,
					scale: show ? 1 : 0,
				}}
				transition={show ? transitions.basic : transitions.instant}
				style={{
					background: props.page.theme.colors.controls.resize.indicatorBackground,
					boxShadow: props.page.theme.shadows.small,
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
					{leftTile.width}
				</IconLabelGroup>
				<Separator
					style={{
						backgroundColor: props.page.theme.colors.t2,
					}}
				/>
				<IconLabelGroup
					className="right"
					style={{
						color: rowResizing ? rowResizing.warningMaxWidthColor  : undefined,
					}}
				>
					{rightTile.width}
				</IconLabelGroup>
			</IndicatorGroup>
		</Indicator>
	);
};
