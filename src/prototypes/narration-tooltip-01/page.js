import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	color: #fff;

	width: 100%;
	min-height: 100%;
	position: absolute;
	top: 0;
	left: 0;

	/* flex-shrink: 0;
	scroll-snap-align: start; */
`;

export const Page = props => {
	const data = props.page;
	const tiles = props.page.tiles;
	const isSelected = props.currentPage.id === data.id;
	return (
		<Wrap
			style={{
				background: data.theme.page,
				opacity: isSelected ? 1 : 0,
				color: data.theme.heading,
			}}
		>
			{/* Page {data.order} */}
			{tiles && tiles.map(tile => tile.type === "image" && <TileImage key={tile.id} data={tile.data} />)}
		</Wrap>
	);
};

const TileImage = props => {
	console.log(props.data)
	return (
		<motion.div style={{}}>
			{/* <motion.img
				src={props.data.imageURL}
				style={{
					maxWidth: "100%",
					aspectRatio: props.data.aspectRatio,
				}}
			/> */}
			<motion.div 
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundSize: props.data.imageSize ? props.data.imageSize : "cover",
					backgroundPosition: props.data.imagePosition ? props.data.imagePosition : "50% 50%",
					backgroundImage: `url("${props.data.imageURL}")`,
					backgroundRepeat: "no-repeat",
				}}
			/>

			
		</motion.div>
	);
};
