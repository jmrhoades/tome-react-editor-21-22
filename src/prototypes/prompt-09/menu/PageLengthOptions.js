import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { CREATE_TOME_FORMAT_OPTIONS } from "../prompt/PromptConstants";
import { PageLengthSlider } from "./PageLengthSlider";

const Label = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 20px;
`;

const BottomLabels = styled(Label)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 11px;
	line-height: 16px;

	display: flex;
	justify-content: space-between;
`;

const BLabel = styled(motion.div)``;

export const PageLengthOptions = props => {
	return (
		<div style={{}}>
			 <Label
				style={{
					color: props.theme.colors.t7,
					marginBottom: 8,
                    display: "none",
				}}
			>
				Page length
			</Label> 
			<PageLengthSlider
				theme={props.theme}
				//value={tomeData.prompt.createTomePageLength}
				value={props.value}
				range={props.range}
				onMouseUp={props.onMouseUp}
			/>
			<BottomLabels
				style={{
					color: props.theme.colors.t7,
					marginTop: 4,
					fontFamily: props.theme.typography.fontFamilyMono,
					fontSize: 12,
				}}
			>
				{/* <BLabel>XS</BLabel> */}
				<BLabel>Short</BLabel>
                <BLabel>Medium</BLabel>
				<BLabel>Long</BLabel>
				{/* <BLabel>XL</BLabel> */}
			</BottomLabels>
		</div>
	);
};
