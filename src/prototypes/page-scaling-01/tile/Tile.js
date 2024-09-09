import React from "react";
import styled from "styled-components";

const TileWrap = styled.div`
	position: relative;
	overflow: hidden;
    background-color: rgba(237, 0, 235, 1);
	border-radius: ${props => props.cornerRadius}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
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
