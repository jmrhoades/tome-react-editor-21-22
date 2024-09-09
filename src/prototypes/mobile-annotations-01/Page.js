import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import { colors } from "../../ds/Colors";
import { TomeContext } from "./TomeContext";

const Wrap = styled(motion.div)`
	position: relative;
`;

const PageBackground = styled(motion.div)`
	position: absolute;
	height: 100%;
	top: 0;
`;

const Tiles = styled(motion.div)`
	position: relative;
	height: 100%;
	& > div:first-child {
		margin-bottom: 14px;
	}
`;

const ExpandModeCatch = styled(motion.div)`
	position: absolute;
	left: 0;
	width: 100%;
	background-color: purple;
	opacity: 0;
`;

const HideAnnoCatch = styled(motion.div)`
	position: absolute;
	left: 0;
	width: 100%;
	background-color: pink;
	opacity: 0;
`;

export const Page = props => {
	const { expandedTileID, hideChrome, expandedTileAnimationComplete, activeAnnotationID } = useContext(TomeContext);
	const expandTileAnimation = useAnimation();

	const [shouldCatchHideChrome, setShouldCatchHideChrome] = useState(false);

	const paddingLeft = 14;
	const tilePaddingTop = 14;
	const tilePaddingLeft = 14;
	const tilePaddingRight = 14;
	const paddingRight = 15;

	useEffect(() => {
		expandedTileID.onChange(latest => {
			if (latest !== "") {
				expandTileAnimation.start({
					opacity: 0,
				});
				setShouldCatchHideChrome(true);
			} else {
				expandTileAnimation.start({
					opacity: 1,
				});
				setShouldCatchHideChrome(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Wrap
			style={{
				width: "100%",
				marginBottom: 82 + 8,
				height: 678,
			}}
		>
			<PageBackground
				style={{
					backgroundColor: colors.z1,
					borderRadius: 24,
					left: paddingLeft,
					right: paddingRight,
				}}
				animate={expandTileAnimation}
			/>

			<Tiles
				style={{
					paddingTop: tilePaddingTop,
					paddingLeft: paddingLeft + tilePaddingLeft,
					paddingRight: paddingRight + tilePaddingRight,
					display: props.layout === "2up" ? "block" : "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{props.children}

				<ExpandModeCatch
					style={{
						top: 0,
						height: props.layout === "2up" ? 170 : 244,
						pointerEvents: shouldCatchHideChrome ? "auto" : "none",
					}}
					onTap={e => {
						if (expandedTileAnimationComplete.get() === 1) {
							if (hideChrome.get() === 1) {
								hideChrome.set(0);
							} else {
								hideChrome.set(1);
							}
						}
					}}
				/>
				<HideAnnoCatch
					style={{
						top: 0,
						height: 260,
						pointerEvents: !shouldCatchHideChrome && props.layout === "responsive" ? "auto" : "none",
					}}
					onTap={e => {
						console.log("go");
						activeAnnotationID.set("");
					}}
				/>
				<HideAnnoCatch
					style={{
						bottom: 0,
						height: 260,
						pointerEvents: !shouldCatchHideChrome && props.layout === "responsive" ? "auto" : "none",
					}}
					onTap={e => {
						activeAnnotationID.set("");
					}}
				/>

				<ExpandModeCatch
					style={{
						bottom: 0,
						height: props.layout === "2up" ? 170 : 244,
						pointerEvents: shouldCatchHideChrome ? "auto" : "none",
					}}
					onTap={e => {
						if (expandedTileAnimationComplete.get() === 1) {
							if (hideChrome.get() === 1) {
								hideChrome.set(0);
							} else {
								hideChrome.set(1);
							}
						}
					}}
				/>
			</Tiles>
		</Wrap>
	);
};
