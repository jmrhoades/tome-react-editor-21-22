import React, { useContext, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import styled from "styled-components";
import { uniqueId } from "lodash";

import { TomeContext } from "../tome/TomeContext";
import { Section, SectionTitle, ControlGroup, ButtonStack, ButtonPair, ColorRow } from "./PanelContainer";
import { Segmented, segmentType } from "./Segmented";
import { Button, buttonType } from "./Button";
import { alignmentX, alignmentY, textBlockType } from "../page/TileConstants";
import { Color, colorType } from "./Color";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const TextTileProperties = props => {
	const { selectedTile, tomeData, setTomeData } = useContext(TomeContext);
	const fontFamily = "ABCDiatype";

	let activeStyles = [];
	if (selectedTile) {
		selectedTile.params.blocks.forEach(b => {
			let t = b.type;
			if (t === textBlockType.UL || t === textBlockType.OL) {
				let listT = b.blockStyle;
				if (activeStyles.indexOf(b.listT) === -1) {
					activeStyles.push(listT);
				}
				//console.log(t);
			}
			if (activeStyles.indexOf(b.type) === -1) {
				activeStyles.push(t);
			}
		});
	}

	//console.log(activeStyles);

	const [activeColor, setActiveColor] = useState("color01");

	const onStyleButtonTap = type => {
		// Set all blocks to this style
		const newItems = [];
		selectedTile.params.blocks.forEach(b => {
			if (b.type === textBlockType.UL || b.type === textBlockType.OL) {
				b.blockStyle = type;
				newItems.push(b);
				/*
				b.blocks.forEach(b_li => {
					b_li.type = type;
					newItems.push(b_li);
				});
				*/
			} else {
				b.type = type;
				newItems.push(b);
			}
		});
		selectedTile.params.blocks = newItems;
		setTomeData({ ...tomeData });
	};

	const removeListType = type => {
		// Remove ordered lists, retain styling
		const newItems = [];
		selectedTile.params.blocks.forEach(b => {
			if (b.type === type) {
				b.blocks.forEach(b_li => {
					b_li.type = b.blockStyle;
					newItems.push(b_li);
				});
			} else {
				newItems.push(b);
			}
		});
		selectedTile.params.blocks = newItems;
	};

	const setListType = type => {
		// Get all the blocks and place them in a new array
		// If a block is a list, put its items in the new array
		// Add item to new list
		const newItems = [];
		const isFirstBlockAList = selectedTile.params.blocks[0].blockStyle;
		console.log(isFirstBlockAList, selectedTile.params.blocks[0].type, selectedTile.params.blocks[0].blockStyle);
		const newBlock = {
			id: uniqueId("block_list_"),
			type: type,
			blockStyle: isFirstBlockAList ? selectedTile.params.blocks[0].blockStyle : selectedTile.params.blocks[0].type,
		};

		selectedTile.params.blocks.forEach(b => {
			if (b.type === textBlockType.UL) {
				b.blocks.forEach(b_li => {
					newItems.push(b_li);
				});
			} else if (b.type === textBlockType.OL) {
				b.blocks.forEach(b_li => {
					newItems.push(b_li);
				});
			} else {
				b.type = textBlockType.LI;
				newItems.push(b);
			}
		});
		newBlock.blocks = newItems;
		selectedTile.params.blocks = [newBlock];
	};

	const onListButtonTap = type => {
		// Order list button tapped
		// = List buttons must behave as toggles
		// = Unlike block styles, lists are an additional style the user can add to a block
		// = If a list is present in the selected tile, tapping the button removes the list
		// = If a list is not present, tapping the button turns all the selected tiles's blocks into a list

		//
		// Remove lists
		//

		if (activeStyles.indexOf(textBlockType.OL) !== -1 && type === textBlockType.OL) {
			removeListType(type);
		} else if (activeStyles.indexOf(textBlockType.UL) !== -1 && type === textBlockType.UL) {
			removeListType(type);
		}

		//
		// Convert to list
		//
		else if (activeStyles.indexOf(textBlockType.OL) === -1 && type === textBlockType.OL) {
			setListType(type);
		} else if (activeStyles.indexOf(textBlockType.UL) === -1 && type === textBlockType.UL) {
			setListType(type);
		}

		setTomeData({ ...tomeData });
	};

	const onColorTap = (id, color) => {
		if (id === "show_picker") {
			console.log("on color tap ", id);
		} else {
			setActiveColor(id);
			selectedTile.params.blocks.forEach(b => {
				b.color = color;
				if (b.inlineBlocks) {
					b.inlineBlocks.forEach(o => {
						if (o.type !== textBlockType.LINK && o.color) {
							o.color = null;
						}
					});
				}
			});
			setTomeData({ ...tomeData });
		}
	};

	return (
		selectedTile &&
		selectedTile.params && (
			<Wrap>
				<Section>
					<SectionTitle theme={props.theme}>Alignment</SectionTitle>
					<ControlGroup>
						<Segmented
							id={"text_align_horizontal"}
							target={"alignmentX"}
							theme={props.theme}
							targetValue={selectedTile.params.alignmentX}
							data={[
								{
									type: segmentType.ICON,
									iconName: "AlignLeft",
									label: "Align Left",
									value: alignmentX.LEFT,
								},
								{
									type: segmentType.ICON,
									iconName: "AlignCenter",
									label: "Align Center",
									value: alignmentX.CENTER,
								},
								{
									type: segmentType.ICON,
									iconName: "AlignRight",
									label: "Align Right",
									value: alignmentX.RIGHT,
								},
							]}
						/>
						<Segmented
							id={"text_align_vertical"}
							target={"alignmentY"}
							theme={props.theme}
							targetValue={selectedTile.params.alignmentY}
							data={[
								{
									type: segmentType.ICON,
									iconName: "AlignTop",
									label: "Align Top",
									value: alignmentY.TOP,
								},
								{
									type: segmentType.ICON,
									iconName: "AlignMiddle",
									label: "Align Middle",
									value: alignmentY.MIDDLE,
								},
								{
									type: segmentType.ICON,
									iconName: "AlignBottom",
									label: "Align Bottom",
									value: alignmentY.BOTTOM,
								},
								{
									type: segmentType.ICON,
									iconName: "AlignDistribute",
									label: "Distribute",
									value: alignmentY.DISTRIBUTE,
								},
							]}
						/>
					</ControlGroup>
				</Section>
				<Section>
					<SectionTitle theme={props.theme}>Style</SectionTitle>
					<ButtonStack>
						<Button
							id={"style_Display"}
							type={buttonType.LABEL}
							labelStyle={{ fontFamily: fontFamily, fontSize: 16.5, fontWeight: 700 }}
							label={"Display"}
							active={activeStyles.indexOf(textBlockType.H0) !== -1}
							onTap={() => {
								onStyleButtonTap(textBlockType.H0);
							}}
							theme={props.theme}
						/>
						<Button
							id={"style_Title"}
							type={buttonType.LABEL}
							labelStyle={{ fontFamily: fontFamily, fontSize: 15.0, fontWeight: 700 }}
							label={"Title"}
							active={activeStyles.indexOf(textBlockType.H1) !== -1}
							onTap={() => {
								onStyleButtonTap(textBlockType.H1);
							}}
							theme={props.theme}
						/>
						<Button
							id={"style_Heading"}
							type={buttonType.LABEL}
							labelStyle={{ fontFamily: fontFamily, fontSize: 13.5, fontWeight: 700 }}
							label={"Heading"}
							active={activeStyles.indexOf(textBlockType.H2) !== -1}
							onTap={() => {
								onStyleButtonTap(textBlockType.H2);
							}}
							theme={props.theme}
						/>
						<Button
							id={"style_Subheading"}
							type={buttonType.LABEL}
							labelStyle={{ fontFamily: fontFamily, fontSize: 13.0, fontWeight: 500 }}
							label={"Subheading"}
							active={activeStyles.indexOf(textBlockType.H3) !== -1}
							onTap={() => {
								onStyleButtonTap(textBlockType.H3);
							}}
							theme={props.theme}
						/>
						<Button
							id={"style_Body"}
							type={buttonType.LABEL}
							labelStyle={{ fontFamily: fontFamily, fontSize: 13.0, fontWeight: 400 }}
							label={"Body"}
							active={activeStyles.indexOf(textBlockType.P) !== -1}
							onTap={() => {
								onStyleButtonTap(textBlockType.P);
							}}
							theme={props.theme}
						/>
						<Button
							id={"style_Caption"}
							type={buttonType.LABEL}
							labelStyle={{ fontFamily: fontFamily, fontSize: 11.5, fontWeight: 400 }}
							label={"Caption"}
							active={activeStyles.indexOf(textBlockType.CAPTION) !== -1}
							onTap={() => {
								onStyleButtonTap(textBlockType.CAPTION);
							}}
							theme={props.theme}
						/>
					</ButtonStack>
				</Section>
				<Section>
					<SectionTitle theme={props.theme}>Lists</SectionTitle>
					<ButtonPair>
						<Button
							id={"style_bullet_list"}
							type={buttonType.ICON}
							iconName={"ListBullet"}
							label={"Bullet list"}
							active={activeStyles.indexOf(textBlockType.UL) !== -1}
							onTap={() => {
								onListButtonTap(textBlockType.UL);
							}}
							theme={props.theme}
						/>
						<Button
							id={"style_number_list"}
							type={buttonType.ICON}
							iconName={"ListNumber"}
							label={"Number list"}
							active={activeStyles.indexOf(textBlockType.OL) !== -1}
							onTap={() => {
								onListButtonTap(textBlockType.OL);
							}}
							theme={props.theme}
						/>
					</ButtonPair>
				</Section>
				<Section>
					<SectionTitle theme={props.theme}>Color</SectionTitle>
					<ColorRow>
					<LayoutGroup>
						<Color
							id={"color01"}
							fillColor={props.theme.colors.text.heading}
							activeColor={activeColor}
							type={colorType.FILL}
							onTap={onColorTap}
						/>
						<Color
							id={"color02"}
							fillColor={props.theme.colors.text.body}
							type={colorType.FILL}
							activeColor={activeColor}
							onTap={onColorTap}
						/>
						{/* <Color
							id={"color03"}
							fillColor={"rgba(240, 179, 124, 1)"}
							type={colorType.FILL}
							activeColor={activeColor}
							onTap={onColorTap}
						/>
						<Color
							id={"color04"}
							fillColor={"rgba(217, 240, 124, 1)"}
							type={colorType.FILL}
							activeColor={activeColor}
							onTap={onColorTap}
						/>
						<Color
							id={"color05"}
							fillColor={"rgba(124, 240, 205, 1)"}
							type={colorType.FILL}
							activeColor={activeColor}
							onTap={onColorTap}
						/>
						<Color
							id={"color06"}
							fillColor={"rgba(147, 124, 240, 1)"}
							type={colorType.FILL}
							activeColor={activeColor}
							onTap={onColorTap}
						/> */}
						<Color id={"show_picker"} type={colorType.PICKER} onTap={onColorTap} />
						</LayoutGroup> 
					</ColorRow>
				</Section>
			</Wrap>
		)
	);
};
