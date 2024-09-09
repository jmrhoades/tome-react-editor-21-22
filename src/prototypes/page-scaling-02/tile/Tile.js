import React from "react";
import styled from "styled-components";

const TileWrap = styled.div`
	position: relative;
	overflow: hidden;
	border-radius: ${props => props.cornerRadius}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
	background-color: rgba(20, 20, 20, 1);
`;

export const Tile = props => {

	return (
		<TileWrap
            cornerRadius={props.tileRadius}
            width={props.tileWidth}
            height={props.tileHeight}
        >
			{props.children}
		</TileWrap>
	);
};
