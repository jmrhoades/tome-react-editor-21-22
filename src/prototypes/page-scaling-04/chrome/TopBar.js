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

const TopBarRight = styled.div`
	position: absolute;
	width: 200px;
	height: 100%;
	top: 0;
	right: 0;
	background-image: url("./images/resize04/topbar-right.png");
	background-size: 200px 44px;
`;

const TopBarCenter = styled.div`
	position: absolute;
	width: 300px;
	height: 100%;
	top: 0;
	left: calc(50% - 150px);
	font-size: 14px;
	line-height: 44px;
	display: flex;
	color: rgba(255, 255, 255, 1);
`;

const Separator = styled.div`
	color: rgba(255, 255, 255, 0.4);
	padding: 0 6px;
`;

const WorkspaceTitle = styled.div`
	color: rgba(255, 255, 255, 0.4);
`;

const PageTitle = styled.div``;

export const TopBar = props => {
	return (
		<TopBarWrap>
			<TopBarLeft />
			<TopBarCenter>
				<WorkspaceTitle>Private</WorkspaceTitle>
				<Separator>/</Separator>
				<PageTitle>{props.title}</PageTitle>
			</TopBarCenter>
			<TopBarRight />
		</TopBarWrap>
	);
};
