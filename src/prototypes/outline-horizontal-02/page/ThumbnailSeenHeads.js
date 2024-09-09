import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { clamp } from "lodash";

const Wrap = styled(motion.div)`
	position: absolute;
	bottom: 3px;
	right: 3px;
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

export const ThumbnailSeenHeads = ({ info, scale }) => {
	const size = clamp(16 * scale, 12, 20);
	const marginLeft = -3 * scale;

	return (
		<Wrap>
			{info.map(imgPath => (
				<Head
					key={imgPath}
					style={{
						width: size,
						height: size,
						marginLeft: marginLeft,
					}}
				>
					<img src={`/images/profile-pictures/${imgPath}`} alt={"head"} />
				</Head>
			))}
		</Wrap>
	);
};
