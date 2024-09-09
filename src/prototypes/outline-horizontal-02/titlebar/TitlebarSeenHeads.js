import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
`;

const Head = styled(motion.div)`
	filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.85));
	& img {
		display: block;
		width: 100%;
		height: auto;
	}
`;

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
	const size = 20;
	const marginLeft = 3;
	const info = [
		{ active: false, img: "judy_abad.png" },
		{ active: false, img: "keith_peiris.png" },
		{ active: true, img: "henri_liriani.png" },
		{ active: true, img: "jesse_chase.png" },
		{ active: true, img: "brian_nelson.png" },
		{ active: true, img: "dave_dash.png" },
		{ active: true, img: "sahana_rajasekar.png" },
		{ active: true, img: "yuchen_liu.png" },
	];
	return (
		<Wrap>
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
		</Wrap>
	);
};
