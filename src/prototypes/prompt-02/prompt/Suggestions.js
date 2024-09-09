import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { makeTome } from "./PromptScript";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { SuccessIndicator } from "../ds/SuccessIndicator";
import { PromptStates } from "./Prompt";

const Wrap = styled(motion.div)`
	overflow: hidden;
`;

const SuggestionItem = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	padding: 16px 24px;
	cursor: pointer;
`;

const item = {
	default: { backgroundColor: "rgba(255,255,255,0.00)" },
	hover: { backgroundColor: "rgba(255,255,255,0.08)" },
};

const fadeTransition = {
	ease: "easeOut",
	duration: 0.2,
};

export const Suggestions = props => {
	const phrases = [
		"Write a pitch deck for…",
        "Make a page about…",
		"Create an image about…",
		//"Write a letter to…",
	];

	return (
		<Wrap
			style={{
				boxShadow: `0 1px 0 0 ${props.theme.colors.t2}`,
			}}
			animate={{
				height: props.state === PromptStates.FRESH ? "auto" : 0,
				opacity: props.state === PromptStates.FRESH ? 1 : 0,
			}}
			transition={fadeTransition}
			initial={false}
		>
			{phrases.map((phrase, i) => (
				<Suggestion
					key={"suggestion" + i}
					transition={fadeTransition}
					theme={props.theme}
					label={phrase}
					setSuggestionHover={props.setSuggestionHover}
					defaultPlaceholder={props.defaultPlaceholder}
					setState={props.setState}
					state={props.state}
					textAreaRef={props.textAreaRef}
				/>
			))}
		</Wrap>
	);
};

const Suggestion = props => {
	return (
		<SuggestionItem
			style={{
				color: props.theme.colors.t7,
                pointerEvents: props.state !== PromptStates.SIGNAL ? "auto" : "none",
			}}
			variants={item}
			whileHover={"hover"}
			initial={"default"}
			transition={fadeTransition}
			onHoverStart={() => props.setSuggestionHover(props.label)}
			onHoverEnd={() => {
				if (props.state !== PromptStates.SIGNAL) {
					props.setSuggestionHover(props.defaultPlaceholder);
				}
			}}
			onTap={() => {
				props.setState(PromptStates.SIGNAL);
				props.textAreaRef.current.focus();
			}}
		>
			{props.label}
		</SuggestionItem>
	);
};
