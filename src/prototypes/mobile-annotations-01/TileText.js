import React, { useContext }  from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { textBlockType } from "./TestPages";
import { TomeContext } from "./TomeContext";

const Wrap = styled(motion.div)`
	color: rgba(255, 255, 255, 1);
	pointer-events: auto;
	& h1 {
		font-size: 26px;
		font-weight: 800;
		line-height: 33px;
		margin-bottom: 8px;
	}
	& p {
		font-size: 20px;
		line-height: 28px;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 8px;
	}
	& ul {
		font-size: 20px;
		line-height: 28px;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 8px;
		padding-inline-start: 16px;
		list-style-type: disc;
	}
	& li {
		padding: 0.35em 0;
		&::marker {
			color: rgb(166, 166, 166);
		}
	}
`;

const TextBlock = styled(motion.div)``;

export const TileText = props => {
	const { activeAnnotationID } = useContext(TomeContext);

	const padding = 14;
	return (
		<Wrap
			style={{
				paddingLeft: padding,
				paddingRight: padding,
				paddingTop: padding,
			}}
			onTap={e => {
				activeAnnotationID.set("");
			}}

		>
			{props.blocks &&
				props.blocks.map(block => (
					<TextBlock key={"b" + Math.random()}>
						{block.type === textBlockType.H1 && <h1 key={"b" + Math.random()}>{block.content}</h1>}

						{block.type === textBlockType.P && <p key={"b" + Math.random()}>{block.content}</p>}

						{block.type === textBlockType.LI && (
							<ul key={"b" + Math.random()}>
								{block.content.map(li => (
									<li key={"b" + Math.random()}>{li}</li>
								))}
							</ul>
						)}
					</TextBlock>
				))}
		</Wrap>
	);
};
