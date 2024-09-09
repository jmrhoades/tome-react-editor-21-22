import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../ds/Colors";
import { Icon } from "../../../ds/Icon";
import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;
const TweetContainer = styled(motion.div)``;

const UserBlock = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TweetBody = styled(motion.div)``;

const TweetMeta = styled(motion.div)``;

const Left = styled(motion.div)`
	display: flex;
`;

const Right = styled(motion.div)`
	display: block;
`;

const Avatar = styled(motion.img)`
	display: block;
`;

const Names = styled(motion.div)`
	display: block;
`;

const DisplayName = styled(motion.div)`
	display: block;
`;

const UserName = styled(motion.div)`
	display: block;
`;

export const TileTwitter = props => {
	const { scale } = useContext(MetricsContext).metrics;

	let userNameSize = 22 * scale;
	let userLineHeight = 16 * scale + "px";
	let userMarginBottom = 12 * scale + "px";

	let tweetBodySize = 22 * scale;
	let tweetBodyLineHeight = tweetBodySize * 1.4 + "px";
	let tweetBodyMarginBottom = 12 * scale + "px";

	let metaSize = 15.09 * scale;
	let metaLineHeight = tweetBodySize * 1.3 + "px";
	let metaMarginBottom = 2 * scale + "px";

	const fontFamily = "ABCDiatype";

	return (
		<Wrap
			style={{
				// backgroundColor: colors.nullTileBackgrounds.twitter,
				//backgroundColor: !props.data ? colors.z2 : colors.z1,
				backgroundColor: props.theme ? !props.data ? props.theme.colors.backgrounds.tile.null: props.theme.colors.backgrounds.tile.twitter : "transparent",
				fontFamily: fontFamily,
				fontWeight: 400,
				padding: 17 * scale,
			}}
		>
			{!props.data && (
				<NullMediaTile
					rowHeight={props.rowHeight}
					tileWidth={props.tileWidth}
					scale={scale}
					iconName={"Twitter"}
					isEmbed={true}
					inputPlaceholder={"Paste Twitter link..."}
				/>
			)}

			{props.data && (
				<TweetContainer>
					<UserBlock
						style={{
							marginBottom: 24 * scale + "px",
						}}
					>
						<Left>
							<Avatar
								src={props.data.avatar}
								style={{ width: 48 * scale, height: 48 * scale, marginRight: 16 * scale }}
							/>
							<Names>
								<DisplayName
									style={{
										fontSize: userNameSize,
										lineHeight: userLineHeight,
										marginBottom: userMarginBottom,
										color:  props.theme ? props.theme.colors.text.heading : "transparent",
									}}
								>
									{props.data.displayName}
								</DisplayName>
								<UserName
									style={{
										fontSize: userNameSize,
										lineHeight: userLineHeight,
										color: props.theme ? props.theme.colors.text.body : "transparent",
									}}
								>
									{props.data.userName}
								</UserName>
							</Names>
						</Left>
						<Right>
							<motion.svg
								width={20 * scale}
								height={16 * scale}
								viewBox="0 0 20 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.2025 2.11417C18.5067 2.4225 17.7592 2.63084 16.9733 2.725C17.775 2.245 18.39 1.48334 18.68 0.576668C17.93 1.02167 17.0992 1.345 16.215 1.51834C15.5067 0.765002 14.4983 0.293335 13.3817 0.293335C11.2383 0.293335 9.5 2.03167 9.5 4.17667C9.5 4.48 9.535 4.775 9.6 5.06C6.3725 4.8975 3.51333 3.35167 1.59833 1.00334C1.265 1.57834 1.07333 2.245 1.07333 2.955C1.07333 4.30167 1.75916 5.49084 2.8 6.18667C2.16333 6.16584 1.565 5.99167 1.04166 5.70084V5.75084C1.04166 7.63167 2.37916 9.20084 4.15583 9.5575C3.82916 9.64584 3.48666 9.6925 3.13333 9.6925C2.88333 9.6925 2.63916 9.66917 2.4025 9.62417C2.89666 11.1658 4.33 12.2892 6.02916 12.3192C4.7 13.3608 3.02583 13.9817 1.2075 13.9817C0.894164 13.9817 0.584997 13.9633 0.28083 13.9275C1.99916 15.03 4.03916 15.6717 6.23083 15.6717C13.3725 15.6717 17.2767 9.75667 17.2767 4.62667C17.2767 4.46 17.2725 4.29167 17.265 4.125C18.0233 3.57667 18.6817 2.89417 19.2008 2.11667L19.2025 2.11417Z"
									fill="#5FA0E6"
								/>
							</motion.svg>
						</Right>
					</UserBlock>
					<TweetBody
						style={{
							fontSize: tweetBodySize,
							lineHeight: tweetBodyLineHeight,
							marginBottom: tweetBodyMarginBottom,
							color:  props.theme ? props.theme.colors.text.heading : "transparent",
						}}
					>
						{props.data.tweet}
					</TweetBody>
					<TweetMeta
						style={{
							fontSize: metaSize,
							lineHeight: metaLineHeight,
							marginBottom: metaMarginBottom,
							color:  props.theme ? props.theme.colors.text.body : "transparent",
						}}
					>
						<motion.span>{props.data.time}</motion.span>
						&nbsp;·&nbsp;
						<motion.span>{props.data.date}</motion.span>
						&nbsp;·&nbsp;
						<motion.a
							href="https://twitter.com"
							style={{
								color: "#5FA0E6",
								textDecoration: "none",
							}}
						>
							View on Twitter
						</motion.a>
					</TweetMeta>
					<TweetMeta
						style={{
							fontSize: metaSize,
							lineHeight: metaLineHeight,
							color: props.theme ? props.theme.colors.t7 : "transparent",
						}}
					>
						<motion.span>{props.data.retweets} Retweets</motion.span>
						&nbsp;·&nbsp;
						<motion.span>{props.data.likes} Likes</motion.span>
					</TweetMeta>
				</TweetContainer>
			)}
		</Wrap>
	);
};
