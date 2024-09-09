import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { makeTome } from "./PromptScript";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { SuccessIndicator } from "../ds/SuccessIndicator";

const Wrap = styled(motion.div)`
	width: 100%;
	position: absolute;
	top: 18px;
	left: 25px;
	pointer-events: none;
`;

const Placeholder = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
`;

const item = {
	hiddenStart: { opacity: 0, y: 20 },
	visible: { opacity: [0, 1], y: [20, 0] },
	hiddenEnd: { opacity: 0, y: -20 },
};

export const PromptPlaceholders = props => {
	const phrases = ["Tell a story…", "Write a pitch for…", "Create a project plan for…", "Write a letter to…"];

	const [message1State, setMessage1State] = useState("visible");
	const message1TimeoutRef = React.useRef();

	const [message2State, setMessage2State] = useState("hiddenStart");
	const message2TimeoutRef = React.useRef();

	const [message3State, setMessage3State] = useState("hiddenStart");
	const message3TimeoutRef = React.useRef();

	const [message4State, setMessage4State] = useState("hiddenStart");
	const message4TimeoutRef = React.useRef();

    const cycleTimeoutRef = React.useRef();


	const increment = 3000;

	React.useEffect(() => {
		if (props.show) {
			playCycle();
		} else {
            clearTimeout(message1TimeoutRef.current);
            clearTimeout(message2TimeoutRef.current);
            clearTimeout(message3TimeoutRef.current);
            clearTimeout(message4TimeoutRef.current);
            clearTimeout(cycleTimeoutRef.current);
        }
	}, [props.show]);

    const playCycle= ()=> {
        message1TimeoutRef.current = setTimeout(() => {
            setMessage1State("hiddenEnd");
            setMessage2State("visible");
        }, increment);

        message2TimeoutRef.current = setTimeout(() => {
            setMessage2State("hiddenEnd");
            setMessage3State("visible");
        }, increment * 2);

        message3TimeoutRef.current = setTimeout(() => {
            setMessage3State("hiddenEnd");
            setMessage4State("visible");
        }, increment * 3);

        message4TimeoutRef.current = setTimeout(() => {
            setMessage4State("hiddenEnd");
            setMessage1State("visible");
        }, increment * 4);

        cycleTimeoutRef.current = setTimeout(() => {
            playCycle()
        }, increment * 4);

    }

	return (
		<Wrap initial={false} animate={{ opacity: props.show ? 1 : 0 }} transition={props.placeholderFadeTransition}>
			<Placeholder
				style={{ color: props.theme.colors.controls.field.placeholder }}
				variants={item}
				animate={message1State}
				initial={false}
				transition={props.placeholderFadeTransition}
			>
				{phrases[0]}
			</Placeholder>

			<Placeholder
				style={{ color: props.theme.colors.controls.field.placeholder }}
				variants={item}
				animate={message2State}
				initial={false}
				transition={props.placeholderFadeTransition}
			>
				{phrases[1]}
			</Placeholder>

			<Placeholder
				style={{ color: props.theme.colors.controls.field.placeholder }}
				variants={item}
				animate={message3State}
				initial={false}
				transition={props.placeholderFadeTransition}
			>
				{phrases[2]}
			</Placeholder>

			<Placeholder
				style={{ color: props.theme.colors.controls.field.placeholder }}
				variants={item}
				animate={message4State}
				initial={false}
				transition={props.placeholderFadeTransition}
			>
				{phrases[3]}
			</Placeholder>
		</Wrap>
	);
};
