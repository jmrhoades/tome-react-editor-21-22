import React from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { Placeholder } from "./Placeholder";
import {
	startGenerating,
	getTitle,
	makeTitle,
	makeOutline,
	makePage1,
	makePage2,
	makePage3,
	makePage4,
	makePage5,
	makePage6,
} from "./PromptScript";
import { Status } from "./Status";
import { Errors } from "./Errors";

const Wrapper = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	padding: 48px 72px 72px;
	align-items: flex-end;
	/* z-index: 1000; */
`;

const Scrim = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Bar = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const Input = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	/* gap: 12px; */

	padding: 20px 24px;
	width: 100%;
	position: relative;
`;

const TextArea = styled(motion.textarea)`
	font-family: inherit;
	font-style: inherit;
	font-weight: 400;
	font-size: inherit;
	line-height: inherit;
	width: 100%;
	border: none;
	overflow: hidden;
	outline: none;
	background: transparent;
	padding: 0;
	box-shadow: none;
	appearance: none;
	resize: none;
	position: relative;
	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

export const InputStates = {
	EMPTY: "empty",
	CONTENT: "content",
	ERROR: "error",
	MODERATION: "moderation",
	MAX_CHAR: "max_characters",
	HIDING: "hiding",
};

export const BuildStates = {
	HIDING: "hiding",
	WAITING: "waiting",
	BUILDING: "building",
	FINISHED: "finished",
	DISCLAIMER: "disclaimer",
};

const MAX_INPUT_LENGTH = 1000;

export const Prompt = () => {
	const {
		currentPage,
		promptIsOpen,
		setPromptIsOpen,
		tomeData,
		saveState,
		showPage,
		setIsGenerating,
		autoPaging,
		//setIsAutoPaging,
	} = React.useContext(TomeContext);

	const [value, setValue] = React.useState("");
	const [statusText, setStatusText] = React.useState("");

	const [inputState, setInputState] = React.useState(InputStates.EMPTY);
	const [buildState, setBuildState] = React.useState(BuildStates.HIDING);

	const [isNewTome, setIsNewTome] = React.useState(true);

	const fieldRef = React.useRef(null);
	const wrapRef = React.useRef(null);
	const controlRef = React.useRef(null);

	const shakeOutlineOpacity = useMotionValue(0);

	const colors = currentPage.theme.colors;
	const placeholderA = "Create a presentation about…";
	const placeholderB = "Add a page about…";
	//const statusText = React.useRef("Generating content…");

	const inputStyle = {
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "20px",
		lineHeight: "28px",
	};

	const resubmit = event => {
		setInputState(InputStates.HIDING);
		setBuildState(BuildStates.WAITING);
		setTimeout(() => {
			setInputState(InputStates.MODERATION);
		}, 1000);
	};

	const MAX_BAR_WIDTH = 680;
	const MIN_TEXTAREA_HEIGHT = 28;
	const shakeAnimation = useAnimationControls();

	React.useLayoutEffect(() => {
		if (fieldRef.current) {
			// Reset height - important to shrink on delete
			fieldRef.current.style.height = MIN_TEXTAREA_HEIGHT + "px";
			// Set height
			fieldRef.current.style.height = `${Math.max(fieldRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
		}
	}, [value]);

	React.useEffect(() => {
		//console.log(tomeData.tiles[0].params.blocks[0]);
		if (tomeData.tiles[0].params.blocks[0].content.length > 0) {
			setIsNewTome(false);
		} else {
			setIsNewTome(true);
		}
	}, [tomeData, currentPage]);

	React.useEffect(() => {
		if (promptIsOpen) {
			setStatusText("Generating content…");
			setInputState(InputStates.EMPTY);
			setBuildState(BuildStates.HIDING);
			fieldRef.current.value = "";
			setValue("");
			fieldRef.current.focus();
		}
	}, [promptIsOpen]);

	const showGeneratedPage = page => {
		console.log("isAutoPaging", autoPaging.current);
		if (autoPaging.current) {
			showPage(page);
		}
	};

	const sendPrompt = () => {
		fieldRef.current.blur();
		setInputState(InputStates.HIDING);
		setBuildState(BuildStates.WAITING);
		setIsGenerating(true);
		generateTome();
	};

	async function generateTome() {
		console.log("calling");
		await startGenerating();
		setStatusText("Creating title…");
		await getTitle();
		await makeTitle(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setBuildState(BuildStates.BUILDING);
		setStatusText("Creating outline…");
		await makeOutline(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setStatusText("Creating page 3…");
		await makePage1(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setStatusText("Creating page 4…");
		await makePage2(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setStatusText("Creating page 5…");
		await makePage3(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setStatusText("Creating page 6…");
		await makePage4(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setStatusText("Creating page 7…");
		await makePage5(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setStatusText("Creating page 8…");
		await makePage6(tomeData, saveState, showGeneratedPage, currentPage.theme, autoPaging);
		setBuildState(BuildStates.FINISHED);
		setStatusText("8 pages created");
		setTimeout(() => {
			setPromptIsOpen(false);
			setIsGenerating(false);
		}, 2000);
	}

	const showHideTransition = {
		default: {
			type: "spring",
			bounce: 0.15,
			duration: 0.4,
		},
		opacity: {
			type: "tween",
			ease: "easeOut",
			duration: 1,
		},
	};

	const barBackgroundStyles = {
		background: colors.backgrounds.panel,
		borderRadius: 12,
		boxShadow: currentPage.theme.shadows.bar,
		// overflow: "hidden",
	};

	const textAreaCaretColor = useMotionValue(colors.accent);
	const shakeKeyframes = { x: [-10, 9, -6, 5, -2, 1, 0] };

	const onChange = event => {
		const length = event.target.value.length;
		//console.log(event.target.value.length)
		if (length >= MAX_INPUT_LENGTH) {
			textAreaCaretColor.set(colors.warning);
		} else {
			textAreaCaretColor.set(colors.accent);
		}
		setValue(event.target.value);
		if (event.target.value.length > 0) {
			setInputState(InputStates.CONTENT);
		} else {
			setInputState(InputStates.EMPTY);
		}
	};

	return (
		<Wrapper
			style={{
				pointerEvents: "none",
			}}
			ref={wrapRef}
			initial={false}
		>
			{/* <Scrim
				style={{
					background: currentPage.theme.colors.backgrounds.generating,
					pointerEvents: isGenerating ? "auto" : "none",
				}}
				initial={false}
				animate={{
					opacity: isGenerating ? 1 : 0,
				}}
				transition={{
					duration: 1,
				}}
				onMouseDown={e => {
					e.stopPropagation();
				}}
				onMouseUp={e => {
					e.stopPropagation();
				}}
			/> */}

			<motion.div
				style={{
					width: "100%",
					maxWidth: MAX_BAR_WIDTH,
				}}
				animate={shakeAnimation}
				transition={{ duration: 0.5, ease: "linear" }}
				onAnimationStart={definition => {
					textAreaCaretColor.set(colors.warning);
				}}
				onAnimationComplete={definition => {
					if (value.length < MAX_INPUT_LENGTH) textAreaCaretColor.set(colors.accent);
				}}
			>
				<Bar
					ref={controlRef}
					style={{
						pointerEvents: promptIsOpen ? "auto" : "none",
						width: "100%",
						maxWidth: MAX_BAR_WIDTH,
					}}
					initial={false}
					animate={{
						opacity: promptIsOpen && inputState !== InputStates.HIDING ? 1 : 0,
						scale: promptIsOpen && inputState !== InputStates.HIDING ? 1 : 0.9,
						y: promptIsOpen && inputState !== InputStates.HIDING ? 0 : 0,
					}}
					transition={{
						default: {
							type: "spring",
							bounce: 0,
							duration: 0.3,
						},
						opacity: {
							type: "tween",
							ease: "easeOut",
							duration: promptIsOpen && inputState !== InputStates.HIDING ? 0.4 : 0.2,
						},
					}}
				>
					<Input
						style={{
							...inputStyle,
							...barBackgroundStyles,
							width: "100%",
							maxWidth: MAX_BAR_WIDTH,
							//pointerEvents: inputState === InputStates.HIDING ? "none" : "default",
						}}
					>
						<TextArea
							ref={fieldRef}
							$selectioncolor={colors.text.selection}
							style={{
								caretColor: textAreaCaretColor,
								color: colors.t9,
							}}
							maxLength={MAX_INPUT_LENGTH}
							onChange={onChange}
							onKeyDown={e => {
								if (value.length >= MAX_INPUT_LENGTH && e.key !== "Backspace" && e.key !== "Enter") {
									shakeAnimation.start(shakeKeyframes);
								}

								if (e.key === "Enter") {
									if (value.length < 2) {
										shakeAnimation.start(shakeKeyframes);
									} else {
										sendPrompt();
									}
									e.preventDefault();
									e.stopPropagation();
								}
							}}
						/>
						<Placeholder
							state={inputState}
							theme={currentPage.theme}
							label={isNewTome ? placeholderA : placeholderB}
							style={inputStyle}
						/>
						<Errors
							state={inputState}
							theme={currentPage.theme}
							inputState={inputState}
							show={inputState === InputStates.ERROR || inputState === InputStates.MODERATION}
							resubmit={resubmit}
						/>
					</Input>
				</Bar>
			</motion.div>

			<Status
				theme={currentPage.theme}
				inputState={inputState}
				buildState={buildState}
				transition={showHideTransition}
				barBackgroundStyles={barBackgroundStyles}
				statusText={statusText}
				promptIsOpen={promptIsOpen}
			/>
		</Wrapper>
	);
};
