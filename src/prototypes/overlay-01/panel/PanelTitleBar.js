import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	padding: 8px 16px;
`;

const Title = styled(motion.div)`
	font-weight: 700;
	font-size: 14px;
	line-height: 24px;
	letter-spacing: -0.01em;
	color: #ffffff;
`;

const CloseButton = styled(motion.div)`
	width: 24px;
	height: 24px;
	position: relative;
`;

const CloseIcon = styled(motion.svg)`
	position: absolute;
	top: 0;
	left: 0;
	width: 24px;
	height: 24px;
	fill: rgba(255, 255, 255, 0.4);
`;

export const PanelTitleBar = props => {
	return (
		<Wrap>
			<Title>{props.title}</Title>
			<CloseButton onTap={props.onPanelClose}>
				<CloseIcon viewBox="0 0 24 24">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16.8076 16.817C16.5636 17.0609 16.168 17.061 15.924 16.8172C15.924 16.8173 15.9239 16.8171 15.924 16.8172L11.9901 12.8856L8.06001 16.8136C7.81468 17.0562 7.41902 17.0541 7.17629 16.8089C6.93537 16.5656 6.93538 16.1737 7.1763 15.9304L11.1065 12.0025L7.17702 8.07535C6.93654 7.82797 6.94225 7.4326 7.18977 7.19226C7.43223 6.95685 7.81805 6.95681 8.06054 7.19219L11.9902 11.1193L15.9231 7.18875C16.1639 6.94169 16.5595 6.93649 16.8067 7.17715C17.054 7.4178 17.0592 7.81318 16.8184 8.06024C16.8145 8.0642 16.8106 8.0681 16.8066 8.07194L12.8739 12.0025L16.8076 15.9339C17.0516 16.1777 17.0515 16.5732 16.8076 16.817C16.8076 16.817 16.8075 16.8171 16.8076 16.817Z"
					/>
				</CloseIcon>
			</CloseButton>
		</Wrap>
	);
};
