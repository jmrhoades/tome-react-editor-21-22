import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { makeTome } from "./PromptScript";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { SuccessIndicator } from "../ds/SuccessIndicator";
import { PromptPlaceholders } from "./PromptPlaceholders";
import { Suggestions } from "./Suggestions";

const Wrap = styled(motion.div)`
	position: absolute;
	/* overflow: hidden; */
	width: 100%;
	height: calc(100% - 48px);
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

const Control = styled(motion.div)``;

const Input = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 16px 56px 16px 24px;
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	position: relative;
`;

const TextArea = styled(motion.textarea)`
	font-family: inherit;
	font-style: inherit;
	font-weight: inherit;
	font-size: inherit;
	line-height: inherit;
	width: 100%;

	border: none;
	overflow: hidden;
	outline: none;
	background: transparent;
	box-shadow: none;
	appearance: none;
	resize: none;
	position: relative;

	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

const Placeholder = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	pointer-events: none;
	position: absolute;
	top: 18px;
	left: 25px;
`;

const BuildPlaceholder = styled(motion.div)`
	font-family: inherit;
	font-style: inherit;
	font-weight: inherit;
	font-size: inherit;
	line-height: inherit;
	width: 100%;
	position: absolute;
	top: 18px;
	left: 25px;
	pointer-events: none;
`;

const Shortcut = styled(motion.div)`
	font-family: inherit;
	font-style: inherit;
	font-weight: inherit;
	font-size: inherit;
	line-height: inherit;
	pointer-events: none;
	position: absolute;
	right: 20px;
	top: 18px;
`;

const Spinner = styled(motion.div)`
	position: absolute;
	bottom: 10px;
	right: 16px;
	width: 40px;
	height: 40px;
	pointer-events: none;
`;

export const PromptStates = {
	FRESH: "fresh",
	SIGNAL: "signal",
	SENDING: "sending",
	BUILDING: "building",
	ERROR: "error",
};

export const Prompt = ({}) => {
	const { currentPage, promptIsOpen, saveState, setPromptIsOpen, tomeData, deletePage, selectOutlinePage } =
		React.useContext(TomeContext);

	const [value, setValue] = React.useState("");
	const [showLoading, setShowLoading] = React.useState(false);
	const [showSuccess, setShowSucess] = React.useState(false);
	const [state, setState] = React.useState(PromptStates.FRESH);

	const placeholder = "Make a presentation about…";
	const [suggestionHover, setSuggestionHover] = React.useState(placeholder);
	const fieldRef = React.useRef(null);
	const buildRef = React.useRef(null);

	const updatePlaceholder = s => {
		buildRef.current.textContent = s;
	};

	const onChange = event => {
		setValue(event.target.value);

		if (event.target.value.length > 0 && state === PromptStates.FRESH) {
			setState(PromptStates.SIGNAL);
		}


			if (event.target.value.length === 0 && state === PromptStates.SIGNAL) {
				setState(PromptStates.FRESH);
			}

	};

	const MIN_TEXTAREA_HEIGHT = 28;
	React.useLayoutEffect(() => {
		// Reset height - important to shrink on delete
		fieldRef.current.style.height = MIN_TEXTAREA_HEIGHT + "px";
		// Set height
		fieldRef.current.style.height = `${Math.max(fieldRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
	}, [value]);

	React.useEffect(() => {
		if (promptIsOpen) {
			fieldRef.current.value = "";
			setValue("");
			fieldRef.current.focus();
		}
	}, [promptIsOpen]);

	const placeholderFadeTransition = {
		ease: "easeOut",
		duration: 0.2,
	};

	const doTheThing = () => {
		setShowLoading(true);
		fieldRef.current.value = "";
		fieldRef.current.blur();
		setValue("");
		updatePlaceholder("Make a tome…");

		const delay = makeTome(tomeData, saveState, deletePage, selectOutlinePage, updatePlaceholder);

		setTimeout(() => {
			setShowLoading(false);
			setShowSucess(true);
			updatePlaceholder("8 pages created");
		}, delay + 3000);

		setTimeout(() => {
			setPromptIsOpen(false);
		}, delay + 4000);
	};

	return (
		<Wrap
			style={{
				pointerEvents: "none",
			}}
		>
			<Control
				style={{
					background: currentPage.theme.colors.z1,
					borderRadius: 12,
					width: 720,
					boxShadow: "0px 6px 16px hsla(0, 0%, 0%, 0.25), 0px 0px 0px 1px hsla(0, 0%, 12%, 1.0)",
					pointerEvents: promptIsOpen ? "auto" : "none",
					overflow: "hidden",
				}}
				//initial={false}

				initial={{
					opacity: 0,
					scale: 0.9,
					y: 20,
				}}
				animate={{
					opacity: promptIsOpen ? 1 : 0,
					scale: promptIsOpen ? 1 : 0.9,
					y: promptIsOpen ? 0 : 20,
				}}
				transition={{
					default: {
						type: "spring",
						bounce: 0.3,
						duration: 0.4,
					},
					opacity: {
						type: "tween",
						ease: "easeOut",
						duration: 0.15,
					},
				}}
			>
				<Suggestions
					theme={currentPage.theme}
					setSuggestionHover={setSuggestionHover}
					defaultPlaceholder={placeholder}
					setState={setState}
					state={state}
					textAreaRef={fieldRef}
				/>

				<Input
					initial={false}
					animate={{
						paddingTop: state === PromptStates.SIGNAL ? 40 : 16,
					}}
					transition={placeholderFadeTransition}
				>
					<Placeholder
						theme={currentPage.theme}
						initial={false}
						// animate={{ opacity: value.length === 0 && !showLoading ? 1 : 0 }}
						animate={{
							scale: state === PromptStates.SIGNAL ? 0.75 : 1,
							originX: 0,
							originY: 0,
						}}
						transition={placeholderFadeTransition}
						style={{
							color: currentPage.theme.colors.t7,
						}}
					>
						{suggestionHover}
					</Placeholder>

					<BuildPlaceholder
						ref={buildRef}
						style={{
							color: currentPage.theme.colors.t8,
						}}
					/>

					<TextArea
						ref={fieldRef}
						$selectioncolor={currentPage.theme.colors.text.selection}
						style={{
							color: currentPage.theme.colors.controls.field.valueFocussed,
							caretColor: currentPage.theme.colors.accent,
						}}
						onChange={onChange}
						onKeyDown={e => {
							console.log(e);
							if (e.key === "Enter") {
								doTheThing();
								e.preventDefault();
								e.stopPropagation();
							}
							if (e.key === "Backspace" || e.key === "Delete") {
								//console.log("Backspace", value.length);
								if (value.length <= 1 && state === PromptStates.SIGNAL) {
									setState(PromptStates.FRESH);
								}
							}
						}}
					/>

					<Shortcut
						style={{
							color: currentPage.theme.colors.controls.field.placeholder,
						}}
						animate={{
							opacity: value.length > 0 || showLoading || showSuccess ? 0 : 1,
						}}
						transition={placeholderFadeTransition}
					>
						⌘K
					</Shortcut>

					<Spinner>
						{showLoading && <LoadingIndicator size={32} key="loadingIndicator" />}
						{showSuccess && <SuccessIndicator key="successIndicator" />}
					</Spinner>

					{/* <GoButton theme={currentPage.theme} disabled={value.length === 0} /> */}
				</Input>
			</Control>
		</Wrap>
	);
};

// const GoWrap = styled(motion.div)`
// 	width: 28px;
// 	height: 28px;
// 	border-radius: 14px;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	position: absolute;
// 	bottom: 16px;
// 	right: 16px;
// `;

// const GoButton = props => {
// 	return (
// 		<GoWrap
// 			style={{
// 				background: props.theme.colors.z4,
// 				opacity: props.disabled ? 0.25 : 1,
// 				cursor: "pointer",
// 			}}
// 		>
// 			<svg width="16" height="14" viewBox="0 0 16 14">
// 				<path
// 					fillRule="evenodd"
// 					clipRule="evenodd"
// 					d="M9.99179 0.925022L15.2418 6.17502C15.6974 6.63063 15.6974 7.36933 15.2418 7.82494L9.99179 13.0749C9.53618 13.5305 8.79748 13.5305 8.34187 13.0749C7.88626 12.6193 7.88626 11.8806 8.34187 11.425L11.6002 8.16665H1.5835C0.939165 8.16665 0.416831 7.64431 0.416831 6.99998C0.416831 6.35565 0.939165 5.83331 1.5835 5.83331L11.6002 5.83331L8.34187 2.57494C7.88626 2.11933 7.88626 1.38063 8.34187 0.925022C8.79748 0.46941 9.53618 0.46941 9.99179 0.925022Z"
// 					fill={props.theme.colors.t9}
// 				/>
// 			</svg>
// 		</GoWrap>
// 	);
// };

// onKeyDown={e => {
//     const key = e.key;
//     //e.stopPropagation();
//     //console.log(key);
//     if (key === "Enter") {
//         //console.log(e.target.textContent);
//         if (e.target.textContent.trim().toLowerCase() === "generate background") {
//             setPromptIsOpen(false);
//             let url = "https://prod.spline.design/mmDe-fhp17Mk6z2n/scene.splinecode";
//             currentPage.background = {};
//             currentPage.background.params = {};
//             currentPage.background.params.url = url;
//             saveState();
//         } else {
//             setShowLoading(true);
//             e.target.textContent = "";
//             e.target.blur();
//             window.getSelection().removeAllRanges();
//             setValue("");
//             updatePlaceholder("Generating your tome…");
//             //updatePlaceholder("Creating page 1 / 8");

//             const delay = makeTome(tomeData, saveState, deletePage, selectOutlinePage, updatePlaceholder);

//             setTimeout(() => {
//                 setShowLoading(false);
//                 setShowSucess(true);
//                 updatePlaceholder("8 pages created");
//             }, delay + 3000);

//             setTimeout(() => {
//                 setPromptIsOpen(false);
//             }, delay + 4000);

//             //setPromptIsOpen(false);
//         }
//         e.preventDefault();
//     }

// }}
