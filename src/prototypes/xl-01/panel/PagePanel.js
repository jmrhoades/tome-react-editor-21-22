import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { PanelWrap, Section, ControlGroup } from "./Panels";
import { SliderFieldGroup } from "./controls/SliderFieldGroup";
import { updateThemeBaseFontSize } from "../tome/Themes";

const Options = styled(motion.div)`
	display: flex;
`;

export const PagePanel = props => {

	const { currentPage, saveState } = React.useContext(TomeContext);

	const onLayoutMarginsToggle = () => {
		currentPage.layout.margins = !currentPage.layout.margins;
		saveState();
	};

	const onLayoutCornersToggle = () => {
		currentPage.layout.corners = !currentPage.layout.corners;
		saveState();
	};

	const onLayoutGapsToggle = () => {
		currentPage.layout.gaps = !currentPage.layout.gaps;
		saveState();
	};

	const onLayoutMarginValueUpdate = newValue => {
		currentPage.layout.marginValue = newValue;
		saveState();
	};

	const onLayoutGapValueUpdate = newValue => {
		currentPage.layout.gapValue = newValue;
		saveState();
	};

	const onLayoutCornerValueUpdate = newValue => {
		currentPage.layout.cornerValue = newValue;
		saveState();
	};

	const onThemeBaseFontSizeUpdate = newValue => {
		currentPage.theme.typography.baseSize = newValue;
		updateThemeBaseFontSize(currentPage.theme, currentPage.theme.typography.baseSize);
		saveState();
	};


	return (
		<PanelWrap>
			

			<Section>
				<ControlGroup>
					<Options
						style={{
							flexDirection: "column",
							gap: 8,
						}}
					>
						<div>
							
							<SliderFieldGroup
							label={"Font size"}
								theme={props.theme}
								value={props.theme.typography.baseSize}
								isOn={true}
								range={[8, 48]}
								onValueUpdate={onThemeBaseFontSizeUpdate}
							/>
						</div>

						<div>
							{/* <LabeledSwitch
								theme={props.theme}
								label={"Margins"}
								onTap={onLayoutMarginsToggle}	
								isOn={props.layout.margins}
								isSmall={true}
							/>
							<motion.div style={{ height: 6 }} /> */}
							<SliderFieldGroup
							label={"Margins"}
								theme={props.theme}
								value={props.layout.marginValue}
								isOn={props.layout.margins}
								range={[0, 384]}
								onValueUpdate={onLayoutMarginValueUpdate}
							/>
						</div>

						<div>
							{/* <LabeledSwitch
								theme={props.theme}
								label={"Gaps"}
								onTap={onLayoutGapsToggle}
								isOn={props.layout.gaps}
								isSmall={true}
								showSwitch={true}
							/>
							<motion.div style={{ height: 6 }} /> */}
							<SliderFieldGroup
							label={"Gaps"}
								theme={props.theme}
								value={props.layout.gapValue}
								isOn={props.layout.gaps}
								range={[0, 128]}
								onValueUpdate={onLayoutGapValueUpdate}
							/>
						</div>

						<div>
							{/* <LabeledSwitch
								theme={props.theme}
								label={"Corners"}
								onTap={onLayoutCornersToggle}
								isOn={props.layout.corners}
								isSmall={true}
								showSwitch={true}
							/>
							<motion.div style={{ height: 6 }} /> */}
							<SliderFieldGroup
								label={"Corners"}
								theme={props.theme}
								value={props.layout.cornerValue}
								isOn={props.layout.corners}
								range={[0, 128]}
								onValueUpdate={onLayoutCornerValueUpdate}
								isLast={true}
							/>
						</div>
					</Options>
				</ControlGroup>
			</Section>
		</PanelWrap>
	);
};
