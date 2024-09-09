import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../../tome/TomeContext";
import { Icon } from "../../../../ds/Icon";

export const segmentType = {
	ICON: "icon",
	LABEL: "label",
};

const Wrap = styled(motion.div)`
	position: relative;
	display: flex;
	overflow: hidden;
	height: 28px;
	border-radius: 8px;
`;

const Item = styled(motion.div)`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	& > * {
		position: relative;
	}
	&:hover {
		cursor: pointer;
	}
`;

const Label = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
	color: ${props => props.theme_color};
	pointer-events: none;
`;

const HoverBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/* top: 4px;
	left: 4px;
	bottom: 4px;
	right: 4px;
	border-radius: 4px;
	background: ${props => props.theme_color}; */
`;

const SelectedBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/* border-radius: 8px; */
	/* background: ${props => props.theme_color}; */
	/* box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1); */
`;

export const Segmented = props => {
	const { tomeData, setTomeData, selectedTile } = useContext(TomeContext);

	// const [selectedIndex, setSelectedIndex] = useState(0);
	//let selectedIndex = 0;
	//console.log(selectedTile)

	//alignmentX: alignmentX.LEFT,
	/*
	const data = [
		{
			type: segmentType.ICON,
			iconName: "AlignLeft",
			label: "Align Left",
			value: "left",
		},
		{
			type: segmentType.ICON,
			iconName: "AlignCenter",
			label: "Align Center",
			value: "center",
		},
		{
			type: segmentType.ICON,
			iconName: "AlignRight",
			label: "Align Right",
			value: "right",
		},
	];
    */

	return (
		<Wrap
			style={{
				background: "transparent",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: props.theme.colors.controls.border,
			}}
		>
			{props.data.map((item, i) => (
				<Item
					key={props.id + "_segment_" + i}
					onTap={() => {
						selectedTile.params[props.target] = item.value;
						setTomeData({ ...tomeData });
					}}
				>
					<HoverBackground
						style={{
							background: props.targetValue === item.value ? props.theme.colors.t0 : props.theme.colors.t2,
						}}
						whileHover={{
							background: props.targetValue === item.value ? props.theme.colors.t0 : props.theme.colors.t3,
						}}
						transition={{ type: "tween", duration: 0.3 }}
					/>

					<SelectedBackground
						style={{
							background: props.theme.colors.controls.selected,
							pointerEvents: "none",
						}}
						animate={{
							opacity: props.targetValue === item.value ? 1 : 0,
						}}
						initial={false}
						transition={{ type: "tween", duration: 0.3 }}
					/>

					{item.type === segmentType.ICON && (
						<Icon
							name={item.iconName}
							opacity={1}
							size={24}
							color={props.targetValue === item.value ? props.theme.colors.t9 : props.theme.colors.t7}
							transition={{
								type: "tween",
								duration: props.targetValue === item.value ? 0.3 : 0.3,
							}}
						/>
					)}

					{item.type === segmentType.LABEL && (
						<Label
							theme_color={props.theme.colors.t9}
							initial={false}
							animate={{
								color: props.targetValue === item.value ? props.theme.colors.t9 : props.theme.colors.t7,
							}}
							transition={{
								type: "tween",
								duration: props.targetValue === item.value ? 0.4 : 0.2,
							}}
						>
							{item.label}
						</Label>
					)}
				</Item>
			))}
		</Wrap>
	);
};
