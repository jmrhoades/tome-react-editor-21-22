import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import GridLayout from "react-grid-layout";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { TextTile } from "./TextTile";

const Wrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
	/* background-color: cornflowerblue; */
`;

const PageContent = styled(motion.div)`
	position: relative;
	overflow: hidden;
	pointer-events: none;
`;

const TestTile = styled(motion.div)`
	position: relative;
	pointer-events: auto;
`;

const SelectedOutline = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-style: solid;
	border-color: #ed00eb;
	box-sizing: border-box;
	box-shadow: inset 0px 0px 0px 4px #141414;
`;

export const Page = props => {
	const { pageWidth, pageLeft, pageTop, minPageHeight, pageCornerRadius, scale } = useContext(MetricsContext).metrics;
	const { selectedTile, setSelectedTile } = useContext(TomeContext);
	const isSelected = selectedTile && selectedTile === "a";

	return (
		<Wrap
			style={{
				paddingTop: pageTop,
				paddingBottom: pageTop,
			}}
		>
			<PageContent
				style={{
					backgroundColor: colors.z1,
					marginLeft: pageLeft,
					width: pageWidth,
					borderRadius: pageCornerRadius,
					minHeight: minPageHeight,
				}}
			>
				<GridLayout className="layout" cols={12} rowHeight={scale*46} width={pageWidth} compactType={'horizontal'} >
					<TestTile
						key="a"
						data-grid={{ x: 0, y: 0, w: 12, h: 2, resizeHandles:['s'] }}
						onTap={() => {
							setSelectedTile("a");
						}}
					>
						<TextTile isSelected={isSelected} />
						<SelectedOutline
							style={{
								borderWidth: 3,
								borderRadius: isSelected ? pageCornerRadius : 0,
								boxShadow: `inset 0px 0px 0px 2px #141414`,
								borderColor: colors.accent,
								opacity: isSelected ? 1 : 0,
							}}
						/>
					</TestTile>
				</GridLayout>
			</PageContent>
		</Wrap>
	);
};
