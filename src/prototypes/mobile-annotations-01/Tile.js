import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import { TomeContext } from "./TomeContext";
import { transitions } from "../../ds/Transitions";
import { TileText } from "./TileText";
import { TileImage } from "./TileImage";
import { Annotation } from "./Annotation";

export const tiles = {
	NULL: { name: "null", icon: "Add" },
	TITLE: { name: "title", icon: "Title" },
	TEXT: { name: "text", icon: "Text" },
	CODE: { name: "code", icon: "Code" },
	TABLE: { name: "table", icon: "Table" },
	IMAGE: { name: "image", icon: "Image" },
	VIDEO: { name: "video", icon: "Video" },
	WEB: { name: "web", icon: "Add" },
	TWITTER: { name: "twitter", icon: "Add" },
	GIPHY: { name: "giphy", icon: "Add" },
	FIGMA: { name: "figma", icon: "Add" },
	FRAMER: { name: "framer", icon: "Add" },
	AIRTABLE: { name: "airtable", icon: "Add" },
	METRICS: { name: "metrics", icon: "Add" },
};

const Wrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
`;

const TileContent = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const AnnotationsContainer = styled(motion.div)``;

export const Tile = props => {
	const { expandedTileID, hideChrome, expandedTileAnimationComplete } = useContext(TomeContext);

	const TILE_W = props.tile.size === "full" ? 319 : 318;
	const TILE_H = props.tile.size === "full" ? 156 : 318;

	const TILE_W_EXPANDED = props.tile.size === "full" ? 375 : 375;
	const TILE_H_EXPANDED = props.tile.size === "full" ? 183 : 375;

	//const [shouldDrag, setShouldDrag] = useState(false);

	const expandTileAnimation = useAnimation();
	const hideChromeAnimation = useAnimation();
	// const tileSize = useMotionValue(TILE_W);

	useEffect(() => {
		expandedTileID.onChange(latest => {
			expandedTileAnimationComplete.set(0);
			if (latest === props.tile.id) {
				// tileSize.set(375);
				expandTileAnimation.start({
					top: props.tile.size === "full" ? 0 : -166,
					left: props.tile.size === "full" ? -29 : -29,
					opacity: 1,
					zIndex: 1,
					width: TILE_W_EXPANDED,
					height: TILE_H_EXPANDED,
				});
				//setShouldDrag(true);
			} else if (latest !== "") {
				// tileSize.set(318);
				expandTileAnimation.start({
					top: 0,
					left: 0,
					opacity: 0,
					zIndex: 0,
					width: TILE_W,
					height: TILE_H,
				});
				//setShouldDrag(false);
			} else if (latest === "") {
				// tileSize.set(318);
				expandTileAnimation.start({
					left: 0,
					top: 0,
					opacity: 1,
					zIndex: 0,
					width: TILE_W,
					height: TILE_H,
				});
				//setShouldDrag(false);
			}
		});
		hideChrome.onChange(latest => {
			if (expandedTileID.get() === props.tile.id && hideChrome.get() === 1) {
				hideChromeAnimation.start({
					opacity: 0,
				});
			} else if (expandedTileID.get() === props.tile.id && hideChrome.get() === 0) {
				hideChromeAnimation.start({
					opacity: 1,
				});
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<motion.div
		// drag={shouldDrag}
		// dragConstraints={{top:0, left: 0, bottom:0, right:0, }}
		>
			<Wrap
				animate={expandTileAnimation}
				initial={{
					width: TILE_W,
					height: TILE_H,
				}}
				transition={transitions.layoutTransition}
				onAnimationComplete={definition => {
					expandedTileAnimationComplete.set(1);
				}}
			>
				<TileContent>
					{props.tile.type === tiles.TEXT && <TileText blocks={props.tile.params.blocks} tileID={props.tile.id} />}
					{props.tile.type === tiles.IMAGE && <TileImage image={props.tile.params.image} tileID={props.tile.id} />}
				</TileContent>

				<AnnotationsContainer animate={hideChromeAnimation}>
					{props.tile.annotations &&
						props.tile.annotations.map(annotation => (
							<Annotation
								key={annotation.id}
								id={annotation.id}
								tileID={props.tile.id}
								order={annotation.order}
								lineStyle={annotation.lineStyle}
								color={annotation.color}
								text={annotation.text}
								position={annotation.position}
								x={annotation.x}
								y={annotation.y}
								expandedX={annotation.expandedX}
								expandedY={annotation.expandedY}
								offsetX={annotation.offsetX}
								alwaysOn={annotation.alwaysOn}
								tileWidth={TILE_W}
								tileHeight={TILE_H}
								tileWidthExpanded={TILE_W_EXPANDED}
								tileHeightExpanded={TILE_H_EXPANDED}
							></Annotation>
						))}
				</AnnotationsContainer>
			</Wrap>
		</motion.div>
	);
};
