import React from "react";
import styled from "styled-components";

const BottomBarWrap = styled.div`
	position: absolute;
	width: 100%;
	height: 80px;
	bottom: 0;
	left: 0;
`;

const BottomBarCenter = styled.div`
	position: absolute;
	width: 56px;
	height: 100%;
	bottom: 0;
	left: calc(50% - 28px);
	
`;

const CurrentPage = styled.div`
	text-align: center;
	color: rgba(255, 255, 255, 0.4);
	font-size: 12px;
	line-height: 16px;
	position: absolute;
	bottom: 20px;
`;

export const BottomBar = props => {
	return (
		<BottomBarWrap>
			<BottomBarCenter>
				<CurrentPage>
				1 of 3
				</CurrentPage>
			</BottomBarCenter>
		</BottomBarWrap>
	);
};
