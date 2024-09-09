import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Image = styled(motion.div)`
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

/* FIX ME
This uses a nasty, double-image hack to get around a framer motion bug(?)
caused by using a draggable layer inside a "layout" animated parent
But it still fails sometimes
*/

export const ImageTile = props => {
	return (
		<ImageWrap
			whileTap={props.editorState === "presenting" ? { scale: 1.1 } : null}
			onMouseDown={
				props.editorState === "presenting"
					? e => {
							props.setImageTileClickEmphasized(true);
							props.setTextTileBlockClickEmphasized(false);
					  }
					: null
			}
			onMouseUp={
				props.editorState === "presenting"
					? e => {
							props.setImageTileClickEmphasized(false);
							e.stopPropagation();
					  }
					: null
			}
			transition={{
				duration: 0.25,
				ease: [0.4, 0, 0.1, 1],
			}}
			animate={{
				opacity: props.textTileClickEmphasized  ? 0.25 : 1,
				
			}}
		>
			<Image
				image={props.image}
				style={{
					borderRadius: props.borderRadius,
					opacity: props.isPresentTransitionedFinished ? 0 : 1,
				}}
			/>

			<Image
				image={props.image}
				layout
				drag
				dragElastic={0.2}
				dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
				onDragEnd={(event, info) => props.setImageTileClickEmphasized(false)}
				style={{
					borderRadius: props.borderRadius,
					opacity: props.isPresentTransitionedFinished ? 1 : 0,
				}}
			/>
		</ImageWrap>
	);
};
