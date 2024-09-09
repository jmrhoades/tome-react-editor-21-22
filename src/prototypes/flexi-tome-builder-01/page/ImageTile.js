import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
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

const MediaPlaceholder = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PlaceholderLabel = styled(motion.div)`
	font-weight: 500;
	font-size: ${props => props.fontSize}px;
	color: rgba(255, 255, 255, 0.25);
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
`;

const PlaceholderClickTarget = styled(motion.div)`
	& svg {
		fill: none;
		& path {
			fill: rgba(255, 255, 255, 0.2);
		}
	}
`;

export const ImageTile = props => {
	const { scale } = useContext(MetricsContext).metrics;

	// let height = "100%";
	// let paddingBottom = 0;

	// switch (props.tileSize) {
	// 	case "full":
	// 		height = 0;
	// 		paddingBottom = "56.25%";
	// 		break;
	// }

	return (
		<ImageWrap
		// style={{
		// 	height: height,
		// 	paddingBottom: paddingBottom,
		// }}
		>
			{props.image && (
				<Image
					style={{
						backgroundSize: props.imageSize,
					}}
					image={props.image}
				/>
			)}
			{!props.image && (
				<MediaPlaceholder>
					<PlaceholderClickTarget>
						<svg width={102 * scale} height={81 * scale} viewBox="0 0 102 81">
							<path d="M84.1561 26.2186C84.1561 27.9057 85.2504 29 86.9375 29C88.6702 29 89.7645 27.9057 89.7645 26.2186V17.327H98.6561C100.343 17.327 101.438 16.2327 101.438 14.5C101.438 12.8129 100.343 11.7186 98.6561 11.7186H89.7645V2.82704C89.7645 1.13994 88.6702 0 86.9375 0C85.2504 0 84.1561 1.13994 84.1561 2.82704V11.7186H75.2189C73.5774 11.7186 72.4375 12.8129 72.4375 14.5C72.4375 16.2327 73.5774 17.327 75.2189 17.327H84.1561V26.2186Z" />
							<path d="M11.9847 11.5H60C61.6569 11.5 63 12.8431 63 14.5C63 16.1569 61.6569 17.5 60 17.5V17.5342H12.0611C8.24428 17.5342 6.14504 19.5581 6.14504 23.456V64.8335L17.5191 54.7515C19.1221 53.3273 20.7252 52.6526 22.4427 52.6526C24.2366 52.6526 25.9924 53.3647 27.5954 54.789L34.6565 61.0481L51.9084 45.9063C53.6641 44.3696 55.5344 43.6575 57.6336 43.6575C59.6947 43.6575 61.6794 44.4821 63.3969 45.9813L83.855 64.8335V42.4173C83.8475 42.3299 83.8438 42.2415 83.8438 42.1522C83.8438 42.063 83.8475 41.9746 83.855 41.8872V41.875H83.856C83.9962 40.2984 85.3206 39.0624 86.9336 39.0624C88.6401 39.0624 90.0234 40.4458 90.0234 42.1522C90.0234 42.2817 90.0155 42.4094 90 42.5347V68.9188C90 76.6396 86.0305 80.5 78.0153 80.5H11.9847C4.00763 80.5 0 76.6396 0 68.9188V23.1187C0 15.3979 4.00763 11.5 11.9847 11.5Z" />
							<path d="M28.4351 46.3561C33.3588 46.3561 37.4046 42.3832 37.4046 37.5109C37.4046 32.676 33.3588 28.6657 28.4351 28.6657C23.4733 28.6657 19.4275 32.676 19.4275 37.5109C19.4275 42.3832 23.4733 46.3561 28.4351 46.3561Z" />
						</svg>
					</PlaceholderClickTarget>
					<PlaceholderLabel fontSize={15 * scale}>Drag in files or paste a URL</PlaceholderLabel>
				</MediaPlaceholder>
			)}
		</ImageWrap>
	);
};
