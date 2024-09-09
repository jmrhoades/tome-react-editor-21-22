import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IconButton, LabelButton } from "../ds/Buttons";
import { TomeContext } from "../tome/TomeContext";

// import { BuildStates } from "./Prompt";

const Wrap = styled(motion.div)`
	position: absolute;
	bottom: 68px;
	left: 50%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 80px;
	justify-content: space-between;
	padding: 20px 24px;
`;
const Left = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 12px;
`;
const Right = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 12px;
`;

const PageCount = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 20px;
`;
const CurrentPage = styled(motion.span)`
	text-align: center;
	display: inline-block;
	width: 12px;
`;
const PageCountSeparator = styled(motion.span)`
	padding: 0 0.25em;
`;
const TotalPages = styled(motion.span)`
	text-align: center;
	display: inline-block;
	width: 12px;
`;

export const Review = props => {
	const { tomeData, currentPage } = React.useContext(TomeContext);

	return (
		<Wrap
			style={{
				...props.barBackgroundStyles,
				padding: "16px 20px",
				x: "-50%",
				pointerEvents: "auto",
			}}
            initial={{
				opacity: 0,
				scale: 0.9,
			}}
			animate={{
				opacity: 1,
				scale: 1,
			}}
			exit={{
				opacity: 0,
				scale: 0.9,
			}}
		>
			<Left>
				{/* <IconButton
					icon="ArrowLeft"
					iconSize={22}
					theme={props.theme}
					backgroundColor={props.theme.colors.z3}
					color={props.theme.colors.t8}
				/> */}

				{/* <PageCount style={{ color: props.theme.colors.t8 }}>
					<CurrentPage style={{ color: props.theme.colors.t9 }}>{currentPage.order}</CurrentPage>
					<PageCountSeparator>/</PageCountSeparator>
					<TotalPages>{tomeData.pages.length}</TotalPages>
				</PageCount> */}

				{/* <IconButton
					icon="DoubleSparkle"
                    width={32}
                    height={32}
					iconSize={20}
					theme={props.theme}
					backgroundColor={props.theme.colors.z3}
					color={props.theme.colors.t8}
                    disabled={currentPage.order === 2}
				/> */}

				{/* <IconButton
					icon="ArrowRight"
					iconSize={22}
					theme={props.theme}
					backgroundColor={props.theme.colors.z3}
					color={props.theme.colors.t8}
				/> */}
<LabelButton
					label="Done"
					theme={props.theme}
					height={32}
					labelColor={"#FFF"}
					labelHoverColor={"#FFF"}
					labelActiveColor={"#FFF"}
					backgroundColor={props.theme.colors.t0}
					borderRadius={8}
                    fontSize={13}
					// style={{ width: 88 }}
                    onTap={()=>{props.accept()}}
                    
						fontWeight={"bold"}
					
				/>
			</Left>

			<Right>
				{/* <IconButton
					icon="Retake"
					iconSize={22}
					theme={props.theme}
					backgroundColor={props.theme.colors.z3}
					color={props.theme.colors.t8}
				/> */}
				<LabelButton
					label="Try Again"
					theme={props.theme}
					height={32}
					backgroundColor={props.theme.colors.z3}
					borderRadius={8}
                    fontSize={13}
					style={{ width: 88 }}
                    onTap={()=>{props.tryAgain()}}
				/>
				
			</Right>
		</Wrap>
	);
};
