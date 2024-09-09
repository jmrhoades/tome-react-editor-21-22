import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { makeTome } from "./PromptScript";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { SuccessIndicator } from "../ds/SuccessIndicator";
import { PromptStates } from "./Prompt";

const Wrap = styled(motion.div)`
	/* overflow: hidden; */
	width: 100%;
	position: absolute;
`;

const SuggestionItem = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	position: absolute;
	top: 2px;
	left: 1px;
	font-style: italic;
	/* padding: 0 24px; */
`;

const item = {
	default: { backgroundColor: "rgba(255,255,255,0.00)" },
	hover: { backgroundColor: "rgba(255,255,255,0.08)" },
};

const fadeTransition = {
	ease: "easeOut",
	duration: 0.5,
};

export const Suggestions = props => {
	const [counter, setCounter] = useState(0);
	const timerRef = useState(0);
	const timing = 4000;

	// 20 examples of presentation titles from the most common types of presentations

	const phrases = [
		"How to Boost Your Productivity at Work",
		"The Future of Artificial Intelligence",
		"The Benefits of a Plant-Based Diet",
		"Effective Communication Strategies for the Workplace",
		"The Role of Technology in Education",
		"The Importance of Work-Life Balance",
		"The Power of Positive Thinking",
		"The Basics of Investing for Beginners",
		"Maximizing Your Online Presence for Business Success",
		"The Top Trends in Social Media Marketing",
		"The Art of Public Speaking",
		"Creating a Successful Marketing Plan",
		"The Science of Happiness",
		"How to Develop a Winning Sales Strategy",
		"The Future of Virtual Reality",
		"The Benefits of Mindfulness and Meditation",
		"The Basics of Time Management",
		"The Power of Visual Storytelling in Marketing",
		"The Top Leadership Skills for Success",
	];

	React.useEffect(() => {
		if (props.promptIsOpen) {
			console.log("render");
			timerRef.current = setTimeout(cycleSuggestion, timing);
		} else {
			clearTimeout(timerRef.current);
		}
	});

	const cycleSuggestion = () => {
		let c = counter + 1;
		if (c >= phrases.length) c = 0;
		setCounter(c);
		//console.log(counter)
	};

	return (
		<Wrap
			animate={{
				opacity: props.show ? 1 : 0,
			}}
			transition={fadeTransition}
			initial={false}
		>
			<AnimatePresence>
				{phrases.map(
					(phrase, i) =>
						i === counter && (
							<Suggestion
								key={"suggestion" + i}
								transition={fadeTransition}
								theme={props.theme}
								label={phrase}
							/>
						)
				)}
			</AnimatePresence>
		</Wrap>
	);
};

const Suggestion = props => {
	const words = props.label.split(" ");
	//const [label, setLabel] = useState(words[0]);
	const [counter, setCounter] = useState(0);
	const timerRef = useState(0);
	const timing = 250;
	//const labelRef = React.useRef(props.label);
	const labelRef = React.useRef("");

	// React.useEffect(() => {
	// 	console.log("render");
	// 	//timerRef.current = setTimeout(typeOn, timing);
	// 	// if (props.promptIsOpen) {
	// 	// } else {
	// 	// 	clearTimeout(timerRef.current);
	// 	// }
	// });

	React.useEffect(() => {
		timerRef.current = setTimeout(typeOn, timing);
		return function cleanup() {
			clearTimeout(timerRef.current);
		};
	});

	const typeOn = () => {
		let c = counter + 1;
		if (c >= words.length + 1) {
		} else {
			// setLabel(label + " " + words[c]);
			labelRef.current += " " + words[counter];
			setCounter(c);
			//console.log(counter)
		}
	};

	return (
		<SuggestionItem
			style={{
				color: props.theme.colors.t7,
				// pointerEvents: props.state !== PromptStates.SIGNAL ? "auto" : "none",
			}}
			// variants={item}
			// whileHover={"hover"}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={fadeTransition}
		>
			{labelRef.current}
		</SuggestionItem>
	);
};
