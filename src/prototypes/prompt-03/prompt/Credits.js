import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { makeTome } from "./PromptScript";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { SuccessIndicator } from "../ds/SuccessIndicator";
import { PromptPlaceholders } from "./PromptPlaceholders";
import { Suggestions } from "./Suggestions";

const Bar = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	padding: 8px 24px 0px;
	width: 100%;
`;

const Instructions = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 11px;
	line-height: 24px;
`;

const Amount = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 11px;
	line-height: 24px;
`;

export const Credits = props => {
	return (
		<Bar
			style={{
				boxShadow: `0 -1px 0 0 ${props.theme.colors.t1}`,
			}}
		>
			<Instructions
				style={{
					color: props.theme.colors.t4,
				}}
			>
				To confirm press&nbsp;
				<span
					style={{
						fontWeight: 500,
					}}
				>
					Return ↵
				</span>
			</Instructions>

			<Amount
				style={{
					color: props.theme.colors.t4,
				}}
			>
				44 credits remaining.{" "}
				<a
					style={{
						color: props.theme.colors.t4,
					}}
					href="https://credits.ai"
				>
					Add credits
				</a>
			</Amount>
		</Bar>
	);
};
