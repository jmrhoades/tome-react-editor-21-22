import React from "react";
import { AnimatePresence, motion, useAnimationControls, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Configuration, OpenAIApi } from "openai";
import smartquotes from "smartquotes";

//import SSE from "sse";
//import { encode } from "gpt-3-encoder";

import { TomeContext } from "../tome/TomeContext";
import { Placeholder } from "./Placeholder";
import {
	//startGenerating,
	makeTitlePage,
	//makeOutline,
	//makePage1,
	//makePage2,
	//makePage3,
	//makePage4,
	//makePage5,
	//makePage6,
} from "./PromptScript";
import { Status } from "./Status";
import { Errors } from "./Errors";
import { SubmitButton } from "./SubmitButton";
import { Settings } from "./Settings";
import { Review } from "./Review";
import { makeTitlePrompt, makePagesPrompt, buildPageFromJSON, initializeOutline } from "./GPT3";
import { imageOptions, artStyles } from "./PromptConstants";

const Wrapper = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	padding: 48px 72px 64px;
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
	margin: 0;
	box-shadow: none;
	appearance: none;
	resize: none;
	position: relative;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	::selection {
		background: ${props => props.$selectioncolor};
	}
`;

export const InputStates = {
	EMPTY: "empty",
	CONTENT: "content",
	ERROR: "error",
	MAX_CHAR: "max_characters",
	HIDING: "hiding",
};

export const InputErrorStates = {
	MODERATION: "moderation",
	BUSY: "busy",
	UNKNOWN: "unknown",
};

export const BuildStates = {
	HIDING: "hiding",
	WAITING: "waiting",
	BUILDING: "building",
	REVIEW: "review",
	FINISHED: "finished",
	DISCLAIMER: "disclaimer",
};

const MAX_TOKENS = 4000;
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
		setIsReviewing,
		autoPaging,
		resetTome,
		closeMenu,
		menuInfo,
		//askForGeneratedImages,
		requestImageForTile,
	} = React.useContext(TomeContext);

	//console.log("PROMPT KEY", process.env.REACT_APP_OPEN_AI_KEY)
	const configuration = new Configuration({
		apiKey: process.env.REACT_APP_OPEN_AI_KEY,
		model: "gpt-3.5-turbo-instruct",
	});
	const openai = new OpenAIApi(configuration);

	const [value, setValue] = React.useState("");
	const [statusText, setStatusText] = React.useState("");

	const [inputState, setInputState] = React.useState(InputStates.EMPTY);
	const [inputErrorState, setInputErrorState] = React.useState(null);

	const [buildState, setBuildState] = React.useState(BuildStates.HIDING);

	const [isTryingAgain, setIsTryingAgain] = React.useState(false);

	const fieldRef = React.useRef(null);
	const wrapRef = React.useRef(null);
	const controlRef = React.useRef(null);

	const colors = currentPage.theme.colors;

	// Generate page or generate tome
	const generateTome =
		isTryingAgain || (tomeData.tiles.length === 1 && tomeData.tiles[0].params.blocks[0].content === "");
	const placeholderText = generateTome
		? "Create a " + tomeData.prompt.type.placeholder + " about…"
		: "Add a page about…";

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

	// Update height of textarea as content is added or removed
	React.useLayoutEffect(() => {
		if (fieldRef.current) {
			// Reset height - important to shrink on delete
			fieldRef.current.style.height = MIN_TEXTAREA_HEIGHT + "px";
			// Set height
			fieldRef.current.style.height = `${Math.max(fieldRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
		}
	}, [value, inputState, promptIsOpen]);

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

	const clearField = () => {
		if (fieldRef.current) {
			fieldRef.current.value = "";
		}
		setValue("");
	};

	// Re-focus the textare when a settings menu closes
	React.useEffect(() => {
		if (promptIsOpen && inputState !== InputStates.HIDING && !menuInfo.show) {
			focusInput();
		}
	}, [menuInfo.show]);

	React.useEffect(() => {
		if (promptIsOpen) {
			// console.log("resetting field");

			setInputState(value.length > 0 ? InputStates.CONTENT : InputStates.EMPTY);
			setBuildState(BuildStates.HIDING);

			/*	
			setValue(
				"A company called Cloudhop, a new flying bus that transports tech employees from San Francisco to a silicon valley campus"
			);
			setInputState(InputStates.CONTENT);
			setBuildState(BuildStates.HIDING);
			setTimeout(() => {
				setInputState(InputStates.HIDING);
				setBuildState(BuildStates.WAITING);
				setStatusText(`Creating ${tomeData.prompt.type.placeholder}…`);
			}, 2000);
			setTimeout(() => {
				setStatusText(`Creating page 1…`);
			}, 5000);
			setTimeout(() => {
				setStatusText(`Creating page 2…`);
			}, 6000);
			setTimeout(() => {
				setStatusText(`Creating page 3…`);
			}, 7000);
			setTimeout(() => {
				setStatusText(`Creating page 4…`);
			}, 8000);
			setTimeout(() => {
				setStatusText(`Creating page 5…`);
			}, 9000);
			setTimeout(() => {
				setStatusText(`Creating page 6…`);
			}, 10000);
			setTimeout(() => {
				setStatusText(`${tomeData.prompt.type.name} created`);
				setBuildState(BuildStates.FINISHED);
			}, 11000);
			setTimeout(() => {
				setBuildState(BuildStates.REVIEW);
			}, 13000);
	*/
			//setValue("");
			if (fieldRef.current) {
				//fieldRef.current.value = "";
				fieldRef.current.focus();
			}
		} else {
			if (buildState === BuildStates.REVIEW) {
				setIsReviewing(false);
				setValue("");
			}
			if (isTryingAgain) {
				setIsTryingAgain(false);
				setValue("");
			}
		}
	}, [promptIsOpen]);

	const showGeneratedPage = page => {
		//console.log("isAutoPaging", autoPaging.current);
		if (autoPaging.current) {
			showPage(page);
		}
	};

	const submitPrompt = (key = null) => {
		if (value.length >= MAX_INPUT_LENGTH && key !== "Backspace" && key !== "Enter") {
			shakeAnimation.start(shakeKeyframes);
		}
		if (key === "Enter") {
			if (value.length < 2) {
				shakeAnimation.start(shakeKeyframes);
			} else {
				if (generateTome) {
					if (isTryingAgain) {
						resetTome();
						setIsTryingAgain(false);
					}
					sendGenerateTomePrompt();
				} else {
					shakeAnimation.start(shakeKeyframes);
				}
			}
			//e.preventDefault();
			//e.stopPropagation();
		}
	};

	const cycleThroughErrors = () => {
		console.log(inputErrorState);
		// Cycle through error states for testing purposes
		if (inputErrorState === null || inputErrorState === InputErrorStates.UNKNOWN) {
			setInputErrorState(InputErrorStates.BUSY);
		} else if (inputErrorState === InputErrorStates.BUSY) {
			setInputErrorState(InputErrorStates.MODERATION);
		} else {
			setInputErrorState(InputErrorStates.UNKNOWN);
		}
		setTimeout(() => {
			setInputState(InputStates.ERROR);
			setBuildState(BuildStates.HIDING);
			setIsGenerating(false);
		}, 1000);
	};

	const sendGenerateTomePrompt = () => {
		fieldRef.current.blur();
		setStatusText(`Creating ${tomeData.prompt.type.placeholder}…`);
		setInputState(InputStates.HIDING);
		setBuildState(BuildStates.WAITING);
		setIsGenerating(true);

		if (tomeData.prompt.showError) {
			cycleThroughErrors();
		} else {
			//
			// Start Generating!
			//
			const autoArtStyle =
				tomeData.prompt.images.id === imageOptions[0].id && tomeData.prompt.artStyle.id === artStyles[0].id;
			const prompt = makeTitlePrompt(value, tomeData.prompt.type, autoArtStyle);
			console.log(prompt);
			sendCompletionQuery(prompt, makeTitle);
			//sendStreamingCompletionQuery(prompt);
		}
	};

	async function sendCompletionQuery(prompt, callback) {
		const tokens = Math.round(MAX_TOKENS - prompt.length / 4);

		console.log("------- send GTP request ---------");
		console.log("temperature", tomeData.prompt.type.temperature);
		console.log("tokens", tokens);
		console.log(prompt);

		async function runCompletion() {
			try {
				const completion = await openai.createCompletion({
					model: "gpt-3.5-turbo-instruct",
					temperature: tomeData.prompt.type.temperature,
					max_tokens: tokens,
					prompt: prompt,
				});
				//console.log(completion.data.choices[0].text);
				callback(completion.data.choices[0].text);
			} catch (error) {
				if (error.response) {
					handleError();
					console.log(error.response.status);
					console.log(error.response.data);
				} else {
					console.log(error.message);
				}
			}
		}
		runCompletion();
	}

	

	/*
	const sendStreamingCompletionQuery = async (prompt, callback) => {
		const tokens = Math.round(MAX_TOKENS - prompt.length / 4);

		await fetchEventSource("https://api.openai.com/v1/completions", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + process.env.REACT_APP_OPEN_AI_KEY,
			},
			method: "POST",
			body: JSON.stringify({
				model: "gpt-3.5-turbo-instruct",
				prompt: prompt,
				temperature: tomeData.prompt.type.temperature,
				max_tokens: tokens,
				stream: true,
				stop: ["\n\n"],
			}),
			async onopen(response) {
				if (response.ok) {
					return; // everything's good
				} else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
					// client-side errors are usually non-retriable:
					//throw new FatalError();
					console.log("ERROR")
				} else {
					//throw new RetriableError();
					console.log("ERROR")
				}
			},
			onmessage(msg) {
				console.log("msg: ")
				//console.log(msg)
				const message = msg.replace(/^data: /, "");

				const parsed = JSON.parse(message);
				console.log(parsed.choices[0].text);

				// if the server emits an error message, throw an exception
				// so it gets handled by the onerror callback below:
				if (msg.event === 'FatalError') {
					//throw new FatalError(msg.data);
					console.log("ERROR")
				}
			},
			onclose() {
				// if the server closes the connection unexpectedly, retry:
				//throw new RetriableError();
				console.log("ERROR")
			},
			onerror(err) {
				if (err) {
					throw err; // rethrow to stop the operation
				} else {
					// do nothing to automatically retry. You can also
					// return a specific retry interval here.
				}
			}
		})
	};
	*/

	/*
	const sendStreamingCompletionQuery = async (prompt, callback) => {
		const tokens = Math.round(MAX_TOKENS - prompt.length / 4);

		const completion = await openai.createCompletion(
			{
				model: "gpt-3.5-turbo-instruct",
				prompt: prompt,
				max_tokens: tokens,
				temperature: tomeData.prompt.type.temperature,
				stream: true,
			},
			{ responseType: "stream" }
		);
		return new Promise((resolve) => {
			let result = "";
			completion.data.on("data", (data) => {
				const json = data?.toString()?.slice(6);
				if (json === "[DONE]\n\n") {
					console.log(result)
					resolve(result);
				} else {
					const token = JSON.parse(json)?.choices?.[0]?.text;
					result += token;
					console.log(token)
					//callback(token);
				}
			});
		});
	}
	*/

	/*
	const sendStreamingCompletionQuery = async (prompt, callback) => {
		console.log(prompt);
		const tokens = Math.round(MAX_TOKENS - prompt.length / 4);

		try {
			const res = await openai.createCompletion(
				{
					//model: "text-curie-001",
					model: "gpt-3.5-turbo-instruct",
					prompt: prompt,
					max_tokens: tokens,
					temperature: tomeData.prompt.type.temperature,
					stream: true,
				},
				{ responseType: "stream" }
			);
			res.data.on("data", data => {
				const lines = data
					.toString()
					.split("\n")
					.filter(line => line.trim() !== "");
				for (const line of lines) {
					const message = line.replace(/^data: /, "");
					if (message === "[DONE]") {
						console.log("DONE!");
						return; // Stream finished
					}
					try {
						const parsed = JSON.parse(message);
						console.log(parsed.choices[0].text);
					} catch (error) {
						console.error("Could not JSON parse stream message", message, error);
					}
				}
			});
		} catch (error) {
			if (error.response?.status) {
				console.error(error.response.status, error.message);
			}
		}
		//console.log(res);
		//res.data.on("data", console.log);
	};
	*/

	const makeTitle = message => {
		console.log("makeTitle");
		console.log(message);
		try {
			const { title, artStyle } = JSON.parse(message);
			if (title && title.length > 0) {
				// Set art style from GPT categorization
				for (let i = 0; i < artStyles.length; i++) {
					if (artStyles[i].id === artStyle) {
						tomeData.prompt.artStyle = artStyles[i];
						console.log("new art style: ", artStyles[i]);
						saveState();
					}
				}

				//const title = jsonResponse.trim();
				let title1 = smartquotes(title);
				makeTitlePage(title1, tomeData, saveState, currentPage.theme);
				setBuildState(BuildStates.BUILDING);
				//setStatusText("Creating pages…");

				// Generate pages
				const prompt = makePagesPrompt(
					value,
					tomeData.prompt.type.placeholder,
					tomeData.prompt.type.pages,
					tomeData.prompt.images,
					tomeData.prompt.artStyle
				);
				console.log(prompt);
				sendCompletionQuery(prompt, makePages);
				// !!! TODO MAKE THIS WORKKKK !!!!!
				//sendStreamingQuery(prompt)
			} else {
				handleParseError();
			}
		} catch (error) {
			console.error("Could not JSON parse stream message", message, error);
			handleParseError();
		}
	};

	const handleError = () => {
		setInputErrorState(InputErrorStates.BUSY);
		setInputState(InputStates.ERROR);
		setBuildState(BuildStates.HIDING);
		setIsGenerating(false);
	};

	const handleParseError = () => {
		setInputErrorState(InputErrorStates.UNKNOWN);
		setInputState(InputStates.ERROR);
		setBuildState(BuildStates.HIDING);
		setIsGenerating(false);
	};

	const makePages = async message => {
		console.log("makePages");
		console.log(message);
		try {
			const { pages } = JSON.parse(message);
			if (pages && pages.length > 0) {
				const outlineTextTile = initializeOutline(tomeData, currentPage.theme, saveState);
				let pageCounter = currentPage.order;
				for (const page of pages) {
					setStatusText(`Creating page ${pageCounter++}…`);
					await buildPageFromJSON(
						tomeData.prompt.type.placeholder,
						tomeData.prompt.images,
						page,
						tomeData,
						saveState,
						showGeneratedPage,
						currentPage.theme,
						autoPaging,
						outlineTextTile,
						requestImageForTile,
						tomeData.prompt.artStyle
					);
				}
				//console.log(pages);
				setBuildState(BuildStates.FINISHED);
				setStatusText(`${tomeData.prompt.type.name} created`);
				setTimeout(() => {
					setBuildState(BuildStates.REVIEW);
					setIsGenerating(false);
					setIsReviewing(true);
					//props.tile && props.tile.params && props.tile.params.canRegenerate
					//acceptPresentation()
				}, 1500);
			} else {
				handleParseError();
			}
		} catch (error) {
			handleParseError();
			console.error("Could not JSON parse stream message", message, error);
		}
	};

	const tryAgain = () => {
		setInputState(InputStates.CONTENT);
		setBuildState(BuildStates.HIDING);
		setIsGenerating(false);
		setIsReviewing(true);
		setIsTryingAgain(true);
		autoPaging.current = true;
		//resetTome();
		// Focus at end of tome
		focusInput();
	};

	const acceptPresentation = () => {
		clearField();
		setPromptIsOpen(false);
		setIsGenerating(false);
		setIsReviewing(false);
	};

	const showHideTransition = {
		default: {
			type: "spring",
			bounce: 0.05,
			duration: 0.4,
		},
		opacity: {
			type: "tween",
			ease: "easeOut",
			duration: 0.3,
		},
	};

	const revealTransition = {
		type: "spring",
		bounce: 0,
		duration: 0.3,
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

			<AnimatePresence>
				{promptIsOpen && inputState !== InputStates.HIDING && (
					<motion.div
						style={{
							//pointerEvents: promptIsOpen ? "auto" : "none",
							pointerEvents: "auto",
							width: "100%",
							maxWidth: MAX_BAR_WIDTH,
						}}
						initial={{
							opacity: 0,
							scale: 0.95,
							y: 8,
						}}
						animate={{
							opacity: 1,
							scale: 1,
							y: 0,
						}}
						exit={{
							opacity: 0,
							scale: 0.95,
							y: 0,
						}}
						transition={{
							default: {
								type: "spring",
								bounce: 0.2,
								duration: 0.2,
							},
							opacity: {
								type: "tween",
								ease: "easeOut",
								duration: promptIsOpen && inputState !== InputStates.HIDING ? 0.2 : 0.2,
							},
						}}
					>
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
									//pointerEvents: promptIsOpen ? "auto" : "none",
									width: "100%",
									maxWidth: MAX_BAR_WIDTH,
								}}
								onMouseUp={e => {
									closeMenu();
									//console.log("tap");
								}}
							>
								<Input
									style={{
										...inputStyle,
										...barBackgroundStyles,
										width: "100%",
										height: "auto",
										maxWidth: MAX_BAR_WIDTH,
										paddingBottom: 12,
									}}
									animate={{
										y: inputState === InputStates.ERROR ? 44 : 0,
									}}
									//initial={false}
									transition={revealTransition}
								>
									<TextArea
										ref={fieldRef}
										key={"prompt_bar_textfield"}
										$selectioncolor={colors.text.selection}
										style={{
											caretColor: textAreaCaretColor,
											color: colors.t9,
											//color: colors.text.body,
											//meight: MIN_TEXTAREA_HEIGHT,
											// paddingRight: 24,
											y: -4,
										}}
										maxLength={MAX_INPUT_LENGTH}
										onChange={onChange}
										value={value}
										onKeyDown={e => {
											submitPrompt(e.key);
											if (e.key === "Enter") {
												e.preventDefault();
												e.stopPropagation();
											}
										}}
										onFocus={e => {
											closeMenu();
											moveCaretAtEnd(e);
										}}
										autoFocus
									></TextArea>
									<Placeholder
										state={inputState}
										theme={currentPage.theme}
										// label={tomeData.prompt.type.placeholder}
										style={inputStyle}
										placeholderText={placeholderText}
									/>

									{/* <SubmitButton state={inputState} theme={currentPage.theme} submit={submitPrompt} /> */}

									{generateTome && <Settings theme={currentPage.theme} prompt={tomeData.prompt} />}

									{inputState === InputStates.ERROR && (
										<Errors
											theme={currentPage.theme}
											resubmit={resubmit}
											inputErrorState={inputErrorState}
											transition={revealTransition}
										/>
									)}
								</Input>
							</Bar>
						</motion.div>
					</motion.div>
				)}

				{promptIsOpen && buildState !== BuildStates.HIDING && (
					<Status
						key="build_status"
						theme={currentPage.theme}
						inputState={inputState}
						buildState={buildState}
						transition={showHideTransition}
						barBackgroundStyles={barBackgroundStyles}
						statusText={statusText}
						promptIsOpen={promptIsOpen}
						tryAgain={tryAgain}
						accept={acceptPresentation}
					/>
				)}

				{/* {promptIsOpen && buildState === BuildStates.REVIEW && (
					<Review
						key="build_review"
						theme={currentPage.theme}
						buildState={buildState}
						barBackgroundStyles={barBackgroundStyles}
						tryAgain={tryAgain}
						accept={acceptPresentation}
					/>
				)} */}
			</AnimatePresence>
		</Wrapper>
	);
};
