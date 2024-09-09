import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { MetricsContext } from "../tome/MetricsContext";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
`;

const HeadsContainer = styled(motion.div)`
	overflow: hidden;
	line-height: 1;
`;
const Head = styled(motion.div)`
	display: inline-block;
	margin: 0;
	& img {
		display: block;
		width: 100%;
		height: auto;
		margin: 0;
	}
`;

const Count = styled(motion.div)``;

const buttonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.975,
	},
	disabled: {
		opacity: 0.5,
	},
};

export const TitlebarSeenHeads = props => {
	const { viewportWidth } = useContext(MetricsContext).metrics;

	const size = 20;
	const marginLeft = 3;
	const info = [
		{ active: true, img: "henri_liriani.png" },
		{ active: true, img: "yuchen_liu.png" },
		{ active: true, img: "jesse_chase.png" },
		{ active: true, img: "brian_nelson.png" },
		{ active: true, img: "dave_dash.png" },
		{ active: true, img: "sahana_rajasekar.png" },
		{ active: false, img: "judy_abad.png" },
		{ active: false, img: "keith_peiris.png" },
	];
	let headCount = 3;
	if (viewportWidth >= 928) {
		headCount = 4
	}
	if (viewportWidth >= 1056) {
		headCount = 5
	}
	if (viewportWidth >= 1184) {
		headCount = 6
	}
	if (viewportWidth >= 1312) {
		headCount = 7
	}
	if (viewportWidth >= 1440) {
		headCount = 8
	}
	return (
		<Wrap variants={props.variants}>
			<Count
				style={{
					paddingLeft: 4,
					paddingRight: 6,
					fontSize: "13px",
					fontFamily: 'Inter',
					fontStyle: "normal",
					fontWeight: 500,
					lineHeight: 1,
					backgroundColor: "rgba(255, 255, 255, 0.08)",
					borderRadius: "30px",
					color: "#6b6b6b",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					marginLeft: marginLeft,
				}}
			><span style={{
				fontSize: "11px",
			}}>+</span>20</Count>
			<HeadsContainer
				style={{
					width: headCount * (size + marginLeft),
					height: size,
				}}
			>
				{info.map(user => (
					<Head
						key={user.img}
						whileTap="active"
						whileHover="hover"
						initial={"default"}
						variants={buttonVariants}
						style={{
							width: size,
							height: size,
							marginLeft: marginLeft,
						}}
					>
						<img
							src={`/images/profile-pictures/${user.img}`}
							alt={"head"}
							style={{
								opacity: user.active === true ? 1 : 0.4,
							}}
						/>
					</Head>
				))}
			</HeadsContainer>
		</Wrap>
	);
};
