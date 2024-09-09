import React, { useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, useAnimation, useMotionValue, transform, MotionConfig } from "framer-motion";

import { Page } from "../../components/page";
import { GlobalStyles } from "../../theme/global-styles";
import { useAnimationFrame } from "../../hooks/use-animation-frame";

const pageWidth = 772;
const margin = 16;
const contentWidth = pageWidth - margin * 2;
const tileWidth = (contentWidth - margin) / 2;
const tileHeight = tileWidth;
const rightX = pageWidth / 2 + margin / 2;
const handleWidth = margin;
const handleY = 0;
const handleCenter = (pageWidth - handleWidth) / 2;

export const TileResize02 = props => {
	const PageStyles = createGlobalStyle`
        
        .tileLeft {
            z-index:1;
        }
        .tileRight {
            z-index:0;
        }

        .tileGrowingLeft .tileLeft {
            z-index:0;
        }
        .tileGrowingLeft .tileRight {
            z-index:1;
        }

        body.resizing {
            cursor: ew-resize;
        }
    `;

	const pageRef = useRef(null);
	const pageRect = useRef(null);
	const handleRef = useRef(null);

	const tileTransitionState = useMotionValue("");
	const tileResizing = useMotionValue(false);

	const tileLeftHoverAnimation = useAnimation();
	const tileLeftSelectAnimation = useAnimation();
	const tileLeftBackgroundAnimation = useAnimation();
	const tileLeftX = useMotionValue(margin);
	const tileLeftWidth = useMotionValue(tileWidth);
	const tileLeftContentWidth = useMotionValue(tileWidth);
	const tileLeftScale = useMotionValue(1);
	const tileLeftOpacity = useMotionValue(1);

	const tileRightHoverAnimation = useAnimation();
	const tileRightSelectAnimation = useAnimation();
	const tileRightBackgroundAnimation = useAnimation();
	const tileRightX = useMotionValue(rightX);
	const tileRightWidth = useMotionValue(tileWidth);
	const tileRightContentWidth = useMotionValue(tileWidth);
	const tileRightScale = useMotionValue(1);
	const tileRightOpacity = useMotionValue(1);
	const tileRightContentX = useMotionValue(0);

	const handleX = useMotionValue(handleCenter);
	const handleAnimation = useAnimation();
	const handleMaterialAnimation = useAnimation();
	const handleDragStartX = useMotionValue(0);

	const MAX_OFFSET = 100;

	const onLeftTileHoverStart = (event, info) => {
		if (tileResizing.get()) {
			return;
		}
		tileLeftHoverAnimation.start({
			opacity: 1,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
	};

	const onLeftTileHoverEnd = (event, info) => {
		if (tileResizing.get()) {
			return;
		}
		tileLeftHoverAnimation.start({
			opacity: 0,
		});
	};

	const onRightTileHoverStart = (event, info) => {
		if (tileResizing.get()) {
			return;
		}
		tileRightHoverAnimation.start({
			opacity: 1,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
	};

	const onRightTileHoverEnd = (event, info) => {
		if (tileResizing.get()) {
			return;
		}
		tileRightHoverAnimation.start({
			opacity: 0,
		});
	};

	const onLeftTileClick = (event, info) => {
		tileLeftHoverAnimation.start({
			opacity: 0,
		});
		tileRightSelectAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
		tileLeftSelectAnimation.start({
			opacity: 1,
			transition: {
				type: "spring",
				duration: 0.1,
			},
		});
	};

	const onRightTileClick = (event, info) => {
		tileLeftHoverAnimation.start({
			opacity: 0,
		});
		tileLeftSelectAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
		tileRightSelectAnimation.start({
			opacity: 1,
			transition: {
				type: "spring",
				duration: 0.1,
			},
		});
	};

	const onWrapTapStart = (event, info) => {
		// Deselect any selected Tiles

		tileRightSelectAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
		tileLeftSelectAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
	};

	React.useLayoutEffect(() => {
		pageRect.current = pageRef.current.getBoundingClientRect();
	}, []);

	useAnimationFrame(deltaTime => {
		if (handleRef.current) {
			let hX = handleRef.current.getBoundingClientRect().x - pageRect.current.x;

			//hX = transform(hX, [0, pageWidth], [-400, pageWidth+400]);

			if (tileTransitionState.get() === "right") {
				/* Moving to the right */

				// Left tile
				tileLeftWidth.set(hX - handleWidth);
				tileLeftContentWidth.set(hX - handleWidth);

				// Right tile

				tileRightX.set(hX + handleWidth);
				tileRightWidth.set(pageWidth - tileRightX.get() - margin);
				tileRightContentX.set(-1 * (tileRightX.get() - rightX));

				const s = transform(hX, [tileWidth, handleCenter + 300], [1, 0]);
				//tileRightScale.set(s)
				tileRightOpacity.set(s);
			}

			if (tileTransitionState.get() === "left") {
				/* Moving to the left */

				// Left tile
				tileLeftWidth.set(hX - margin);
				const s = transform(hX, [tileWidth, handleCenter - 300], [1, 0]);
				// tileLeftScale.set(s)
				tileLeftOpacity.set(s);

				//Right tile
				tileRightX.set(hX + handleWidth);
				tileRightWidth.set(contentWidth - hX);
				tileRightContentWidth.set(contentWidth - hX);
			}
		}
	});

	const onHandleHoverStart = (event, info) => {
		if (tileResizing.get()) {
			return;
		}
		handleMaterialAnimation.start({
			opacity: 1.0,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
	};

	const onHandleHoverEnd = (event, info) => {
		if (tileResizing.get()) {
			return;
		}
		handleMaterialAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.4,
			},
		});
	};

	const onHandleTapStart = (event, info) => {
		document.body.classList.add("resizing");
		tileResizing.set(true);
		handleDragStartX.set(handleRef.current.getBoundingClientRect().x - pageRect.current.x);
		handleMaterialAnimation.start({
			opacity: 1.0,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});

		tileLeftHoverAnimation.start({
			opacity: 1,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});

		tileRightHoverAnimation.start({
			opacity: 1,
			transition: {
				type: "spring",
				duration: 0.2,
			},
		});
	};

	const onHandleDragStart = (event, info) => {
		tileResizing.set(true);
	};

	const onHandleDragEnd = (event, info) => {
		console.log(info);

		document.body.classList.remove("resizing");
		tileResizing.set(false);
		const hX = handleRef.current.getBoundingClientRect().x - pageRect.current.x;
		const distanceFromCenter = hX - handleCenter;
		let newX = handleCenter;
		if (distanceFromCenter < -MAX_OFFSET) {
			newX = 0;
		}
		if (distanceFromCenter > MAX_OFFSET) {
			newX = pageWidth - handleWidth;
		}

		handleAnimation.start({
			x: newX,
			transition: {
				type: "spring",
				duration: 0.3,
				bounce: 0.1,
			},
		});
		handleMaterialAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.3,
				bounce: 0.1,
			},
		});
		tileLeftHoverAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.3,
				bounce: 0.1,
			},
		});
		tileRightHoverAnimation.start({
			opacity: 0,
			transition: {
				type: "spring",
				duration: 0.3,
				bounce: 0.1,
			},
		});
	};

	const onHandleDrag = (event, info) => {
		const p = info.point.x - pageRect.current.x;

		//if (handleDragStartX.get() === handleCenter) {

		if (p > pageWidth / 2) {
			tileTransitionState.set("right");
		}
		if (p < pageWidth / 2) {
			tileTransitionState.set("left");
		}

		// } else {
		//     tileTransitionState.set("center")
		// }

		//handleX.set(clampNumber(info.point.x - pageRect.current.x, 0, pageWidth));
	};

	useEffect(() =>
		tileTransitionState.onChange(latest => {
			if (latest === "left") {
				document.body.classList.add("tileGrowingLeft");
			}
			if (latest === "right") {
				document.body.classList.remove("tileGrowingLeft");
			}
		})
	);

	return (
		<Page title="Tile Resize Prototype 02">
			<GlobalStyles />
			<PageStyles />
			<MotionConfig
				transition={{
					type: "spring",
					duration: 0.2,
					bounce: 0.1,
				}}
			/>
			<Wrap onTapStart={onWrapTapStart}>
				<TomePage ref={pageRef}>
					<Tile
						style={{
							x: tileLeftX,
							y: margin,
							width: tileLeftWidth,
							height: tileHeight,
							scale: tileLeftScale,
							opacity: tileLeftOpacity,
						}}
						onHoverStart={onLeftTileHoverStart}
						onHoverEnd={onLeftTileHoverEnd}
						onTap={onLeftTileClick}
						className="tileLeft"
					>
						<TileBackground animate={tileLeftBackgroundAnimation} />
						<TextTile width={tileLeftWidth} layout style={{ width: tileLeftContentWidth }}>
							<TextTileH1>Dieter Rams Says:</TextTileH1>
							<TextTileP>Good Design Is Innovative</TextTileP>
							<TextTileP>Good Design Makes a Product Useful</TextTileP>
							<TextTileP>Good Design Is Aesthetic</TextTileP>
							<TextTileP>Good Design Makes A Product Understandable</TextTileP>
							<TextTileP>Good Design Is Thorough Down To The Last Detail</TextTileP>
						</TextTile>
						<TileBorderHover animate={tileLeftHoverAnimation} />
						<TileBorderSelected animate={tileLeftSelectAnimation} />
					</Tile>

					<Tile
						style={{
							x: tileRightX,
							y: margin,
							width: tileRightWidth,
							height: tileHeight,
							scale: tileRightScale,
							opacity: tileRightOpacity,
						}}
						onHoverStart={onRightTileHoverStart}
						onHoverEnd={onRightTileHoverEnd}
						onTap={onRightTileClick}
						className="tileRight"
					>
						<TileBackground animate={tileRightBackgroundAnimation} />
						<ImageTile
							image={"./images/su-san-lee-g3PyXO4A0yc-unsplash-sized.jpg"}
							style={{ width: tileRightContentWidth, x: tileRightContentX }}
						/>
						<TileBorderHover animate={tileRightHoverAnimation} />
						<TileBorderSelected animate={tileRightSelectAnimation} />
					</Tile>

					<Handle
						style={{ x: handleX, y: handleY }}
						drag="x"
						onHoverStart={onHandleHoverStart}
						onHoverEnd={onHandleHoverEnd}
						onTapStart={onHandleTapStart}
						onMouseUp={onHandleDragEnd}
						onDrag={onHandleDrag}
						onDragStart={onHandleDragStart}
						onDragEnd={onHandleDragEnd}
						dragConstraints={{ left: 0, right: pageWidth - handleWidth }}
						dragElastic={0.1}
						dragMomentum={false}
						ref={handleRef}
						animate={handleAnimation}
					>
						<HandleMaterial animate={handleMaterialAnimation} />
					</Handle>
				</TomePage>
			</Wrap>
		</Page>
	);
};

const Wrap = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const TomePage = styled(motion.div)`
	background-color: black;
	width: 772px;
	height: 394px;
	background-color: #141414;
	border-radius: 28px;
	position: relative;
	overflow: hidden;
`;

const Tile = styled(motion.div)`
	position: absolute;
	background-color: #141414;
	border-radius: 8px;
	overflow: hidden;
`;

const TileBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: #1f1f1f;
	opacity: 0;
	border-radius: 8px;
`;

const TileBorderHover = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border: 2px solid #1f1f1f;
	box-sizing: border-box;
	border-radius: 8px;
	opacity: 0;
`;

const TileBorderSelected = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border: 2px solid #ed00eb;
	box-sizing: border-box;
	border-radius: 8px;
	opacity: 0;
`;

const TextTile = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	padding: 16px;
`;

const TextTileH1 = styled(motion.div)`
	color: rgba(255, 255, 255, 0.95);
	font-size: 21px;
	font-weight: 700;
	margin-bottom: 16px;
`;

const TextTileP = styled(motion.div)`
	color: rgba(255, 255, 255, 0.5);
	font-size: 16px;
	font-weight: 400;
	line-height: 1.4;
	margin-bottom: 16px;
`;

const ImageTile = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

const Handle = styled(motion.div)`
	width: 16px;
	height: 100%;
	position: absolute;
`;

const HandleMaterial = styled(motion.div)`
	position: absolute;
	width: 6px;
	left: calc(50% - 3px);
	top: calc(50% - 32px);
	opacity: 0;
	height: 64px;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 0.25);
	backdrop-filter: blur(5px);
`;
