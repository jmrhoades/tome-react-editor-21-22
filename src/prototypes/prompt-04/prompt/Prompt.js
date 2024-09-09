import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { makeTome } from "./PromptScript";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { SuccessIndicator } from "../ds/SuccessIndicator";
import { PromptPlaceholders } from "./PromptPlaceholders";
import { Suggestions } from "./Suggestions";
import { ChipBar } from "./ChipBar";
import { Credits } from "./Credits";

const Wrap = styled(motion.div)`
	position: absolute;
	/* overflow: hidden; */
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;

	height: calc(100% - 48px);
	align-items: flex-end;

	/* height: 100%; */
	/* align-items: center; */
`;

const Control = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0px 8px;
	gap: 12px;
`;

const Input = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0 24px 8px;
	width: 100%;
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
	const [showChipMenu, setShowChipMenu] = React.useState(false);


	const placeholder = "Make a presentation about…";

	const prompts = [
		{ id: "prompt1", label: "Make a presentation about…" },
		{ id: "prompt2", label: "Create an outline for…" },
		{ id: "prompt3", label: "Add a page about…" },
	];

	const [suggestionHover, setSuggestionHover] = React.useState(placeholder);
	const [chipText, setChipText] = React.useState(placeholder);
	const fieldRef = React.useRef(null);
	const buildRef = React.useRef(null);
	const wrapRef = React.useRef(null);
	const controlRef = React.useRef(null);
	

	const [constraitsRect, setConstraintsRect] = React.useState({});


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
		} else {
			//setState(PromptStates.FRESH);
			if (showChipMenu) {
				setShowChipMenu(false);
			}
		}
	}, [promptIsOpen]);


	React.useLayoutEffect(() => {
	if (controlRef.current) {
		const r = controlRef.current.getBoundingClientRect();
		setConstraintsRect({
			top: -window.innerHeight / 2 + r.height / 2 + 12,
			left: -window.innerWidth + r.width + 16,
			bottom: window.innerHeight / 2 - r.height / 2 - 12,
			right: 12,
		});
	}
}, [promptIsOpen]);

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
			ref={wrapRef}
		>
			<Control
				ref={controlRef}
				//drag={true}
				//dragMomentum={false}
				//dragElastic={0.1}
				//dragConstraints={constraitsRect}
				style={{
					background: currentPage.theme.colors.backgrounds.panel,
					borderRadius: 12,
					width: 720,
					boxShadow: currentPage.theme.shadows.panel,
					pointerEvents: promptIsOpen ? "auto" : "none",
					// overflow: "hidden",
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
				onTap={() => {
					if (showChipMenu) {
						setShowChipMenu(false);
					}
				}}
			>
				<ChipBar
					chipText={chipText}
					setChipText={setChipText}
					theme={currentPage.theme}
					fieldRef={fieldRef}
					prompts={prompts}
					showChipMenu={showChipMenu}
					setShowChipMenu={setShowChipMenu}
					setPromptIsOpen={setPromptIsOpen}
				/>

				<Input>
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

					<Spinner>
						{showLoading && <LoadingIndicator size={32} key="loadingIndicator" />}
						{showSuccess && <SuccessIndicator key="successIndicator" />}
					</Spinner>
					<Suggestions
						theme={currentPage.theme}
						promptIsOpen={promptIsOpen}
						show={value.length === 0 && !showLoading}
					/>
					
				</Input>
				
				{/* <Credits theme={currentPage.theme} /> */}
			</Control>
		</Wrap>
	);
};
