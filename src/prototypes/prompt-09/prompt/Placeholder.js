import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import {
	tPlaceholderParentShow,
	tPlaceholderParentHide,
	tPlaceholderChildShow,
	tPlaceholderChildHide,
} from "./Transitions";

import { ListStates } from "./Prompt";
import { Placeholders } from "./Placeholders";
import { suggestionsList } from "./PromptConstants";

const Wrap = styled(motion.div)`
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const ParentLabel = styled(motion.div)`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	background: linear-gradient(
		90deg,
		${props => props.$shineBase} 0%,
		${props => props.$shineBase} 45%,
		${props => props.$shineHighlight} 55%,
		${props => props.$shineBase} 65%,
		${props => props.$shineBase} 100%
	);
	background-size: 300% 100%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: move 6s linear infinite;
	animation-delay: 2s;
	@keyframes move {
		0% {
			background-position: 100% 0%;
		}
		33% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 0% 0%;
		}
	}
`;

const ChildLabel = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	/* width: 100%; */
	/* height: 28px; */
`;

const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

export const Placeholder = props => {
	const isParent = props.listState === ListStates.ROOT;
	const isScoped = props.listState === ListStates.SCOPED;
	const cyclePlaceholdersInterval = React.useRef(null);
	const parentPlaceholderText = "What would you like to do?";
	const [scopedPlaceholderText, setScopedPlaceholderText] = React.useState(false);
	const [scopedPlaceholders, setScopedPlaceholders] = React.useState(null);
	const [scopedPlaceholderKey, setScopedPlaceholderKey] = React.useState("scoped_placeholder_key_default");
	const [scopedPlaceholderIndex, setScopedPlaceholderIndex] = React.useState(0);

	const initScopedPlaceholder = () => {
		let s = "";
		let sList = [];
		if (props.scope) {
			if (
				props.scope.id === "command_create_tome" ||
				props.scope.id === "command_create_image" ||
				props.scope.id === "command_create_page"
			) {
				const id = props.scope.id;
				let obj = suggestionsList.find(l => l.id === id);
				sList = obj.suggestions;
				if (props.scope.id === "command_create_tome" && props.prompt.type.id === "STORY") {
					let obj = suggestionsList.find(l => l.type === "STORY");
					sList = obj.suggestions;
				}
				shuffleArray(sList);
				s = sList[scopedPlaceholderIndex];
				setScopedPlaceholders([...sList]);
			} else {
				setScopedPlaceholders(null);
				s = props.scope.placeholder;
			}
		}
		setScopedPlaceholderText(s);
	};

	const showNextPlacholder = (duration = 1000) => {
		cyclePlaceholdersInterval.current = setTimeout(() => {
			setScopedPlaceholderIndex(t => {
				if (t >= scopedPlaceholders.length-1) {
					return 0;
				} else {
					return t + 1;
				}
			});
		}, duration);
	}

	const getDurationForString = (s) => {
		return (s.length * 150) + 2500;
	}

	// Initialize placeholders when changed to scoped state 
	React.useEffect(() => {
		if (props.listState === ListStates.SCOPED) {
			initScopedPlaceholder();
		}
	}, [props.listState]);

	// If there's suggestions, kick off the cycle animation, listen for tab and right arrow events
	React.useEffect(() => {
		const onKeyDown = e => {
			if (e.key === "Tab" || e.key === "ArrowRight" ) {
				props.setValue(scopedPlaceholderText);
				e.preventDefault();
				e.stopPropagation();
			}
		};
		if (props.listState === ListStates.SCOPED && scopedPlaceholders && scopedPlaceholders.length > 1) {
			showNextPlacholder(getDurationForString(scopedPlaceholderText));
			window.addEventListener("keydown", onKeyDown);
		}
		return function cleanup() {
			clearInterval(cyclePlaceholdersInterval.current);
			window.removeEventListener("keydown", onKeyDown);

		};
	}, [props.promptState, scopedPlaceholders, scopedPlaceholderText]);

	// Respond to incrementing the suggestion index
	React.useEffect(() => {
		if (props.listState === ListStates.SCOPED && scopedPlaceholders && scopedPlaceholders.length > 1) {
			let s = scopedPlaceholders[scopedPlaceholderIndex];
			setScopedPlaceholderText(s);
			setScopedPlaceholderKey("scoped_placeholder_key_" + scopedPlaceholderIndex);
			showNextPlacholder(getDurationForString(s));
		}
	}, [scopedPlaceholderIndex]);

	return (
		<Wrap
			key="textarea_placeholder_wrap"
			style={{
				...props.style,
				color: props.theme.colors.promptbar.placeholder,
			}}
		>
			<ParentLabel
				initial={false}
				animate={{ opacity: isParent ? 1 : 0 }}
				transition={isParent ? tPlaceholderParentShow : tPlaceholderParentHide}
				$shineBase={props.theme.colors.promptbar.shineBase}
				$shineHighlight={props.theme.colors.promptbar.shineHighlight}
			>
				{parentPlaceholderText}
			</ParentLabel>

			<AnimatePresence>
				{isScoped && (
					<ChildLabel
						key={scopedPlaceholderKey}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: tPlaceholderChildShow }}
						exit={{ opacity: 0, transition: tPlaceholderChildHide }}
					>
						{scopedPlaceholderText}
					</ChildLabel>
				)}
			</AnimatePresence>

		
		</Wrap>
	);
};
