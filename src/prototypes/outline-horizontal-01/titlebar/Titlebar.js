import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { Icon } from "../../../ds/Icon";
import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 56px;
	pointer-events: none;
`;

const Left = styled(motion.div)`
	position: absolute;
	left: 8px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: auto;
`;

const TomeTitle = styled(motion.div)`
	font-weight: 500;
	font-size: 15px;
	line-height: 18px;
	display: flex;
	align-items: center;
	color: rgba(255, 255, 255, 0.4);
	padding-right: 10px;
`;

const Right = styled(motion.div)`
	position: absolute;
	right: 12px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: auto;
	& > * {
		margin-left: 12px;
	}
`;

export const Titlebar = props => {
	const { enterFullscreen, setShowComments, showComments, clickCount } = useContext(TomeContext);

	return (
		<Wrap>
			<Left>
				<Button kind="icon" icon="ChevronLeft" to="/" />

				<TomeTitle>Untitled</TomeTitle>
				<Icon size={10} name="Dropdown" />
			</Left>

			<Right>
				<Button
					kind="icon"
					icon="View"
					height={32}
					selectedColor={"rgba(255,255,255,1)"}
					onTap={() => {
						clickCount.set(Math.random());
					}}
					// withCount={20}
				/>

				{/* <Button
					kind="link"
					type="default"
					size="lg"
					label="Comments"
					selected={showComments}
					onTap={() => {
						clickCount.set(Math.random());
						setShowComments(!showComments);
					}}
				/> */}

				<Button
					kind="icon"
					icon="CommentFill"
					height={32}
					selected={showComments}
					onTap={() => {
						clickCount.set(Math.random());
						setShowComments(!showComments);
					}}
					// withBadge={true}
					// withCount={13}
				/>

				<Button kind="link" type="default" size="lg" label="Share" />
				<Button kind="icon" icon="ExpandFlipped" height={32} onMouseUp={enterFullscreen} />
			</Right>
		</Wrap>
	);
};
