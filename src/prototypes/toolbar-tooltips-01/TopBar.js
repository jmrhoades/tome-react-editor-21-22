import React from "react";
import styled from "styled-components";

const TopBarWrap = styled.div`
	position: absolute;
	width: 100%;
	height: 44px;
	top: 0;
	left: 0;
`;

const TopBarLeft = styled.div`
	position: absolute;
	width: 200px;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("./images/resize04/topbar-left.png");
	background-size: 200px 44px;
`;

const TopBarCenter = styled.div`
	position: absolute;
	width: 300px;
	height: 100%;
	top: 0;
	left: calc(50% - 150px);
	background-image: url("./images/resize04/topbar-center.png");
	background-size: 300px 44px;
`;

const TopBarRight = styled.div`
	position: absolute;
	width: 200px;
	height: 100%;
	top: 0;
	right: 0;
	background-image: url("./images/resize04/topbar-right.png");
	background-size: 200px 44px;
`;

export const TopBar = props => {
	return (
		<TopBarWrap>
			<TopBarLeft />
			<TopBarCenter />
			<TopBarRight />
		</TopBarWrap>
	);
};
