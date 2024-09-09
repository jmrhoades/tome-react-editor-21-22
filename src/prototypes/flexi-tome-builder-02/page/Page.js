import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import GridLayout from "react-grid-layout";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { TextTile } from "./TextTile";
import { ImageTile } from "./ImageTile";
import { transitions } from "../../../ds/Transitions";

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

export const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
};


export const Page = props => {
	const { pageWidth, pageLeft, pageTop, minPageHeight, pageCornerRadius } = useContext(MetricsContext).metrics;
	const { selectedTile, setSelectedTile } = useContext(TomeContext);
	const isASelected = selectedTile && selectedTile === "a";
	const isBSelected = selectedTile && selectedTile === "b";

	const layout = [
		{ i: "tileA", x: 0, y: 0, w: 6, h: 4, minW: 1, maxW: 12, isBounded: true },
		{ i: "tileB", x: 6, y: 0, w: 6, h: 9, minW: 1, maxW: 12, isBounded: true  },
	];

	const tileBlocksA = [
		{
			type: textBlockType.H1,
			content: "The Dolomites",
		},
		{
			type: textBlockType.P,
			content: `Marmolada is a mountain in northeastern Italy and the highest mountain of the
				Dolomites (a section of the Alps). It lies between the borders of Trentino and
				Veneto. The Marmolada is an ultra-prominent peak (Ultra).`,
		},
	];

	return (
		<Wrap
			style={{
				paddingTop: pageTop,
				paddingBottom: pageTop,
			}}
			transition={transitions.layoutTransition}
			layout
		>
			<PageContent
			transition={transitions.layoutTransition}
			layout
				style={{
					backgroundColor: colors.z1,
					marginLeft: pageLeft,
					width: pageWidth,
					borderRadius: pageCornerRadius,
					minHeight: minPageHeight,
				}}
			>
				<GridLayout
					className="layout"
					cols={12}
					rowHeight={minPageHeight / 9}
					width={pageWidth}
					compactType={"vertical"}
					containerPadding={[0, 0]}
					margin={[0, 0]}
					layout={layout}
				>
					<TestTile
						key="tileA"
						onTap={() => {
							setSelectedTile("a");
						}}
						style={{
							// backgroundColor: "#FD5634",
							borderRadius: isASelected ? pageCornerRadius : 0,
						}}
					>
						<TextTile isSelected={isASelected} blocks={tileBlocksA}/>
						<SelectedOutline
							style={{
								borderWidth: 3,
								borderRadius: isASelected ? pageCornerRadius : 0,
								boxShadow: `inset 0px 0px 0px 2px #141414`,
								borderColor: colors.accent,
								opacity: isASelected ? 1 : 0,
							}}
						/>
					</TestTile>
					<TestTile
						key="tileB"
						onTap={() => {
							setSelectedTile("b");
						}}
						style={{
							// backgroundColor: "#FFD120",
							borderRadius: isBSelected ? pageCornerRadius : 0,
							overflow: "hidden",
						}}
					>
						<ImageTile image={"/images/ds-image-square-mountains-1.jpg"} />
						<SelectedOutline
							style={{
								borderWidth: 3,
								borderRadius: isBSelected ? pageCornerRadius : 0,
								boxShadow: `inset 0px 0px 0px 2px #141414`,
								borderColor: colors.accent,
								opacity: isBSelected ? 1 : 0,
							}}
						/>
					</TestTile>
				</GridLayout>
			</PageContent>
		</Wrap>
	);
};
