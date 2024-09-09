import React from "react";
import styled from "styled-components";

const OutlineWrap = styled.div`
	position: absolute;
	width: 134px;
	height: 192px;
	top: calc(50% - 96px);
	left: 0;
	background-image: url("./images/resize04/outline.png");
	background-size: 134px 192px;
`;

export const Outline = props => {
	return <OutlineWrap></OutlineWrap>;
};
