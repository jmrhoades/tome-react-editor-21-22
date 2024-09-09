import React from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import styled from "styled-components";
import { uniqueId } from "lodash";

import { Icon } from "../../../ds/Icon";
import { OutlineStates, promptbarMetrics } from "./Prompt";

const Wrap = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	line-height: 22px;
	font-size: 17px;
	pointer-events: auto;

	-moz-font-feature-settings: "ss02";
	-webkit-font-feature-settings: "ss02";
	font-feature-settings: "ss02";
`;

const Header = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const HeaderTitle = styled(motion.div)``;

const HeaderButtons = styled(motion.div)``;

const AddRowButton = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: middle;
	width: 32px;
	height: 32px;
`;

const List = styled(motion.div)`
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		margin: 0;
		padding: 0;
		border-radius: 8px;
		height: 48px;
		margin-bottom: 8px;

		display: grid;
		grid-template-columns: 24px 1fr 32px 32px;
		align-items: center;

		/* display: flex;
		flex-direction: row;
		
		justify-content: space-between; */

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const Number = styled(motion.div)`
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	-moz-font-feature-settings: "tnum";
	-webkit-font-feature-settings: "tnum";
	font-feature-settings: "tnum";
`;

const Field = styled(motion.input)`
	display: block;
	width: 100%;
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	background: transparent;
	appearance: none;
	box-shadow: none;
	border-radius: 0;
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

const Controls = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0;
`;

const Button = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: middle;
	width: 32px;
	height: 32px;
`;

const Left = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Label = styled(motion.div)`
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const SpinnerWrap = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Outline = props => {
	const colors = props.theme.colors;

	const width = promptbarMetrics.input.create.width;
	const paddingX = 12;
	const paddingY = 12;
	const padding = "12px 12px";

	const [items, setItems] = React.useState([
		{
			id: "item01",
			label: "Introduction",
		},
		{
			id: "item02",
			label: "Improved Health",
		},
		{
			id: "item03",
			label: "Weight Loss",
		},
		{
			id: "item04",
			label: "Environmental Impact",
		},
		{
			id: "item05",
			label: "Ethical Considerations",
		},
		{
			id: "item06",
			label: "Conclusion",
		},
	]);

	// const [items, setItems] = React.useState([
	// 	"Introduction",
	//     "Improved Health",
	//     "Weight Loss",
	//     "Environmental Impact",
	//     "Ethical Considerations",
	//     "Conclusion",
	// ]);

	const moveCaretAtEnd = e => {
		var temp_value = e.target.value;
		e.target.value = "";
		e.target.value = temp_value;
	};

	const getPlaceholder = i => {
		switch (i) {
			case 0:
				return "Intro";
			case items.length - 1:
				return "Conclusion";
			default:
				return "Heading";
		}
	};

	const show = props.outlineState === OutlineStates.SHOW && props.promptIsOpen;
	return (
		<Wrap
			key="outline_component"
			initial={false}
			//layout
			animate={{
				opacity: show ? 1 : 0,
				//scale: show ? 1 : 0.8,
				y: show ? 0 : 64,
			}}
			transition={show ? { ...props.transitions.morph, delay: 0.1 } : props.transitions.morph}
			style={{
				position: "absolute",
				bottom: 118,
				left: "50%",
				x: "-50%",
				width: width,
				color: colors.t7,
				backgroundColor: colors.promptbar.barBackground,
				borderRadius: promptbarMetrics.borderRadius,
				boxShadow: colors.promptbar.barShadow,
				backdropFilter: "saturate(180%) blur(20px)",
				WebkitBackdropFilter: "saturate(180%) blur(20px)",
				overflow: "hidden",

				//display: flex;
				//justify-content: space-between;
				//align-items: center;
				//position: relative;
				//</AnimatePresence>width: auto;

				//gap: 64,
				//pointerEvents: "none",

				//paddingLeft: 12,
				//paddingRight: 12,
			}}
		>
			<Header
				style={{
					padding: padding,
					paddingBottom: 4,
				}}
			>
				<HeaderTitle
					style={{
						color: colors.t7,
						paddingLeft: 4,
						lineHeight: "20px",
						fontSize: 17,
					}}
				>
					Outline
				</HeaderTitle>
				<HeaderButtons>
					<AddRowButton
						style={{ cursor: "pointer" }}
						onTap={e => {
							items.push({
								id: uniqueId("item"),
								label: "",
							});
							setItems([...items]);
						}}
					>
						<Icon name="Add" size={24} color={colors.t7} opacity={1} />
					</AddRowButton>
				</HeaderButtons>
			</Header>

			<List
				style={{
					padding: padding,
				}}
			>
				<Reorder.Group values={items} onReorder={setItems} initial={false}>
					{items.map((item, i) => (
						<Reorder.Item
							key={item.id}
							style={{
								backgroundColor: colors.t1,
								paddingLeft: "16px",
							}}
						>
							<Number
								style={{
									color: colors.t5,
									fontSize: "13px",
									lineHeight: "20px",
								}}
							>
								{i + 1}
							</Number>
							<Field
								key={"prompt_bar_textfield"}
								$selectioncolor={colors.text.selection}
								style={{
									caretColor: colors.accent,
									color: colors.promptbar.textfield,
								}}
								spellCheck="false"
								autoComplete="off"
								autoFocus
								placeholder={getPlaceholder(i)}
								value={item.label}
								onFocus={e => {
									moveCaretAtEnd(e);
								}}
								onKeyDown={e => {
									//e.preventDefault();
									e.stopPropagation();
								}}
								onChange={e => {
									items[i].label = e.target.value;
									//items[i] = e.target.value;
									setItems([...items]);
								}}
							/>

							<Button
								style={{ cursor: "pointer" }}
								onTap={e => {
									items.splice(i, 1);

									setItems([...items]);
								}}
							>
								<Icon name="Close" size={21} color={colors.t4} opacity={1} />
							</Button>
							<Button style={{ cursor: "grab" }}>
								<Icon name="Draggable" size={22} color={colors.t4} opacity={1} />
							</Button>
						</Reorder.Item>
					))}
				</Reorder.Group>
			</List>
		</Wrap>
	);
};
