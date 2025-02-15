import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { Placeholder } from "./Placeholder";
import { ErrorStates, PromptStates, ListStates } from "./Prompt";
import { moveTransition } from "./Transitions";

const Input = styled(motion.div)`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: start;
	gap: 12px;
`;

const TextWrap = styled(motion.div)`
	position: relative;
	width: 100%;
`;

const Multiline = styled(motion.textarea)`
	max-height: 72vh;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}

	display: block;
	width: 100%;
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	background: transparent;
	appearance: none;
	resize: none;
	box-shadow: none;
	border-radius: 0;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;

	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

const Singleline = styled(motion.input)`
	display: block;
	width: 100%;
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
	background: transparent;
	appearance: none;
	box-shadow: none;
	border-radius: 0;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

const inputFontStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "20px",
	lineHeight: "28px",
};

export const MAX_INPUT_LENGTH = 1000;
export const MIN_TEXTAREA_HEIGHT = 28;

export const TextArea = React.forwardRef(function TextArea(props, ref) {
	const colors = props.theme.colors;
	const fieldRef = React.useRef(null);
	const fieldHeight = React.useRef(null);
	const textAreaCaretColor = props.errorState !== ErrorStates.NONE ? colors.warning : colors.accent;
	const isLoading = props.promptState === PromptStates.DELEGATE;
	const isMultiline = props.listState === ListStates.SCOPED && props.scope.generative;

	// Update height of textarea as content is added or removed
	React.useEffect(() => {
		if (fieldRef.current && isMultiline) {
			fieldHeight.current = fieldRef.current.offsetHeight;

			// Reset height - important to shrink on delete
			fieldRef.current.style.height = MIN_TEXTAREA_HEIGHT + "px";
			// Set height
			const newTextInputHeight = Math.max(fieldRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT);
			fieldRef.current.style.height = `${newTextInputHeight}px`;
			if (fieldHeight.current !== fieldRef.current.offsetHeight) {
				props.updateContainerHeight(true);
			}
			//const extraLines = (newTextInputHeight / 28) - 1;
			//props.setExtraLineCount(extraLines);
			//console.log(newTextInputHeight, extraLines);
		}
	}, [props.value, isMultiline]);

	React.useEffect(() => {
		focusInput();
	}, [props.scope]);

	const focusInput = () => {
		if (fieldRef.current) {
			fieldRef.current.focus();
		}
	};

	const moveCaretAtEnd = e => {
		var temp_value = e.target.value;
		e.target.value = "";
		e.target.value = temp_value;
	};

	return (
		<Input
			id={"prompt_bar_textfield_wrap"}
			ref={ref}
			style={{
				padding: 20,
				minHeight: 68,
			}}
		>
			<TextWrap
				onPointerDownCapture={e => e.stopPropagation()}
				// layout="position"
				// transition={moveTransition}
			>
				{isMultiline && (
					<Multiline
						key={"prompt_bar_textfield"}
						ref={fieldRef}
						id={"prompt_bar_textfield"}
						$selectioncolor={colors.text.selection}
						style={{
							caretColor: textAreaCaretColor,
							color: isLoading ? colors.t6 : colors.promptbar.textfield,
							height: MIN_TEXTAREA_HEIGHT,
							...inputFontStyles,
						}}
						value={props.value}
						onKeyDown={props.onInputKeyDown}
						onChange={props.onChange}
						onFocus={e => {
							moveCaretAtEnd(e);
						}}
						autoFocus
						spellCheck="false"
						autoComplete="off"
						disabled={!props.promptIsOpen}
					></Multiline>
				)}
				{!isMultiline && (
					<Singleline
						key={"prompt_bar_textfield"}
						ref={fieldRef}
						id={"prompt_bar_textfield"}
						$selectioncolor={colors.text.selection}
						style={{
							caretColor: textAreaCaretColor,
							color: colors.promptbar.textfield,
							//position: "absolute",
							...inputFontStyles,
						}}
						value={props.value}
						onKeyDown={props.onInputKeyDown}
						onChange={props.onChange}
						onFocus={e => {
							moveCaretAtEnd(e);
						}}
						autoFocus
						spellCheck="false"
						autoComplete="off"
						disabled={!props.promptIsOpen}
					/>
				)}
				<AnimatePresence>
					{props.value.length === 0 && (
						<Placeholder
							value={props.value}
							theme={props.theme}
							scope={props.scope}
							listState={props.listState}
							setValue={props.setValue}
							prompt={props.prompt}
							style={inputFontStyles}
						/>
					)}
				</AnimatePresence>
			</TextWrap>
		</Input>
	);
});
